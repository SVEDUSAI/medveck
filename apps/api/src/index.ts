import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { authRoutes } from './routes/auth.js';
import { patientRoutes } from './routes/patient.js';
import { doctorRoutes } from './routes/doctor.js';
import { vendorRoutes } from './routes/vendor.js';
import { labRoutes } from './routes/lab.js';
import { driverRoutes } from './routes/driver.js';
import { adminRoutes } from './routes/admin.js';
import { superAdminRoutes } from './routes/superadmin.js';
import { catalogRoutes } from './routes/catalog.js';
import { setupSocket } from './socket/index.js';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: any, reply: any) => Promise<void>;
  }
}

const PORT = Number(process.env.PORT) || 4000;

export async function bootstrap() {
  const fastify = Fastify({ logger: true });

  const httpServer = createServer(fastify.server);

  // Plugins
  await fastify.register(cors, {
    origin: true, // Allow all for now, can be restricted in production
    credentials: true,
  });

  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'medvek-dev-secret',
  });

  // Auth decorator
  fastify.decorate('authenticate', async (request: any, reply: any) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ success: false, error: 'Unauthorized' });
    }
  });

  // Health check
  fastify.get('/health', async () => ({
    status: 'ok',
    service: 'medvek-api',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }));

  // Routes
  await fastify.register(authRoutes, { prefix: '/api/auth' });
  await fastify.register(patientRoutes, { prefix: '/api/patient' });
  await fastify.register(doctorRoutes, { prefix: '/api/doctor' });
  await fastify.register(vendorRoutes, { prefix: '/api/vendor' });
  await fastify.register(labRoutes, { prefix: '/api/lab' });
  await fastify.register(driverRoutes, { prefix: '/api/driver' });
  await fastify.register(adminRoutes, { prefix: '/api/admin' });
  await fastify.register(superAdminRoutes, { prefix: '/api/super-admin' });
  await fastify.register(catalogRoutes, { prefix: '/api/catalog' });

  // Socket.io
  const io = new Server(httpServer, {
    cors: {
      origin: true,
      credentials: true,
    },
  });
  setupSocket(io, fastify);

  return { fastify, httpServer };
}

// Only run bootstrap if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  bootstrap().then(({ fastify, httpServer }) => {
    fastify.listen({ port: PORT, host: '0.0.0.0' }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`🚀 MedVek API running on http://localhost:${PORT}`);
    });
  }).catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}
