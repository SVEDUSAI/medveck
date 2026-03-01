import type { FastifyInstance } from 'fastify';
import { prisma } from '../utils/prisma.js';

export async function vendorRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', fastify.authenticate);

  // Get pending orders for vendor
  fastify.get('/orders', async (request) => {
    const { id: vendorId } = (request as any).user;
    const { status } = request.query as { status?: string };

    const orders = await prisma.medicineOrder.findMany({
      where: {
        vendorId,
        ...(status ? { status: status as any } : {}),
      },
      include: { patient: true, driver: true },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: orders };
  });

  // Get unassigned orders (vendor can accept)
  fastify.get('/orders/available', async (request) => {
    const orders = await prisma.medicineOrder.findMany({
      where: { vendorId: null, status: 'PENDING' },
      include: { patient: true },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: orders };
  });

  // Accept order
  fastify.patch('/orders/:id/accept', async (request) => {
    const { id } = request.params as { id: string };
    const { id: vendorId } = (request as any).user;

    const order = await prisma.medicineOrder.update({
      where: { id },
      data: { vendorId, status: 'ACCEPTED' },
    });
    return { success: true, data: order };
  });

  // Update order status (preparing, ready for pickup)
  fastify.patch('/orders/:id/status', async (request) => {
    const { id } = request.params as { id: string };
    const { status } = request.body as { status: string };

    const order = await prisma.medicineOrder.update({
      where: { id },
      data: { status: status as any },
    });
    return { success: true, data: order };
  });

  // Toggle shop open/close
  fastify.patch('/toggle-open', async (request) => {
    const { id } = (request as any).user;
    const { isOpen } = request.body as { isOpen: boolean };
    const user = await prisma.user.update({ where: { id }, data: { isOpen } });
    return { success: true, data: { isOpen: user.isOpen } };
  });
}
