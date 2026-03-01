import type { FastifyInstance } from 'fastify';
import { prisma } from '../utils/prisma.js';
import bcrypt from 'bcryptjs';

function adminGuard(request: any, reply: any) {
  const { role } = request.user;
  if (!['ADMIN', 'SUPER_ADMIN'].includes(role)) {
    return reply.code(403).send({ success: false, error: 'Admin access required' });
  }
}

export async function adminRoutes(fastify: FastifyInstance) {
  // All routes require auth + admin role
  fastify.addHook('preHandler', fastify.authenticate);
  fastify.addHook('preHandler', adminGuard as any);

  // ─── Dashboard Stats ──────────────────────────────
  fastify.get('/dashboard', async () => {
    const [patients, doctors, vendors, labs, drivers, activeOrders, activeConsults, todayOrders] =
      await Promise.all([
        prisma.user.count({ where: { role: 'PATIENT', isActive: true } }),
        prisma.user.count({ where: { role: { in: ['DOCTOR', 'VET', 'DENTIST'] }, isActive: true } }),
        prisma.user.count({ where: { role: 'VENDOR', isActive: true } }),
        prisma.user.count({ where: { role: 'LAB', isActive: true } }),
        prisma.user.count({ where: { role: 'DRIVER', isActive: true } }),
        prisma.medicineOrder.count({ where: { status: { notIn: ['DELIVERED', 'COMPLETED', 'CANCELLED'] } } }),
        prisma.consultation.count({ where: { status: { in: ['WAITING', 'IN_PROGRESS'] } } }),
        prisma.medicineOrder.findMany({
          where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
          select: { totalAmount: true },
        }),
      ]);

    const todayRevenue = (todayOrders as { totalAmount: number }[]).reduce((sum, o) => sum + o.totalAmount, 0);

    return {
      success: true,
      data: { patients, doctors, vendors, labs, drivers, activeOrders, activeConsults, todayRevenue },
    };
  });

  // ─── Users: List ──────────────────────────────────
  fastify.get('/users', async (request) => {
    const { page = '1', limit = '20', role, search, status } = request.query as any;
    const skip = (Number(page) - 1) * Number(limit);
    const where: any = {};

    if (role && role !== 'ALL') where.role = role;
    if (status === 'active') where.isActive = true;
    if (status === 'suspended') where.isActive = false;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        select: {
          id: true, name: true, phone: true, email: true, role: true, avatar: true,
          isVerified: true, isActive: true, createdAt: true,
          specialization: true, shopName: true, labName: true, vehicleType: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    return { success: true, data: { users, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) } };
  });

  // ─── Users: Get One ───────────────────────────────
  fastify.get('/users/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = await prisma.user.findUnique({
      where: { id },
      include: { address: true },
    });
    if (!user) return reply.code(404).send({ success: false, error: 'User not found' });
    return { success: true, data: user };
  });

  // ─── Users: Create ────────────────────────────────
  fastify.post('/users', async (request, reply) => {
    const { name, email, phone, password, role, ...rest } = request.body as any;

    if (!name || !phone || !role) {
      return reply.code(400).send({ success: false, error: 'Name, phone, and role are required' });
    }

    const existing = await prisma.user.findFirst({
      where: { OR: [{ phone }, ...(email ? [{ email }] : [])] },
    });
    if (existing) return reply.code(409).send({ success: false, error: 'User already exists' });

    const data: any = { name, phone, role, isVerified: true, ...rest };
    if (email) data.email = email;
    if (password) data.password = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({ data });

    await prisma.auditLog.create({
      data: { userId: (request as any).user.id, action: 'CREATE_USER', entity: 'User', entityId: user.id },
    });

    return { success: true, data: user };
  });

  // ─── Users: Update ────────────────────────────────
  fastify.put('/users/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { password, ...data } = request.body as any;

    const updateData: any = { ...data };
    if (password) updateData.password = await bcrypt.hash(password, 12);

    const user = await prisma.user.update({ where: { id }, data: updateData });

    await prisma.auditLog.create({
      data: { userId: (request as any).user.id, action: 'UPDATE_USER', entity: 'User', entityId: id },
    });

    return { success: true, data: user };
  });

  // ─── Users: Toggle Status ────────────────────────
  fastify.patch('/users/:id/toggle-status', async (request) => {
    const { id } = request.params as { id: string };
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error('User not found');

    const updated = await prisma.user.update({
      where: { id },
      data: { isActive: !user.isActive },
    });

    await prisma.auditLog.create({
      data: {
        userId: (request as any).user.id,
        action: updated.isActive ? 'ACTIVATE_USER' : 'SUSPEND_USER',
        entity: 'User',
        entityId: id,
      },
    });

    return { success: true, data: updated };
  });

  // ─── Users: Delete (soft) ────────────────────────
  fastify.delete('/users/:id', async (request) => {
    const { id } = request.params as { id: string };
    await prisma.user.update({ where: { id }, data: { isActive: false, isVerified: false } });

    await prisma.auditLog.create({
      data: { userId: (request as any).user.id, action: 'DELETE_USER', entity: 'User', entityId: id },
    });

    return { success: true, message: 'User deactivated' };
  });

  // ─── Orders: List ─────────────────────────────────
  fastify.get('/orders', async (request) => {
    const { page = '1', limit = '20', status, search } = request.query as any;
    const skip = (Number(page) - 1) * Number(limit);
    const where: any = {};

    if (status && status !== 'ALL') where.status = status;
    if (search) {
      where.OR = [
        { patient: { name: { contains: search, mode: 'insensitive' } } },
        { id: { contains: search } },
      ];
    }

    const [orders, total] = await Promise.all([
      prisma.medicineOrder.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          patient: { select: { id: true, name: true, phone: true } },
          vendor: { select: { id: true, name: true, shopName: true } },
          driver: { select: { id: true, name: true, phone: true } },
        },
      }),
      prisma.medicineOrder.count({ where }),
    ]);

    return { success: true, data: { orders, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) } };
  });

  // ─── Orders: Get One ──────────────────────────────
  fastify.get('/orders/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const order = await prisma.medicineOrder.findUnique({
      where: { id },
      include: {
        patient: { select: { id: true, name: true, phone: true, email: true } },
        vendor: { select: { id: true, name: true, shopName: true, phone: true } },
        driver: { select: { id: true, name: true, phone: true, vehicleNumber: true } },
      },
    });
    if (!order) return reply.code(404).send({ success: false, error: 'Order not found' });
    return { success: true, data: order };
  });

  // ─── Orders: Update Status ────────────────────────
  fastify.patch('/orders/:id', async (request) => {
    const { id } = request.params as { id: string };
    const { status, vendorId, driverId } = request.body as any;
    const data: any = {};
    if (status) data.status = status;
    if (vendorId) data.vendorId = vendorId;
    if (driverId) data.driverId = driverId;

    const order = await prisma.medicineOrder.update({ where: { id }, data });
    return { success: true, data: order };
  });

  // ─── Consultations: List ──────────────────────────
  fastify.get('/consultations', async (request) => {
    const { page = '1', limit = '20', status } = request.query as any;
    const skip = (Number(page) - 1) * Number(limit);
    const where: any = {};
    if (status && status !== 'ALL') where.status = status;

    const [consultations, total] = await Promise.all([
      prisma.consultation.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          patient: { select: { id: true, name: true, phone: true } },
          doctor: { select: { id: true, name: true, specialization: true } },
        },
      }),
      prisma.consultation.count({ where }),
    ]);

    return { success: true, data: { consultations, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) } };
  });

  // ─── Consultations: Get One ───────────────────────
  fastify.get('/consultations/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const consult = await prisma.consultation.findUnique({
      where: { id },
      include: {
        patient: true,
        doctor: true,
        prescription: true,
        messages: { orderBy: { createdAt: 'asc' }, take: 50 },
      },
    });
    if (!consult) return reply.code(404).send({ success: false, error: 'Not found' });
    return { success: true, data: consult };
  });

  // ─── Lab Bookings: List ───────────────────────────
  fastify.get('/lab-bookings', async (request) => {
    const { page = '1', limit = '20', status } = request.query as any;
    const skip = (Number(page) - 1) * Number(limit);
    const where: any = {};
    if (status && status !== 'ALL') where.status = status;

    const [bookings, total] = await Promise.all([
      prisma.labBooking.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          patient: { select: { id: true, name: true, phone: true } },
          lab: { select: { id: true, name: true, labName: true } },
        },
      }),
      prisma.labBooking.count({ where }),
    ]);

    return { success: true, data: { bookings, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) } };
  });

  // ─── Ambulance Requests ───────────────────────────
  fastify.get('/ambulance-requests', async (request) => {
    const { page = '1', limit = '20', status } = request.query as any;
    const skip = (Number(page) - 1) * Number(limit);
    const where: any = {};
    if (status && status !== 'ALL') where.status = status;

    const [requests, total] = await Promise.all([
      prisma.ambulanceRequest.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          patient: { select: { id: true, name: true, phone: true } },
          driver: { select: { id: true, name: true, phone: true, vehicleNumber: true } },
        },
      }),
      prisma.ambulanceRequest.count({ where }),
    ]);

    return { success: true, data: { requests, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) } };
  });

  // ─── Analytics ────────────────────────────────────
  fastify.get('/analytics', async () => {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(now); startOfWeek.setDate(startOfWeek.getDate() - 7);
    const startOfMonth = new Date(now); startOfMonth.setDate(1);

    const [todayOrders, weekOrders, monthOrders, totalOrders,
      todayConsults, weekConsults, newUsersWeek, newUsersMonth] = await Promise.all([
        prisma.medicineOrder.aggregate({ where: { createdAt: { gte: startOfDay } }, _sum: { totalAmount: true }, _count: true }),
        prisma.medicineOrder.aggregate({ where: { createdAt: { gte: startOfWeek } }, _sum: { totalAmount: true }, _count: true }),
        prisma.medicineOrder.aggregate({ where: { createdAt: { gte: startOfMonth } }, _sum: { totalAmount: true }, _count: true }),
        prisma.medicineOrder.aggregate({ _sum: { totalAmount: true }, _count: true }),
        prisma.consultation.count({ where: { createdAt: { gte: startOfDay } } }),
        prisma.consultation.count({ where: { createdAt: { gte: startOfWeek } } }),
        prisma.user.count({ where: { createdAt: { gte: startOfWeek }, role: 'PATIENT' } }),
        prisma.user.count({ where: { createdAt: { gte: startOfMonth }, role: 'PATIENT' } }),
      ]);

    return {
      success: true,
      data: {
        revenue: {
          today: todayOrders._sum.totalAmount || 0,
          week: weekOrders._sum.totalAmount || 0,
          month: monthOrders._sum.totalAmount || 0,
          total: totalOrders._sum.totalAmount || 0,
        },
        orders: {
          today: todayOrders._count,
          week: weekOrders._count,
          month: monthOrders._count,
          total: totalOrders._count,
        },
        consultations: { today: todayConsults, week: weekConsults },
        users: { newThisWeek: newUsersWeek, newThisMonth: newUsersMonth },
      },
    };
  });

  // ─── Send Notification ────────────────────────────
  fastify.post('/notifications', async (request) => {
    const { userId, title, body, type = 'SYSTEM' } = request.body as any;

    if (userId) {
      const notification = await prisma.notification.create({
        data: { userId, title, body, type },
      });
      return { success: true, data: notification };
    }

    // Broadcast to all
    const users = await prisma.user.findMany({ where: { isActive: true }, select: { id: true } });
    await prisma.notification.createMany({
      data: users.map((u: { id: string }) => ({ userId: u.id, title, body, type })),
    });
    return { success: true, message: `Notification sent to ${users.length} users` };
  });
}
