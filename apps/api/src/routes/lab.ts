import type { FastifyInstance } from 'fastify';
import { prisma } from '../utils/prisma.js';

export async function labRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', fastify.authenticate);

  // Get bookings assigned to this lab
  fastify.get('/bookings', async (request) => {
    const { id: labId } = (request as any).user;
    const { status } = request.query as { status?: string };

    const bookings = await prisma.labBooking.findMany({
      where: {
        labId,
        ...(status ? { status: status as any } : {}),
      },
      include: { patient: true },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: bookings };
  });

  // Get unassigned bookings
  fastify.get('/bookings/available', async (request) => {
    const bookings = await prisma.labBooking.findMany({
      where: { labId: null, status: 'PENDING' },
      include: { patient: true },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: bookings };
  });

  // Accept booking
  fastify.patch('/bookings/:id/accept', async (request) => {
    const { id } = request.params as { id: string };
    const { id: labId } = (request as any).user;

    const booking = await prisma.labBooking.update({
      where: { id },
      data: { labId, status: 'CONFIRMED' },
    });
    return { success: true, data: booking };
  });

  // Update booking status
  fastify.patch('/bookings/:id/status', async (request) => {
    const { id } = request.params as { id: string };
    const { status } = request.body as { status: string };

    const booking = await prisma.labBooking.update({
      where: { id },
      data: { status: status as any },
    });
    return { success: true, data: booking };
  });

  // Upload report
  fastify.patch('/bookings/:id/report', async (request) => {
    const { id } = request.params as { id: string };
    const { reportUrl } = request.body as { reportUrl: string };

    const booking = await prisma.labBooking.update({
      where: { id },
      data: { reportUrl, status: 'COMPLETED' },
    });
    return { success: true, data: booking };
  });
}
