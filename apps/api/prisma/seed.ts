import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Seeding MedVek database...');

  // Clean existing data
  await prisma.chatMessage.deleteMany();
  await prisma.prescription.deleteMany();
  await prisma.consultation.deleteMany();
  await prisma.medicineOrder.deleteMany();
  await prisma.labBooking.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.ambulanceRequest.deleteMany();
  await prisma.healthRecord.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.otp.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.platformConfig.deleteMany();
  await prisma.medicine.deleteMany();
  await prisma.labTest.deleteMany();
  await prisma.user.deleteMany();
  await prisma.address.deleteMany();

  const hash = await bcrypt.hash('admin123', 12);
  const userHash = await bcrypt.hash('password123', 12);

  // ─── Super Admin ──────────────────────────────────
  const superAdmin = await prisma.user.create({
    data: {
      name: 'Super Admin', email: 'superadmin@medvek.com', phone: '9000000001',
      password: hash, role: 'SUPER_ADMIN', isVerified: true,
    },
  });

  // ─── Admin ────────────────────────────────────────
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User', email: 'admin@medvek.com', phone: '9000000002',
      password: hash, role: 'ADMIN', isVerified: true,
    },
  });

  // ─── Doctors ──────────────────────────────────────
  const doc1 = await prisma.user.create({
    data: {
      name: 'Dr. Priya Sharma', email: 'priya@medvek.com', phone: '9100000001',
      password: userHash, role: 'DOCTOR', isVerified: true,
      doctorType: 'MEDICAL', specialization: 'General Physician', qualification: 'MBBS, MD',
      experience: 12, registrationNumber: 'MCI-12345', consultationFee: 500,
      rating: 4.8, reviewCount: 234, hospital: 'Apollo Hospital', bio: 'Experienced general physician with 12 years of practice.',
      languages: ['English', 'Hindi', 'Telugu'],
    },
  });

  const doc2 = await prisma.user.create({
    data: {
      name: 'Dr. Rajesh Kumar', email: 'rajesh@medvek.com', phone: '9100000002',
      password: userHash, role: 'DOCTOR', isVerified: true,
      doctorType: 'MEDICAL', specialization: 'Cardiologist', qualification: 'MBBS, DM Cardiology',
      experience: 20, registrationNumber: 'MCI-12346', consultationFee: 1000,
      rating: 4.9, reviewCount: 567, hospital: 'Fortis Healthcare', bio: 'Senior cardiologist specializing in interventional cardiology.',
      languages: ['English', 'Hindi'],
    },
  });

  const doc3 = await prisma.user.create({
    data: {
      name: 'Dr. Anita Desai', email: 'anita@medvek.com', phone: '9100000003',
      password: userHash, role: 'DOCTOR', isVerified: true,
      doctorType: 'MEDICAL', specialization: 'Dermatologist', qualification: 'MBBS, MD Dermatology',
      experience: 8, registrationNumber: 'MCI-12347', consultationFee: 700,
      rating: 4.7, reviewCount: 189, hospital: 'Max Healthcare', bio: 'Skin care specialist with expertise in cosmetic dermatology.',
      languages: ['English', 'Hindi', 'Marathi'],
    },
  });

  // ─── Vets ─────────────────────────────────────────
  const vet1 = await prisma.user.create({
    data: {
      name: 'Dr. Arjun Patel', email: 'arjun.vet@medvek.com', phone: '9100000004',
      password: userHash, role: 'VET', isVerified: true,
      doctorType: 'VETERINARY', specialization: 'Small Animals', qualification: 'BVSc, MVSc',
      experience: 10, registrationNumber: 'VCI-5001', consultationFee: 400,
      rating: 4.6, reviewCount: 156, hospital: 'PetCare Clinic', bio: 'Caring for your furry friends for over a decade.',
      languages: ['English', 'Hindi', 'Gujarati'],
    },
  });

  const vet2 = await prisma.user.create({
    data: {
      name: 'Dr. Meera Nair', email: 'meera.vet@medvek.com', phone: '9100000005',
      password: userHash, role: 'VET', isVerified: true,
      doctorType: 'VETERINARY', specialization: 'Large Animals', qualification: 'BVSc, MVSc Surgery',
      experience: 15, registrationNumber: 'VCI-5002', consultationFee: 600,
      rating: 4.8, reviewCount: 98, hospital: 'Animal Welfare Clinic', bio: 'Expert in large animal care and surgery.',
      languages: ['English', 'Hindi', 'Malayalam'],
    },
  });

  // ─── Dentist ──────────────────────────────────────
  const dentist1 = await prisma.user.create({
    data: {
      name: 'Dr. Sanjay Gupta', email: 'sanjay.dental@medvek.com', phone: '9100000006',
      password: userHash, role: 'DENTIST', isVerified: true,
      doctorType: 'DENTAL', specialization: 'Orthodontist', qualification: 'BDS, MDS Orthodontics',
      experience: 14, registrationNumber: 'DCI-3001', consultationFee: 600,
      rating: 4.7, reviewCount: 312, hospital: 'SmileCare Dental', bio: 'Transforming smiles with modern orthodontic solutions.',
      languages: ['English', 'Hindi'],
    },
  });

  // ─── Vendors (Pharmacies) ─────────────────────────
  const vendor1 = await prisma.user.create({
    data: {
      name: 'MedPlus Pharmacy', email: 'medplus@medvek.com', phone: '9200000001',
      password: userHash, role: 'VENDOR', isVerified: true,
      shopName: 'MedPlus Pharmacy - Banjara Hills', vendorLicense: 'PH-HYD-001', isOpen: true,
    },
  });

  const vendor2 = await prisma.user.create({
    data: {
      name: 'Apollo Pharmacy', email: 'apollo.pharm@medvek.com', phone: '9200000002',
      password: userHash, role: 'VENDOR', isVerified: true,
      shopName: 'Apollo Pharmacy - Jubilee Hills', vendorLicense: 'PH-HYD-002', isOpen: true,
    },
  });

  // ─── Labs ─────────────────────────────────────────
  const lab1 = await prisma.user.create({
    data: {
      name: 'Thyrocare Labs', email: 'thyrocare@medvek.com', phone: '9300000001',
      password: userHash, role: 'LAB', isVerified: true,
      labName: 'Thyrocare Diagnostics - Hitech City', labLicense: 'LB-HYD-001',
      labServices: ['Blood Tests', 'Urine Tests', 'Thyroid Panel', 'Full Body Checkup'], homeCollection: true,
    },
  });

  const lab2 = await prisma.user.create({
    data: {
      name: 'SRL Diagnostics', email: 'srl@medvek.com', phone: '9300000002',
      password: userHash, role: 'LAB', isVerified: true,
      labName: 'SRL Diagnostics - Madhapur', labLicense: 'LB-HYD-002',
      labServices: ['Blood Tests', 'X-Ray', 'MRI', 'CT Scan', 'Ultrasound'], homeCollection: true,
    },
  });

  // ─── Drivers ──────────────────────────────────────
  const driver1 = await prisma.user.create({
    data: {
      name: 'Ravi Kumar', email: 'ravi.driver@medvek.com', phone: '9400000001',
      password: userHash, role: 'DRIVER', isVerified: true,
      vehicleType: 'Bike', vehicleNumber: 'TS-09-AB-1234', driverLicense: 'DL-TS-001',
      isOnline: true, lat: 17.4065, lng: 78.4772,
    },
  });

  const driver2 = await prisma.user.create({
    data: {
      name: 'Suresh Reddy', email: 'suresh.driver@medvek.com', phone: '9400000002',
      password: userHash, role: 'DRIVER', isVerified: true,
      vehicleType: 'Bike', vehicleNumber: 'TS-09-CD-5678', driverLicense: 'DL-TS-002',
      isOnline: true, lat: 17.4400, lng: 78.4982,
    },
  });

  const driver3 = await prisma.user.create({
    data: {
      name: 'Ambulance Driver Mahesh', email: 'mahesh.ambulance@medvek.com', phone: '9400000003',
      password: userHash, role: 'DRIVER', isVerified: true,
      vehicleType: 'Ambulance', vehicleNumber: 'TS-09-AM-9999', driverLicense: 'DL-TS-003',
      isOnline: true, lat: 17.3850, lng: 78.4867,
    },
  });

  // ─── Patients ─────────────────────────────────────
  const pat1 = await prisma.user.create({
    data: {
      name: 'Rahul Mehta', phone: '9500000001', role: 'PATIENT', isVerified: true,
      email: 'rahul.m@gmail.com', gender: 'MALE', bloodGroup: 'O+',
      dateOfBirth: new Date('1995-03-15'), emergencyContact: '9500000099',
    },
  });

  const pat2 = await prisma.user.create({
    data: {
      name: 'Sneha Gupta', phone: '9500000002', role: 'PATIENT', isVerified: true,
      email: 'sneha.g@gmail.com', gender: 'FEMALE', bloodGroup: 'A+',
      dateOfBirth: new Date('1998-07-22'), allergies: ['Penicillin'],
    },
  });

  const pat3 = await prisma.user.create({
    data: {
      name: 'Amit Joshi', phone: '9500000003', role: 'PATIENT', isVerified: true,
      email: 'amit.j@gmail.com', gender: 'MALE', bloodGroup: 'B+',
      dateOfBirth: new Date('1990-11-08'),
    },
  });

  const pat4 = await prisma.user.create({
    data: {
      name: 'Priya Krishnan', phone: '9500000004', role: 'PATIENT', isVerified: true,
      email: 'priya.k@gmail.com', gender: 'FEMALE', bloodGroup: 'AB-',
      dateOfBirth: new Date('2000-01-30'),
    },
  });

  const pat5 = await prisma.user.create({
    data: {
      name: 'Vikram Singh', phone: '9500000005', role: 'PATIENT', isVerified: true,
      email: 'vikram.s@gmail.com', gender: 'MALE', bloodGroup: 'O-',
      dateOfBirth: new Date('1988-06-12'),
    },
  });

  // ─── Medicines ────────────────────────────────────
  const medicines = [
    { name: 'Dolo 650mg', genericName: 'Paracetamol', manufacturer: 'Micro Labs', price: 30, category: 'Fever & Pain', description: 'For fever and mild to moderate pain relief' },
    { name: 'Crocin Advance', genericName: 'Paracetamol 500mg', manufacturer: 'GSK', price: 25, category: 'Fever & Pain', description: 'Fast-acting pain and fever relief' },
    { name: 'Combiflam', genericName: 'Ibuprofen + Paracetamol', manufacturer: 'Sanofi', price: 42, category: 'Fever & Pain', description: 'Dual action pain relief' },
    { name: 'Calpol 500', genericName: 'Paracetamol', manufacturer: 'GSK', price: 18, category: 'Fever & Pain', description: 'Gentle pain relief' },
    { name: 'Sinarest New', genericName: 'Paracetamol + Phenylephrine + CPM', manufacturer: 'Centaur', price: 35, category: 'Cold & Cough', description: 'Cold and flu symptom relief' },
    { name: 'Benadryl Cough Syrup', genericName: 'Diphenhydramine', manufacturer: 'Johnson & Johnson', price: 95, category: 'Cold & Cough', description: 'Cough suppressant' },
    { name: 'Vicks Action 500', genericName: 'Paracetamol + Caffeine + Phenylephrine', manufacturer: 'P&G', price: 28, category: 'Cold & Cough', description: 'Advanced cold relief' },
    { name: 'Digene Gel', genericName: 'Dried Aluminium Hydroxide + Milk of Magnesia', manufacturer: 'Abbott', price: 75, category: 'Stomach', description: 'Antacid for acidity relief' },
    { name: 'Pan-D', genericName: 'Pantoprazole + Domperidone', manufacturer: 'Alkem', price: 120, category: 'Stomach', requiresPrescription: true, description: 'For acid reflux and gastric issues' },
    { name: 'Gelusil MPS', genericName: 'Magaldrate + Simethicone', manufacturer: 'Pfizer', price: 85, category: 'Stomach', description: 'Gas and acidity relief' },
    { name: 'Betadine Cream', genericName: 'Povidone Iodine', manufacturer: 'Win Medicare', price: 65, category: 'Skin Care', description: 'Antiseptic skin cream' },
    { name: 'Clobetasol Cream', genericName: 'Clobetasol Propionate', manufacturer: 'Glenmark', price: 110, category: 'Skin Care', requiresPrescription: true, description: 'For severe skin conditions' },
    { name: 'Metformin 500mg', genericName: 'Metformin', manufacturer: 'USV', price: 45, category: 'Diabetes', requiresPrescription: true, description: 'Blood sugar control' },
    { name: 'Glimepiride 2mg', genericName: 'Glimepiride', manufacturer: 'Sanofi', price: 85, category: 'Diabetes', requiresPrescription: true, description: 'Oral diabetes medication' },
    { name: 'Atorvastatin 10mg', genericName: 'Atorvastatin', manufacturer: 'Ranbaxy', price: 65, category: 'Heart', requiresPrescription: true, description: 'Cholesterol management' },
    { name: 'Amlodipine 5mg', genericName: 'Amlodipine Besylate', manufacturer: 'Pfizer', price: 38, category: 'Heart', requiresPrescription: true, description: 'Blood pressure control' },
    { name: 'Becosules Capsules', genericName: 'B-Complex + Vitamin C', manufacturer: 'Pfizer', price: 32, category: 'Vitamins', description: 'Daily vitamin supplement' },
    { name: 'Limcee Chewable', genericName: 'Vitamin C 500mg', manufacturer: 'Abbott', price: 25, category: 'Vitamins', description: 'Vitamin C supplement' },
    { name: 'Shelcal 500', genericName: 'Calcium + Vitamin D3', manufacturer: 'Torrent', price: 115, category: 'Vitamins', description: 'Bone health supplement' },
    { name: 'Supradyn Daily', genericName: 'Multivitamin + Minerals', manufacturer: 'Abbott', price: 55, category: 'Vitamins', description: 'Complete daily multivitamin' },
  ];

  for (const med of medicines) {
    await prisma.medicine.create({ data: med });
  }

  // ─── Lab Tests ────────────────────────────────────
  const labTests = [
    { name: 'Complete Blood Count (CBC)', category: 'Popular', price: 350, description: 'Measures various blood cell types', preparationInstructions: 'No fasting required' },
    { name: 'Liver Function Test (LFT)', category: 'Popular', price: 500, description: 'Evaluates liver health', preparationInstructions: '10-12 hrs fasting required' },
    { name: 'Kidney Function Test (KFT)', category: 'Popular', price: 550, description: 'Assesses kidney function', preparationInstructions: '8-10 hrs fasting' },
    { name: 'Aarogyam Full Body Checkup', category: 'Full Body', price: 1999, description: 'Comprehensive 80+ parameter test', preparationInstructions: '10-12 hrs overnight fasting' },
    { name: 'Vitals Full Body Checkup', category: 'Full Body', price: 999, description: 'Essential 50+ parameter health screening', preparationInstructions: '8 hrs fasting' },
    { name: 'HbA1c (Glycated Hemoglobin)', category: 'Diabetes', price: 450, description: '3-month average blood sugar', preparationInstructions: 'No fasting required' },
    { name: 'Fasting Blood Sugar', category: 'Diabetes', price: 100, description: 'Blood sugar after fasting', preparationInstructions: '8-10 hrs fasting required' },
    { name: 'Glucose Tolerance Test (GTT)', category: 'Diabetes', price: 300, description: 'Measures body glucose processing', preparationInstructions: '10-12 hrs fasting, 2-hr test' },
    { name: 'Thyroid Profile (T3, T4, TSH)', category: 'Thyroid', price: 600, description: 'Complete thyroid function assessment', preparationInstructions: 'No fasting required' },
    { name: 'TSH (Thyroid Stimulating Hormone)', category: 'Thyroid', price: 250, description: 'Thyroid screening test', preparationInstructions: 'No fasting required' },
    { name: 'Lipid Profile', category: 'Heart', price: 400, description: 'Cholesterol and triglycerides', preparationInstructions: '10-12 hrs fasting required' },
    { name: 'Cardiac Risk Markers', category: 'Heart', price: 1200, description: 'CRP, Homocysteine, Lp(a)', preparationInstructions: '10-12 hrs fasting' },
    { name: 'Vitamin D (25-Hydroxy)', category: 'Vitamins', price: 800, description: 'Vitamin D level assessment', preparationInstructions: 'No fasting required' },
    { name: 'Vitamin B12', category: 'Vitamins', price: 650, description: 'B12 level check', preparationInstructions: 'No fasting required' },
    { name: 'Iron Studies Panel', category: 'Women', price: 700, description: 'Ferritin, serum iron, TIBC', preparationInstructions: '8 hrs fasting' },
  ];

  for (const test of labTests) {
    await prisma.labTest.create({ data: test });
  }

  // ─── Sample Consultations ─────────────────────────
  const now = new Date();

  await prisma.consultation.create({
    data: {
      patientId: pat1.id, doctorId: doc1.id, type: 'VIDEO',
      status: 'WAITING', fee: 500, scheduledAt: new Date(now.getTime() + 30 * 60000),
      notes: 'Fever & cold since 3 days',
    },
  });

  await prisma.consultation.create({
    data: {
      patientId: pat2.id, doctorId: doc1.id, type: 'AUDIO',
      status: 'WAITING', fee: 500, scheduledAt: new Date(now.getTime() + 60 * 60000),
      notes: 'Headache and dizziness',
    },
  });

  const completedConsult = await prisma.consultation.create({
    data: {
      patientId: pat3.id, doctorId: doc2.id, type: 'VIDEO',
      status: 'COMPLETED', fee: 1000, scheduledAt: new Date(now.getTime() - 2 * 3600000),
      startedAt: new Date(now.getTime() - 2 * 3600000), endedAt: new Date(now.getTime() - 1.5 * 3600000),
      notes: 'Chest pain evaluation',
    },
  });

  await prisma.prescription.create({
    data: {
      consultationId: completedConsult.id, doctorId: doc2.id, patientId: pat3.id,
      diagnosis: 'Mild acid reflux causing chest discomfort',
      medicines: [
        { name: 'Pan-D', dosage: '1 tablet', frequency: 'Before breakfast', duration: '14 days' },
        { name: 'Gelusil MPS', dosage: '2 tsp', frequency: 'After meals', duration: '7 days' },
      ],
      notes: 'Avoid spicy food. Follow up after 2 weeks.',
    },
  });

  // ─── Sample Orders ────────────────────────────────
  await prisma.medicineOrder.create({
    data: {
      patientId: pat1.id, vendorId: vendor1.id, driverId: driver1.id,
      items: [
        { name: 'Dolo 650mg', qty: 2, price: 30 },
        { name: 'Sinarest New', qty: 1, price: 35 },
        { name: 'Crocin Advance', qty: 1, price: 25 },
      ],
      status: 'OUT_FOR_DELIVERY', totalAmount: 120, deliveryAddress: 'Flat 402, Green Park, Banjara Hills, Hyderabad',
    },
  });

  await prisma.medicineOrder.create({
    data: {
      patientId: pat2.id, vendorId: vendor2.id,
      items: [
        { name: 'Combiflam', qty: 1, price: 42 },
        { name: 'Becosules Capsules', qty: 2, price: 32 },
      ],
      status: 'PENDING', totalAmount: 106, deliveryAddress: 'House 12, Jubilee Hills, Hyderabad',
    },
  });

  await prisma.medicineOrder.create({
    data: {
      patientId: pat3.id, vendorId: vendor1.id, driverId: driver2.id,
      items: [
        { name: 'Pan-D', qty: 1, price: 120 },
        { name: 'Gelusil MPS', qty: 1, price: 85 },
      ],
      status: 'DELIVERED', totalAmount: 205, deliveryAddress: '201 A, Lakdi Ka Pool, Hyderabad',
    },
  });

  // ─── Sample Lab Bookings ──────────────────────────
  await prisma.labBooking.create({
    data: {
      patientId: pat2.id, labId: lab1.id,
      tests: [{ name: 'Complete Blood Count (CBC)', price: 350 }, { name: 'Thyroid Profile', price: 600 }],
      status: 'PENDING', homeCollection: true, totalAmount: 950,
      scheduledAt: new Date(now.getTime() + 24 * 3600000), address: '15 B, Kukatpally, Hyderabad',
    },
  });

  await prisma.labBooking.create({
    data: {
      patientId: pat3.id, labId: lab2.id,
      tests: [{ name: 'Lipid Profile', price: 400 }, { name: 'HbA1c', price: 450 }],
      status: 'IN_PROGRESS', homeCollection: false, totalAmount: 850,
      scheduledAt: new Date(now.getTime() + 2 * 3600000),
    },
  });

  // ─── Sample Bookings ──────────────────────────────
  await prisma.booking.create({
    data: {
      patientId: pat4.id, serviceType: 'HOME_VISIT', status: 'CONFIRMED',
      scheduledAt: new Date(now.getTime() + 48 * 3600000), fee: 800,
      address: '22 C, Gachibowli, Hyderabad', notes: 'Elderly patient, needs home checkup',
    },
  });

  await prisma.booking.create({
    data: {
      patientId: pat5.id, serviceType: 'NURSE_CARE', status: 'PENDING',
      scheduledAt: new Date(now.getTime() + 72 * 3600000), fee: 1200,
      address: '45 D, HITEC City, Hyderabad', notes: 'Post-surgery wound dressing for 5 days',
    },
  });

  // ─── Platform Config ──────────────────────────────
  const configs = [
    { key: 'app_name', value: 'MedVek' },
    { key: 'support_email', value: 'support@medvek.com' },
    { key: 'support_phone', value: '+91-1800-MEDVEK' },
    { key: 'commission_percentage', value: 15 },
    { key: 'min_order_amount', value: 100 },
    { key: 'ambulance_base_fare', value: 500 },
    { key: 'ambulance_per_km', value: 20 },
    { key: 'default_consultation_fee', value: 500 },
    { key: 'max_consultation_wait_minutes', value: 15 },
    { key: 'auto_cancel_timeout_minutes', value: 30 },
    { key: 'maintenance_mode', value: false },
  ];

  for (const cfg of configs) {
    await prisma.platformConfig.create({ data: { key: cfg.key, value: cfg.value as any } });
  }

  console.log('✅ Seed completed!');
  console.log('');
  console.log('Login credentials:');
  console.log('─────────────────────────────────');
  console.log('Super Admin: superadmin@medvek.com / admin123');
  console.log('Admin:       admin@medvek.com / admin123');
  console.log('Doctor:      priya@medvek.com / password123');
  console.log('Vet:         arjun.vet@medvek.com / password123');
  console.log('Dentist:     sanjay.dental@medvek.com / password123');
  console.log('Vendor:      medplus@medvek.com / password123');
  console.log('Lab:         thyrocare@medvek.com / password123');
  console.log('Driver:      ravi.driver@medvek.com / password123');
  console.log('Patient:     Phone: 9500000001 (use OTP)');
  console.log('─────────────────────────────────');
}

seed()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
