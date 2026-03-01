import type { Server, Socket } from 'socket.io';
import type { FastifyInstance } from 'fastify';
import { SOCKET_EVENTS } from '@medvek/shared';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userRole?: string;
}

const onlineUsers = new Map<string, string>(); // userId -> socketId

export function setupSocket(io: Server, fastify: FastifyInstance) {
  // Auth middleware
  io.use(async (socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Authentication required'));

    try {
      const decoded = fastify.jwt.verify(token) as any;
      socket.userId = decoded.id;
      socket.userRole = decoded.role;
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    const userId = socket.userId!;
    onlineUsers.set(userId, socket.id);
    console.log(`🟢 User connected: ${userId} (${socket.userRole})`);

    // Join user's personal room
    socket.join(`user:${userId}`);

    // ─── WebRTC Signaling ────────────────────────────
    socket.on(SOCKET_EVENTS.JOIN_CONSULTATION, (data: { consultationId: string }) => {
      socket.join(`consult:${data.consultationId}`);
      socket.to(`consult:${data.consultationId}`).emit(SOCKET_EVENTS.CONSULTATION_STARTED, {
        userId,
        consultationId: data.consultationId,
      });
    });

    socket.on(SOCKET_EVENTS.LEAVE_CONSULTATION, (data: { consultationId: string }) => {
      socket.leave(`consult:${data.consultationId}`);
      socket.to(`consult:${data.consultationId}`).emit(SOCKET_EVENTS.CONSULTATION_ENDED, {
        userId,
        consultationId: data.consultationId,
      });
    });

    socket.on(SOCKET_EVENTS.OFFER, (data: { consultationId: string; offer: any }) => {
      socket.to(`consult:${data.consultationId}`).emit(SOCKET_EVENTS.OFFER, {
        offer: data.offer,
        from: userId,
      });
    });

    socket.on(SOCKET_EVENTS.ANSWER, (data: { consultationId: string; answer: any }) => {
      socket.to(`consult:${data.consultationId}`).emit(SOCKET_EVENTS.ANSWER, {
        answer: data.answer,
        from: userId,
      });
    });

    socket.on(SOCKET_EVENTS.ICE_CANDIDATE, (data: { consultationId: string; candidate: any }) => {
      socket.to(`consult:${data.consultationId}`).emit(SOCKET_EVENTS.ICE_CANDIDATE, {
        candidate: data.candidate,
        from: userId,
      });
    });

    socket.on(SOCKET_EVENTS.CALL_ENDED, (data: { consultationId: string }) => {
      socket.to(`consult:${data.consultationId}`).emit(SOCKET_EVENTS.CALL_ENDED, { from: userId });
    });

    // ─── Chat ────────────────────────────────────────
    socket.on(SOCKET_EVENTS.SEND_MESSAGE, (data: { consultationId: string; content: string; type?: string }) => {
      io.to(`consult:${data.consultationId}`).emit(SOCKET_EVENTS.NEW_MESSAGE, {
        senderId: userId,
        content: data.content,
        type: data.type || 'TEXT',
        timestamp: new Date().toISOString(),
      });
    });

    socket.on(SOCKET_EVENTS.TYPING, (data: { consultationId: string }) => {
      socket.to(`consult:${data.consultationId}`).emit(SOCKET_EVENTS.TYPING, { userId });
    });

    // ─── Location Tracking (Driver) ──────────────────
    socket.on(SOCKET_EVENTS.LOCATION_UPDATE, (data: { lat: number; lng: number; orderId?: string }) => {
      // Broadcast to order room if orderId provided
      if (data.orderId) {
        io.to(`order:${data.orderId}`).emit(SOCKET_EVENTS.LOCATION_UPDATE, {
          driverId: userId,
          lat: data.lat,
          lng: data.lng,
        });
      }
    });

    // Join order room (for tracking)
    socket.on('order:join', (data: { orderId: string }) => {
      socket.join(`order:${data.orderId}`);
    });

    // ─── Disconnect ──────────────────────────────────
    socket.on('disconnect', () => {
      onlineUsers.delete(userId);
      console.log(`🔴 User disconnected: ${userId}`);
    });
  });

  // Helper to send notification to specific user
  (io as any).sendToUser = (userId: string, event: string, data: any) => {
    io.to(`user:${userId}`).emit(event, data);
  };
}
