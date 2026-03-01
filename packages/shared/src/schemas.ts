import { z } from 'zod';

export const phoneSchema = z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number');
export const emailSchema = z.string().email('Invalid email');
export const otpSchema = z.string().length(6, 'OTP must be 6 digits');
export const pincodeSchema = z.string().regex(/^\d{6}$/, 'Invalid pincode');

export const loginSchema = z.object({
  phone: phoneSchema,
});

export const verifyOtpSchema = z.object({
  phone: phoneSchema,
  otp: otpSchema,
});

export const staffLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const addressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  pincode: pincodeSchema,
  landmark: z.string().optional(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
});

export const patientProfileSchema = z.object({
  name: z.string().min(2),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  bloodGroup: z.string().optional(),
  allergies: z.array(z.string()).optional(),
  emergencyContact: phoneSchema.optional(),
  address: addressSchema.optional(),
});

export const doctorProfileSchema = z.object({
  name: z.string().min(2),
  doctorType: z.enum(['MEDICAL', 'VETERINARY', 'DENTAL']),
  specialization: z.string().min(1),
  qualification: z.string().min(1),
  experience: z.number().min(0),
  registrationNumber: z.string().min(1),
  consultationFee: z.number().min(0),
  hospital: z.string().optional(),
  bio: z.string().optional(),
  languages: z.array(z.string()).optional(),
});

export const medicineOrderSchema = z.object({
  items: z.array(z.object({
    medicineId: z.string(),
    quantity: z.number().min(1),
  })).min(1),
  deliveryAddress: addressSchema,
  prescriptionUrl: z.string().optional(),
});

export const labBookingSchema = z.object({
  tests: z.array(z.string()).min(1),
  homeCollection: z.boolean(),
  scheduledAt: z.string(),
  address: addressSchema.optional(),
});

export const consultationBookingSchema = z.object({
  doctorId: z.string(),
  type: z.enum(['VIDEO', 'AUDIO', 'CHAT']),
  scheduledAt: z.string().optional(),
  notes: z.string().optional(),
});
