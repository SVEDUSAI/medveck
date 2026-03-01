export const APP_NAME = 'MedVek';

export const USER_ROLES = {
  PATIENT: 'PATIENT',
  DOCTOR: 'DOCTOR',
  VET: 'VET',
  DENTIST: 'DENTIST',
  NURSE: 'NURSE',
  VENDOR: 'VENDOR',
  LAB: 'LAB',
  DRIVER: 'DRIVER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export const DOCTOR_TYPES = {
  MEDICAL: 'MEDICAL',
  VETERINARY: 'VETERINARY',
  DENTAL: 'DENTAL',
} as const;

export const SERVICE_TYPES = {
  TELECONSULTATION: 'TELECONSULTATION',
  HOME_VISIT: 'HOME_VISIT',
  LAB_TEST: 'LAB_TEST',
  MEDICINE_DELIVERY: 'MEDICINE_DELIVERY',
  AMBULANCE: 'AMBULANCE',
  NURSE_CARE: 'NURSE_CARE',
  DENTIST: 'DENTIST',
  VETERINARY: 'VETERINARY',
  PALLIATIVE_CARE: 'PALLIATIVE_CARE',
} as const;

export const ORDER_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  IN_PROGRESS: 'IN_PROGRESS',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export const BOOKING_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export const CONSULTATION_STATUS = {
  WAITING: 'WAITING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export const SOCKET_EVENTS = {
  // Connection
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',

  // Auth
  AUTHENTICATE: 'authenticate',
  AUTHENTICATED: 'authenticated',

  // Consultation
  JOIN_CONSULTATION: 'join_consultation',
  LEAVE_CONSULTATION: 'leave_consultation',
  CONSULTATION_STARTED: 'consultation_started',
  CONSULTATION_ENDED: 'consultation_ended',

  // WebRTC signaling
  OFFER: 'webrtc:offer',
  ANSWER: 'webrtc:answer',
  ICE_CANDIDATE: 'webrtc:ice_candidate',
  CALL_ENDED: 'webrtc:call_ended',

  // Chat
  SEND_MESSAGE: 'chat:send',
  NEW_MESSAGE: 'chat:new',
  TYPING: 'chat:typing',

  // Orders & tracking
  ORDER_UPDATE: 'order:update',
  LOCATION_UPDATE: 'location:update',
  DRIVER_ASSIGNED: 'driver:assigned',

  // Notifications
  NOTIFICATION: 'notification',
} as const;
