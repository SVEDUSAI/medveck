import type { FastifyInstance } from 'fastify';
import { prisma } from '../utils/prisma.js';

export async function doctorRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', fastify.authenticate);

  // Get pending consultations for this doctor
  fastify.get('/consultations', async (request) => {
    const { id: doctorId } = (request as any).user;
    const { status } = request.query as { status?: string };

    const consultations = await prisma.consultation.findMany({
      where: {
        doctorId,
        ...(status ? { status: status as any } : {}),
      },
      include: { patient: true },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: consultations };
  });

  // Accept / start consultation
  fastify.patch('/consultations/:id/start', async (request) => {
    const { id } = request.params as { id: string };
    const consultation = await prisma.consultation.update({
      where: { id },
      data: { status: 'IN_PROGRESS', startedAt: new Date() },
      include: { patient: true },
    });
    return { success: true, data: consultation };
  });

  // End consultation
  fastify.patch('/consultations/:id/end', async (request) => {
    const { id } = request.params as { id: string };
    const { notes } = request.body as { notes?: string };
    const consultation = await prisma.consultation.update({
      where: { id },
      data: { status: 'COMPLETED', endedAt: new Date(), notes },
    });
    return { success: true, data: consultation };
  });

  // Write prescription
  fastify.post('/consultations/:id/prescription', async (request) => {
    const { id: consultationId } = request.params as { id: string };
    const { id: doctorId } = (request as any).user;
    const { diagnosis, medicines, notes } = request.body as any;

    const consult = await prisma.consultation.findUnique({ where: { id: consultationId } });
    if (!consult) return { success: false, error: 'Consultation not found' };

    const prescription = await prisma.prescription.create({
      data: {
        consultationId,
        doctorId,
        patientId: consult.patientId,
        diagnosis,
        medicines,
        notes,
      },
    });
    return { success: true, data: prescription };
  });

  // Toggle availability
  fastify.patch('/availability', async (request) => {
    const { id } = (request as any).user;
    const { isAvailable } = request.body as { isAvailable: boolean };
    const user = await prisma.user.update({ where: { id }, data: { isAvailable } });
    return { success: true, data: { isAvailable: user.isAvailable } };
  });

  // Get schedule / upcoming appointments
  fastify.get('/schedule', async (request) => {
    const { id: doctorId } = (request as any).user;
    const upcoming = await prisma.consultation.findMany({
      where: {
        doctorId,
        status: { in: ['WAITING', 'IN_PROGRESS'] },
        scheduledAt: { gte: new Date() },
      },
      include: { patient: true },
      orderBy: { scheduledAt: 'asc' },
    });
    return { success: true, data: upcoming };
  });
}
