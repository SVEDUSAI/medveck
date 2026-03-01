import type { FastifyInstance } from 'fastify';
import { prisma } from '../utils/prisma.js';

export async function driverRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', fastify.authenticate);

  // Get assigned deliveries
  fastify.get('/deliveries', async (request) => {
    const { id: driverId } = (request as any).user;
    const orders = await prisma.medicineOrder.findMany({
      where: { driverId },
      include: { patient: true, vendor: true },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: orders };
  });

  // Get available deliveries
  fastify.get('/deliveries/available', async (request) => {
    const orders = await prisma.medicineOrder.findMany({
      where: { driverId: null, status: { in: ['ACCEPTED', 'PREPARING'] } },
      include: { patient: true, vendor: true },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: orders };
  });

  // Accept delivery
  fastify.patch('/deliveries/:id/accept', async (request) => {
    const { id } = request.params as { id: string };
    const { id: driverId } = (request as any).user;

    const order = await prisma.medicineOrder.update({
      where: { id },
      data: { driverId, status: 'OUT_FOR_DELIVERY' },
    });
    return { success: true, data: order };
  });

  // Mark delivered
  fastify.patch('/deliveries/:id/delivered', async (request) => {
    const { id } = request.params as { id: string };
    const order = await prisma.medicineOrder.update({
      where: { id },
      data: { status: 'DELIVERED' },
    });
    return { success: true, data: order };
  });

  // Update location
  fastify.patch('/location', async (request) => {
    const { id } = (request as any).user;
    const { lat, lng } = request.body as { lat: number; lng: number };
    await prisma.user.update({ where: { id }, data: { lat, lng } });
    return { success: true };
  });

  // Toggle online/offline
  fastify.patch('/toggle-online', async (request) => {
    const { id } = (request as any).user;
    const { isOnline } = request.body as { isOnline: boolean };
    const user = await prisma.user.update({ where: { id }, data: { isOnline } });
    return { success: true, data: { isOnline: user.isOnline } };
  });

  // Get ambulance jobs
  fastify.get('/ambulance-jobs', async (request) => {
    const { id: driverId } = (request as any).user;
    const jobs = await prisma.ambulanceRequest.findMany({
      where: { driverId },
      include: { patient: true },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: jobs };
  });

  // Accept ambulance job
  fastify.patch('/ambulance/:id/accept', async (request) => {
    const { id } = request.params as { id: string };
    const { id: driverId } = (request as any).user;
    const job = await prisma.ambulanceRequest.update({
      where: { id },
      data: { driverId, status: 'ACCEPTED' },
    });
    return { success: true, data: job };
  });
}
