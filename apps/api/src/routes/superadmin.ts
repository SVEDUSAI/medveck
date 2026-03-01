import type { FastifyInstance } from 'fastify';
import { prisma } from '../utils/prisma.js';
import bcrypt from 'bcryptjs';

function superAdminGuard(request: any, reply: any) {
  const { role } = request.user;
  if (role !== 'SUPER_ADMIN') {
    return reply.code(403).send({ success: false, error: 'Super Admin access required' });
  }
}

export async function superAdminRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', fastify.authenticate);
  fastify.addHook('preHandler', superAdminGuard as any);

  // ─── List Admins ──────────────────────────────────
  fastify.get('/admins', async () => {
    const admins = await prisma.user.findMany({
      where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] } },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, name: true, email: true, phone: true, role: true,
        isActive: true, isVerified: true, createdAt: true, updatedAt: true,
      },
    });
    return { success: true, data: admins };
  });

  // ─── Create Admin ─────────────────────────────────
  fastify.post('/admins', async (request, reply) => {
    const { name, email, phone, password, role = 'ADMIN' } = request.body as any;

    if (!name || !email || !phone || !password) {
      return reply.code(400).send({ success: false, error: 'All fields required' });
    }

    if (!['ADMIN', 'SUPER_ADMIN'].includes(role)) {
      return reply.code(400).send({ success: false, error: 'Invalid admin role' });
    }

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] },
    });
    if (existing) {
      return reply.code(409).send({ success: false, error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = await prisma.user.create({
      data: { name, email, phone, password: hashedPassword, role: role as any, isVerified: true },
    });

    await prisma.auditLog.create({
      data: {
        userId: (request as any).user.id,
        action: 'CREATE_ADMIN',
        entity: 'User',
        entityId: admin.id,
        details: { role, name, email },
      },
    });

    return { success: true, data: admin };
  });

  // ─── Remove Admin ─────────────────────────────────
  fastify.delete('/admins/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const callerId = (request as any).user.id;

    if (id === callerId) {
      return reply.code(400).send({ success: false, error: 'Cannot remove yourself' });
    }

    const admin = await prisma.user.findUnique({ where: { id } });
    if (!admin || !['ADMIN', 'SUPER_ADMIN'].includes(admin.role)) {
      return reply.code(404).send({ success: false, error: 'Admin not found' });
    }

    await prisma.user.update({ where: { id }, data: { isActive: false, isVerified: false } });

    await prisma.auditLog.create({
      data: {
        userId: callerId,
        action: 'REMOVE_ADMIN',
        entity: 'User',
        entityId: id,
        details: { removedName: admin.name, removedEmail: admin.email },
      },
    });

    return { success: true, message: 'Admin removed' };
  });

  // ─── Audit Log ────────────────────────────────────
  fastify.get('/audit-log', async (request) => {
    const { page = '1', limit = '50', action, entity } = request.query as any;
    const skip = (Number(page) - 1) * Number(limit);
    const where: any = {};
    if (action) where.action = action;
    if (entity) where.entity = entity;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.auditLog.count({ where }),
    ]);

    return { success: true, data: { logs, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) } };
  });

  // ─── Platform Stats ───────────────────────────────
  fastify.get('/platform-stats', async () => {
    const [totalUsers, totalOrders, totalConsults, totalLabBookings, totalAmbulance,
           totalRevenue, onlineDrivers, activeVendors, activeLabs] = await Promise.all([
      prisma.user.count(),
      prisma.medicineOrder.count(),
      prisma.consultation.count(),
      prisma.labBooking.count(),
      prisma.ambulanceRequest.count(),
      prisma.medicineOrder.aggregate({ _sum: { totalAmount: true } }),
      prisma.user.count({ where: { role: 'DRIVER', isOnline: true } }),
      prisma.user.count({ where: { role: 'VENDOR', isOpen: true } }),
      prisma.user.count({ where: { role: 'LAB', isActive: true } }),
    ]);

    const usersByRole = await prisma.user.groupBy({
      by: ['role'],
      _count: true,
    });

    return {
      success: true,
      data: {
        totalUsers,
        totalOrders,
        totalConsults,
        totalLabBookings,
        totalAmbulance,
        totalRevenue: totalRevenue._sum.totalAmount || 0,
        onlineDrivers,
        activeVendors,
        activeLabs,
        usersByRole: Object.fromEntries(usersByRole.map((r) => [r.role, r._count])),
      },
    };
  });

  // ─── Platform Config: Get ─────────────────────────
  fastify.get('/platform-config', async () => {
    const configs = await prisma.platformConfig.findMany();
    const configMap = Object.fromEntries(configs.map((c) => [c.key, c.value]));
    return { success: true, data: configMap };
  });

  // ─── Platform Config: Update ──────────────────────
  fastify.put('/platform-config', async (request) => {
    const configs = request.body as Record<string, any>;

    for (const [key, value] of Object.entries(configs)) {
      await prisma.platformConfig.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      });
    }

    await prisma.auditLog.create({
      data: {
        userId: (request as any).user.id,
        action: 'UPDATE_PLATFORM_CONFIG',
        entity: 'PlatformConfig',
        details: { keys: Object.keys(configs) },
      },
    });

    return { success: true, message: 'Config updated' };
  });

  // ─── System Health ────────────────────────────────
  fastify.get('/system-health', async () => {
    let dbStatus = 'healthy';
    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch {
      dbStatus = 'unhealthy';
    }

    return {
      success: true,
      data: {
        api: 'healthy',
        database: dbStatus,
        websocket: 'healthy',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date().toISOString(),
      },
    };
  });
}
