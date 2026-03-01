import type { USER_ROLES, DOCTOR_TYPES, ORDER_STATUS, BOOKING_STATUS, CONSULTATION_STATUS } from './constants';

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type DoctorType = (typeof DOCTOR_TYPES)[keyof typeof DOCTOR_TYPES];
export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
export type BookingStatus = (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];
export type ConsultationStatus = (typeof CONSULTATION_STATUS)[keyof typeof CONSULTATION_STATUS];

// ─── User ────────────────────────────────────────────
export interface User {
  id: string;
  phone: string;
  email?: string;
  name: string;
  avatar?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
}

export interface Patient extends User {
  role: 'PATIENT';
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  bloodGroup?: string;
  allergies?: string[];
  emergencyContact?: string;
  address?: Address;
}

export interface Doctor extends User {
  role: 'DOCTOR' | 'VET' | 'DENTIST';
  doctorType: DoctorType;
  specialization: string;
  qualification: string;
  experience: number;
  registrationNumber: string;
  consultationFee: number;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  hospital?: string;
  bio?: string;
  languages?: string[];
}

export interface Vendor extends User {
  role: 'VENDOR';
  shopName: string;
  licenseNumber: string;
  address: Address;
  isOpen: boolean;
  rating: number;
}

export interface Lab extends User {
  role: 'LAB';
  labName: string;
  licenseNumber: string;
  address: Address;
  services: string[];
  homeCollection: boolean;
  rating: number;
}

export interface Driver extends User {
  role: 'DRIVER';
  vehicleType: 'BIKE' | 'CAR' | 'AMBULANCE';
  vehicleNumber: string;
  licenseNumber: string;
  isOnline: boolean;
  currentLocation?: GeoLocation;
}

// ─── Common ──────────────────────────────────────────
export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  coordinates?: GeoLocation;
}

export interface GeoLocation {
  lat: number;
  lng: number;
}

// ─── Consultation ────────────────────────────────────
export interface Consultation {
  id: string;
  patientId: string;
  doctorId: string;
  type: 'VIDEO' | 'AUDIO' | 'CHAT';
  status: ConsultationStatus;
  scheduledAt?: string;
  startedAt?: string;
  endedAt?: string;
  prescription?: Prescription;
  notes?: string;
  fee: number;
}

export interface Prescription {
  id: string;
  consultationId: string;
  doctorId: string;
  patientId: string;
  medicines: PrescriptionMedicine[];
  diagnosis: string;
  notes?: string;
  createdAt: string;
}

export interface PrescriptionMedicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

// ─── Booking ─────────────────────────────────────────
export interface Booking {
  id: string;
  patientId: string;
  serviceType: string;
  status: BookingStatus;
  scheduledAt: string;
  address?: Address;
  notes?: string;
  fee: number;
  createdAt: string;
}

// ─── Medicine Order ──────────────────────────────────
export interface MedicineOrder {
  id: string;
  patientId: string;
  vendorId?: string;
  driverId?: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  deliveryAddress: Address;
  prescriptionUrl?: string;
  createdAt: string;
}

export interface OrderItem {
  medicineId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  price: number;
  category: string;
  requiresPrescription: boolean;
  inStock: boolean;
  imageUrl?: string;
}

// ─── Lab Test ────────────────────────────────────────
export interface LabBooking {
  id: string;
  patientId: string;
  labId?: string;
  tests: LabTest[];
  status: BookingStatus;
  homeCollection: boolean;
  scheduledAt: string;
  address?: Address;
  totalAmount: number;
  reportUrl?: string;
  createdAt: string;
}

export interface LabTest {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  preparationInstructions?: string;
}

// ─── Health Record ───────────────────────────────────
export interface HealthRecord {
  id: string;
  patientId: string;
  type: 'PRESCRIPTION' | 'LAB_REPORT' | 'DISCHARGE_SUMMARY' | 'IMAGING' | 'OTHER';
  title: string;
  fileUrl: string;
  doctorName?: string;
  date: string;
  notes?: string;
}

// ─── Ambulance ───────────────────────────────────────
export interface AmbulanceRequest {
  id: string;
  patientId: string;
  driverId?: string;
  pickupLocation: GeoLocation;
  pickupAddress: string;
  hospitalId?: string;
  status: OrderStatus;
  emergencyType: 'CRITICAL' | 'NON_CRITICAL';
  createdAt: string;
}

// ─── API Response ────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Auth ────────────────────────────────────────────
export interface LoginRequest {
  phone: string;
}

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface StaffLoginRequest {
  email: string;
  password: string;
}
