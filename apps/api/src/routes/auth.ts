import type { FastifyInstance } from 'fastify';
import { prisma } from '../utils/prisma.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function authRoutes(fastify: FastifyInstance) {
  // ─── Send OTP (patients) ──────────────────────────
  fastify.post('/send-otp', async (request, reply) => {
    const { phone } = request.body as { phone: string };

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return reply.code(400).send({ success: false, error: 'Invalid phone number' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.otp.updateMany({
      where: { phone, used: false },
      data: { used: true },
    });

    await prisma.otp.create({ data: { phone, code, expiresAt } });

    // TODO: Integrate SMS gateway (Twilio / MSG91 / 2Factor)
    console.log(`📱 OTP for ${phone}: ${code}`);

    return {
      success: true,
      message: 'OTP sent successfully',
      ...(process.env.NODE_ENV === 'development' ? { devOtp: code } : {}),
    };
  });

  // ─── Verify OTP (patients) ────────────────────────
  fastify.post('/verify-otp', async (request, reply) => {
    const { phone, otp } = request.body as { phone: string; otp: string };

    const otpRecord = await prisma.otp.findFirst({
      where: { phone, code: otp, used: false, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
    });

    if (!otpRecord) {
      return reply.code(400).send({ success: false, error: 'Invalid or expired OTP' });
    }

    await prisma.otp.update({ where: { id: otpRecord.id }, data: { used: true } });

    let user = await prisma.user.findUnique({ where: { phone } });
    const isNewUser = !user;
    if (!user) {
      user = await prisma.user.create({
        data: { phone, name: '', role: 'PATIENT', isVerified: true },
      });
    }

    if (!user.isActive) {
      return reply.code(403).send({ success: false, error: 'Account is suspended. Contact support.' });
    }

    const token = fastify.jwt.sign({ id: user.id, role: user.role, phone: user.phone }, { expiresIn: '30d' });
    const refreshToken = fastify.jwt.sign({ id: user.id, type: 'refresh' }, { expiresIn: '90d' });

    return { success: true, data: { token, refreshToken, user, isNewUser: isNewUser || !user.name } };
  });

  // ─── Staff Login (email + password) ───────────────
  fastify.post('/staff-login', async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };

    if (!email || !password) {
      return reply.code(400).send({ success: false, error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return reply.code(401).send({ success: false, error: 'Invalid email or password' });
    }

    if (!user.isActive) {
      return reply.code(403).send({ success: false, error: 'Account is suspended. Contact support.' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return reply.code(401).send({ success: false, error: 'Invalid email or password' });
    }

    const token = fastify.jwt.sign({ id: user.id, role: user.role, phone: user.phone }, { expiresIn: '30d' });
    const refreshToken = fastify.jwt.sign({ id: user.id, type: 'refresh' }, { expiresIn: '90d' });

    return { success: true, data: { token, refreshToken, user } };
  });

  // ─── Staff Register (admin-only) ──────────────────
  fastify.post('/staff-register', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const { id, role: callerRole } = (request as any).user;
    if (!['ADMIN', 'SUPER_ADMIN'].includes(callerRole)) {
      return reply.code(403).send({ success: false, error: 'Admin access required' });
    }

    const { name, email, phone, password, role } = request.body as {
      name: string; email: string; phone: string; password: string; role: string;
    };

    if (!name || !email || !phone || !password || !role) {
      return reply.code(400).send({ success: false, error: 'All fields are required' });
    }

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] },
    });
    if (existing) {
      return reply.code(409).send({ success: false, error: 'User with this email or phone already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, phone, password: hashedPassword, role: role as any, isVerified: true },
    });

    await prisma.auditLog.create({
      data: { userId: id, action: 'CREATE_USER', entity: 'User', entityId: user.id, details: { role, name } },
    });

    return { success: true, data: user };
  });

  // ─── Refresh Token ────────────────────────────────
  fastify.post('/refresh-token', async (request, reply) => {
    const { refreshToken } = request.body as { refreshToken: string };
    try {
      const decoded = fastify.jwt.verify<{ id: string; type: string }>(refreshToken);
      if (decoded.type !== 'refresh') throw new Error('Invalid token type');

      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user || !user.isActive) {
        return reply.code(401).send({ success: false, error: 'Invalid refresh token' });
      }

      const token = fastify.jwt.sign({ id: user.id, role: user.role, phone: user.phone }, { expiresIn: '30d' });
      const newRefresh = fastify.jwt.sign({ id: user.id, type: 'refresh' }, { expiresIn: '90d' });

      return { success: true, data: { token, refreshToken: newRefresh } };
    } catch {
      return reply.code(401).send({ success: false, error: 'Invalid or expired refresh token' });
    }
  });

  // ─── Change Password (staff) ──────────────────────
  fastify.post('/change-password', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const { id } = (request as any).user;
    const { currentPassword, newPassword } = request.body as { currentPassword: string; newPassword: string };

    if (!currentPassword || !newPassword || newPassword.length < 6) {
      return reply.code(400).send({ success: false, error: 'Password must be at least 6 characters' });
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user || !user.password) {
      return reply.code(400).send({ success: false, error: 'Cannot change password for this account type' });
    }

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) {
      return reply.code(401).send({ success: false, error: 'Current password is incorrect' });
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({ where: { id }, data: { password: hashed } });

    return { success: true, message: 'Password changed successfully' };
  });

  // ─── Forgot Password ─────────────────────────────
  fastify.post('/forgot-password', async (_request, reply) => {
    const { email } = _request.body as { email: string };

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { success: true, message: 'If an account exists, a reset link has been sent.' };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiry },
    });

    // TODO: Send email with reset link
    console.log(`🔑 Reset token for ${email}: ${resetToken}`);

    return { success: true, message: 'If an account exists, a reset link has been sent.' };
  });

  // ─── Reset Password ──────────────────────────────
  fastify.post('/reset-password', async (request, reply) => {
    const { token, newPassword } = request.body as { token: string; newPassword: string };

    if (!token || !newPassword || newPassword.length < 6) {
      return reply.code(400).send({ success: false, error: 'Invalid request' });
    }

    const user = await prisma.user.findFirst({
      where: { resetToken: token, resetTokenExpiry: { gt: new Date() } },
    });

    if (!user) {
      return reply.code(400).send({ success: false, error: 'Invalid or expired reset token' });
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed, resetToken: null, resetTokenExpiry: null },
    });

    return { success: true, message: 'Password reset successfully' };
  });

  // ─── Get Current User ─────────────────────────────
  fastify.get('/me', { preHandler: [fastify.authenticate] }, async (request) => {
    const { id } = (request as any).user;
    const user = await prisma.user.findUnique({
      where: { id },
      include: { address: true },
    });
    return { success: true, data: user };
  });

  // ─── Update Profile ───────────────────────────────
  fastify.put('/profile', { preHandler: [fastify.authenticate] }, async (request) => {
    const { id } = (request as any).user;
    const { password, role, isActive, isVerified, resetToken, resetTokenExpiry, ...data } = request.body as any;
    const user = await prisma.user.update({ where: { id }, data });
    return { success: true, data: user };
  });

  // ─── Logout ───────────────────────────────────────
  fastify.post('/logout', { preHandler: [fastify.authenticate] }, async () => {
    return { success: true, message: 'Logged out successfully' };
  });
}
