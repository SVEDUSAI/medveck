import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { ArrowLeft } from 'lucide-react';

type TabKey = 'PRIVACY' | 'TERMS' | 'REFUND';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'PRIVACY', label: 'Privacy Policy' },
  { key: 'TERMS', label: 'Terms of Service' },
  { key: 'REFUND', label: 'Refund Policy' },
];

export function PrivacyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('PRIVACY');

  return (
    <div className="px-4 pt-4 space-y-4 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-heading font-bold text-lg text-gray-900">Privacy & Terms</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={clsx(
              'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
              activeTab === tab.key
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        {activeTab === 'PRIVACY' && <PrivacyContent />}
        {activeTab === 'TERMS' && <TermsContent />}
        {activeTab === 'REFUND' && <RefundContent />}
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-heading font-bold text-base text-gray-900 mt-5 mb-2">{children}</h2>;
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-semibold text-sm text-gray-800 mt-3 mb-1">{children}</h3>;
}

function Para({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-600 leading-relaxed mb-2">{children}</p>;
}

function ListItem({ children }: { children: React.ReactNode }) {
  return <li className="text-sm text-gray-600 leading-relaxed">{children}</li>;
}

function PrivacyContent() {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-3">Last updated: February 15, 2026</p>

      <SectionHeading>1. Information We Collect</SectionHeading>
      <Para>
        MedVek Health Technologies Pvt. Ltd. collects information you provide when creating an account, booking consultations, ordering medicines, or using our services. This includes personal identification details, health information, and payment data necessary to deliver our healthcare services.
      </Para>
      <SubHeading>Personal Information</SubHeading>
      <ul className="list-disc pl-5 space-y-1 mb-2">
        <ListItem>Name, phone number, email address, and date of birth</ListItem>
        <ListItem>Gender, blood group, and allergy information</ListItem>
        <ListItem>Delivery addresses and emergency contact details</ListItem>
        <ListItem>Payment method details (tokenized and encrypted)</ListItem>
      </ul>
      <SubHeading>Health Information</SubHeading>
      <ul className="list-disc pl-5 space-y-1 mb-2">
        <ListItem>Consultation notes and prescriptions</ListItem>
        <ListItem>Lab test results and medical records</ListItem>
        <ListItem>Medication history and health conditions</ListItem>
      </ul>

      <SectionHeading>2. How We Use Your Information</SectionHeading>
      <Para>
        Your information is used to provide and improve our healthcare services. We use your data to facilitate doctor consultations, process medicine orders, coordinate lab tests, and dispatch ambulance services. We also use aggregated and anonymized data to improve our platform and services.
      </Para>
      <ul className="list-disc pl-5 space-y-1 mb-2">
        <ListItem>Facilitating teleconsultations and managing appointments</ListItem>
        <ListItem>Processing and delivering medicine orders</ListItem>
        <ListItem>Coordinating lab sample collection and report delivery</ListItem>
        <ListItem>Sending appointment reminders and health notifications</ListItem>
      </ul>

      <SectionHeading>3. Data Sharing and Security</SectionHeading>
      <Para>
        We share your health information only with healthcare providers involved in your care. Your data is encrypted in transit and at rest using AES-256 encryption. We comply with applicable data protection regulations and healthcare data standards. We do not sell your personal information to third parties.
      </Para>

      <SectionHeading>4. Your Rights</SectionHeading>
      <Para>
        You have the right to access, correct, or delete your personal data. You may request a copy of your health records at any time. To exercise these rights, contact our Data Protection Officer at privacy@medvek.in or raise a support ticket through the app.
      </Para>
    </div>
  );
}

function TermsContent() {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-3">Last updated: February 15, 2026</p>

      <SectionHeading>1. Acceptance of Terms</SectionHeading>
      <Para>
        By downloading, accessing, or using the MedVek application, you agree to be bound by these Terms of Service. MedVek is a healthcare technology platform that connects patients with licensed healthcare providers, pharmacies, diagnostic laboratories, and emergency services. These terms govern your use of all services offered through the platform.
      </Para>

      <SectionHeading>2. Healthcare Services</SectionHeading>
      <Para>
        MedVek facilitates connections between patients and healthcare providers but does not directly provide medical care. All medical advice, diagnoses, and prescriptions are provided by independently licensed healthcare professionals. In case of a medical emergency, please call emergency services directly.
      </Para>
      <SubHeading>Teleconsultation</SubHeading>
      <ul className="list-disc pl-5 space-y-1 mb-2">
        <ListItem>Consultations are conducted by licensed medical practitioners</ListItem>
        <ListItem>Digital prescriptions are valid per applicable regulations</ListItem>
        <ListItem>Consultation fees are non-refundable once the session begins</ListItem>
      </ul>
      <SubHeading>Medicine Delivery</SubHeading>
      <ul className="list-disc pl-5 space-y-1 mb-2">
        <ListItem>Prescription medicines require a valid prescription</ListItem>
        <ListItem>Delivery timelines are estimates and may vary</ListItem>
        <ListItem>All medicines are sourced from licensed pharmacies</ListItem>
      </ul>

      <SectionHeading>3. User Responsibilities</SectionHeading>
      <Para>
        You are responsible for providing accurate health information during consultations and maintaining the confidentiality of your account credentials. You agree not to share prescriptions or use the platform for purposes other than genuine healthcare needs. Misuse of the platform may result in account suspension.
      </Para>

      <SectionHeading>4. Limitation of Liability</SectionHeading>
      <Para>
        MedVek shall not be liable for any adverse outcomes resulting from medical advice provided by healthcare providers on the platform. We are a technology facilitator and do not guarantee the accuracy of any medical opinion. The platform is provided on an as-is basis and we disclaim all warranties to the fullest extent permitted by law.
      </Para>
    </div>
  );
}

function RefundContent() {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-3">Last updated: February 15, 2026</p>

      <SectionHeading>1. Consultation Refunds</SectionHeading>
      <Para>
        Full refunds are issued if a doctor does not join the consultation within 10 minutes of the scheduled time. If you cancel a consultation more than 2 hours before the scheduled time, a full refund will be processed. Cancellations within 2 hours of the appointment are eligible for a 50% refund. No refund is provided after the consultation has started.
      </Para>
      <ul className="list-disc pl-5 space-y-1 mb-2">
        <ListItem>Doctor no-show: 100% refund within 24 hours</ListItem>
        <ListItem>Cancellation more than 2 hours prior: 100% refund</ListItem>
        <ListItem>Cancellation within 2 hours: 50% refund</ListItem>
        <ListItem>Post-consultation: No refund applicable</ListItem>
      </ul>

      <SectionHeading>2. Medicine Order Refunds</SectionHeading>
      <Para>
        Orders cancelled before the pharmacy accepts them receive a full refund. Once the pharmacy begins preparing the order, cancellation is subject to a 10% processing fee. Delivered orders can be returned within 48 hours if the packaging is unopened and undamaged. Prescription medicines cannot be returned due to regulatory requirements.
      </Para>

      <SectionHeading>3. Lab Test Refunds</SectionHeading>
      <Para>
        Full refunds are available for lab test cancellations made before sample collection. Once the sample has been collected, no refund can be processed. If the lab is unable to produce a report due to sample quality issues, a free re-collection will be arranged at no additional cost to the patient.
      </Para>

      <SectionHeading>4. Refund Processing</SectionHeading>
      <Para>
        All approved refunds are processed within 5 to 7 business days to the original payment method. Wallet refunds are credited instantly. You can track the status of your refund in the My Orders section. For any refund-related queries, please contact our support team through the app or email refunds@medvek.in.
      </Para>
    </div>
  );
}
