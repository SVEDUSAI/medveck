import type { FastifyInstance } from 'fastify';
import { prisma } from '../utils/prisma.js';

export async function catalogRoutes(fastify: FastifyInstance) {
  // ─── Doctors (public) ─────────────────────────────
  fastify.get('/doctors', async (request) => {
    const { type, specialization, search } = request.query as any;

    const where: any = { role: { in: ['DOCTOR', 'VET', 'DENTIST'] }, isAvailable: true };
    if (type) where.doctorType = type;
    if (specialization) where.specialization = { contains: specialization, mode: 'insensitive' };
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { specialization: { contains: search, mode: 'insensitive' } },
        { hospital: { contains: search, mode: 'insensitive' } },
      ];
    }

    const doctors = await prisma.user.findMany({
      where,
      select: {
        id: true, name: true, avatar: true, doctorType: true, specialization: true,
        qualification: true, experience: true, consultationFee: true, rating: true,
        reviewCount: true, hospital: true, bio: true, languages: true, isAvailable: true,
      },
      orderBy: { rating: 'desc' },
    });
    return { success: true, data: doctors };
  });

  fastify.get('/doctors/:id', async (request) => {
    const { id } = request.params as { id: string };
    const doctor = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true, name: true, avatar: true, doctorType: true, specialization: true,
        qualification: true, experience: true, consultationFee: true, rating: true,
        reviewCount: true, hospital: true, bio: true, languages: true, isAvailable: true,
      },
    });
    return { success: true, data: doctor };
  });

  // ─── Medicines (public) ───────────────────────────
  fastify.get('/medicines', async (request) => {
    const { category, search } = request.query as any;

    const where: any = { inStock: true };
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { genericName: { contains: search, mode: 'insensitive' } },
      ];
    }

    const medicines = await prisma.medicine.findMany({ where, orderBy: { name: 'asc' } });
    return { success: true, data: medicines };
  });

  // ─── Lab Tests (public) ───────────────────────────
  fastify.get('/lab-tests', async (request) => {
    const { category, search } = request.query as any;

    const where: any = {};
    if (category) where.category = category;
    if (search) where.name = { contains: search, mode: 'insensitive' };

    const tests = await prisma.labTest.findMany({ where, orderBy: { name: 'asc' } });
    return { success: true, data: tests };
  });

  // ─── Labs (public) ────────────────────────────────
  fastify.get('/labs', async (request) => {
    const { homeCollection, search } = request.query as any;

    const where: any = { role: 'LAB' };
    if (homeCollection === 'true') where.homeCollection = true;
    if (search) {
      where.OR = [
        { labName: { contains: search, mode: 'insensitive' } },
      ];
    }

    const labs = await prisma.user.findMany({
      where,
      select: {
        id: true, labName: true, avatar: true, labServices: true,
        homeCollection: true, rating: true,
      },
      orderBy: { rating: 'desc' },
    });
    return { success: true, data: labs };
  });
}
