import type { FastifyInstance } from 'fastify';
import { prisma } from '../utils/prisma.js';

export async function patientRoutes(fastify: FastifyInstance) {
  // All routes require auth
  fastify.addHook('preHandler', fastify.authenticate);

  // ─── Consultations ────────────────────────────────
  fastify.post('/consultations', async (request) => {
    const { id: patientId } = (request as any).user;
    const { doctorId, type, scheduledAt, notes } = request.body as any;

    const doctor = await prisma.user.findFirst({ where: { id: doctorId, role: { in: ['DOCTOR', 'VET', 'DENTIST'] } } });
    if (!doctor) return { success: false, error: 'Doctor not found' };

    const consultation = await prisma.consultation.create({
      data: {
        patientId,
        doctorId,
        type: type || 'VIDEO',
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        notes,
        fee: doctor.consultationFee || 0,
      },
      include: { doctor: true },
    });
    return { success: true, data: consultation };
  });

  fastify.get('/consultations', async (request) => {
    const { id: patientId } = (request as any).user;
    const consultations = await prisma.consultation.findMany({
      where: { patientId },
      include: { doctor: true },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: consultations };
  });

  // ─── Medicine Orders ──────────────────────────────
  fastify.post('/orders/medicine', async (request) => {
    const { id: patientId } = (request as any).user;
    const { items, deliveryAddress, prescriptionUrl } = request.body as any;

    let totalAmount = 0;
    for (const item of items) {
      const med = await prisma.medicine.findUnique({ where: { id: item.medicineId } });
      if (med) totalAmount += med.price * item.quantity;
    }

    const order = await prisma.medicineOrder.create({
      data: {
        patientId,
        items,
        totalAmount,
        deliveryAddress: JSON.stringify(deliveryAddress),
        prescriptionUrl,
      },
    });
    return { success: true, data: order };
  });

  fastify.get('/orders/medicine', async (request) => {
    const { id: patientId } = (request as any).user;
    const orders = await prisma.medicineOrder.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: orders };
  });

  // ─── Lab Bookings ─────────────────────────────────
  fastify.post('/bookings/lab', async (request) => {
    const { id: patientId } = (request as any).user;
    const { tests, homeCollection, scheduledAt, address } = request.body as any;

    let totalAmount = 0;
    for (const testId of tests) {
      const test = await prisma.labTest.findUnique({ where: { id: testId } });
      if (test) totalAmount += test.price;
    }

    const booking = await prisma.labBooking.create({
      data: {
        patientId,
        tests,
        homeCollection: homeCollection || false,
        scheduledAt: new Date(scheduledAt),
        address: address ? JSON.stringify(address) : null,
        totalAmount,
      },
    });
    return { success: true, data: booking };
  });

  fastify.get('/bookings/lab', async (request) => {
    const { id: patientId } = (request as any).user;
    const bookings = await prisma.labBooking.findMany({
      where: { patientId },
      include: { lab: true },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: bookings };
  });

  // ─── General Bookings (Home Visit, Nurse, etc.) ───
  fastify.post('/bookings', async (request) => {
    const { id: patientId } = (request as any).user;
    const { serviceType, scheduledAt, address, notes, fee } = request.body as any;

    const booking = await prisma.booking.create({
      data: { patientId, serviceType, scheduledAt: new Date(scheduledAt), address, notes, fee: fee || 0 },
    });
    return { success: true, data: booking };
  });

  fastify.get('/bookings', async (request) => {
    const { id: patientId } = (request as any).user;
    const bookings = await prisma.booking.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: bookings };
  });

  // ─── Health Records ───────────────────────────────
  fastify.get('/health-records', async (request) => {
    const { id: patientId } = (request as any).user;
    const records = await prisma.healthRecord.findMany({
      where: { patientId },
      orderBy: { date: 'desc' },
    });
    return { success: true, data: records };
  });

  // ─── Ambulance ────────────────────────────────────
  fastify.post('/ambulance', async (request) => {
    const { id: patientId } = (request as any).user;
    const { pickupLat, pickupLng, pickupAddress, emergencyType } = request.body as any;

    const ambulance = await prisma.ambulanceRequest.create({
      data: { patientId, pickupLat, pickupLng, pickupAddress, emergencyType: emergencyType || 'NON_CRITICAL' },
    });
    return { success: true, data: ambulance };
  });
}
