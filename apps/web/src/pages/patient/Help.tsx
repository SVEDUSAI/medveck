import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/ui/SearchBar';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  ArrowLeft, ChevronDown, ChevronUp, Phone, Mail,
  MessageCircle, FileText, ShoppingBag, Stethoscope,
  FlaskConical, CreditCard, User, HelpCircle,
} from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  icon: React.ReactNode;
  color: string;
  faqs: FAQ[];
}

const faqSections: FAQSection[] = [
  {
    title: 'Orders & Delivery',
    icon: <ShoppingBag className="w-5 h-5" />,
    color: 'text-green-600 bg-green-50',
    faqs: [
      { question: 'How do I track my medicine order?', answer: 'You can track your order in real-time from the "My Orders" section. Each order shows a progress bar with status updates from placement to delivery. You will also receive SMS and push notifications at each stage.' },
      { question: 'What if my order is delayed?', answer: 'If your order is delayed beyond the estimated delivery time, you can contact our support team. Most delays are resolved within 30 minutes. You are eligible for a refund if the delay exceeds 2 hours from the promised time.' },
      { question: 'Can I cancel my order?', answer: 'You can cancel your order before it is accepted by the pharmacy. Once the pharmacy starts preparing your order, cancellation may not be possible. Visit My Orders and tap the Cancel button if it is still available.' },
      { question: 'Do you deliver prescription medicines?', answer: 'Yes, we deliver prescription medicines. You will need to upload a valid prescription during the ordering process. Our pharmacist will verify the prescription before dispatching. Prescriptions must be issued within the last 6 months.' },
    ],
  },
  {
    title: 'Consultations',
    icon: <Stethoscope className="w-5 h-5" />,
    color: 'text-blue-600 bg-blue-50',
    faqs: [
      { question: 'How do video consultations work?', answer: 'After booking, you will receive a link to join the consultation. At the scheduled time, tap the Join button in your appointment details. Ensure you have a stable internet connection and your camera and microphone are enabled.' },
      { question: 'Can I get a prescription from an online consultation?', answer: 'Yes, doctors can issue digital prescriptions during online consultations. The prescription will be saved in your Health Records and can be used to order medicines directly through the app.' },
      { question: 'What if the doctor does not join on time?', answer: 'If a doctor does not join within 5 minutes of the scheduled time, you will receive the option for a full refund or to reschedule with any available doctor at no extra charge.' },
    ],
  },
  {
    title: 'Lab Tests',
    icon: <FlaskConical className="w-5 h-5" />,
    color: 'text-purple-600 bg-purple-50',
    faqs: [
      { question: 'How does home sample collection work?', answer: 'After booking a lab test with home collection, a trained phlebotomist will visit your address at the scheduled time. They carry all necessary equipment and follow strict hygiene protocols. The samples are transported to the lab in temperature-controlled containers.' },
      { question: 'When will I get my lab report?', answer: 'Report turnaround time depends on the test. Most routine tests like CBC and Thyroid Panel are available within 24 hours. Specialized tests may take 3 to 5 business days. You will receive a notification when your report is ready.' },
      { question: 'Are lab results accurate?', answer: 'We partner only with NABL-accredited laboratories that follow stringent quality control protocols. All samples undergo proper handling and testing procedures to ensure accuracy of results.' },
    ],
  },
  {
    title: 'Payments & Refunds',
    icon: <CreditCard className="w-5 h-5" />,
    color: 'text-amber-600 bg-amber-50',
    faqs: [
      { question: 'What payment methods are accepted?', answer: 'We accept all major payment methods including UPI, credit and debit cards (Visa, Mastercard, RuPay), net banking, and the MedVek Wallet. You can also choose cash on delivery for medicine orders.' },
      { question: 'How do refunds work?', answer: 'Refunds are processed within 5 to 7 business days to your original payment method. For wallet payments, refunds are instant. You can track refund status in the My Orders section of the app.' },
      { question: 'Is my payment information secure?', answer: 'We use industry-standard encryption and are PCI DSS compliant. Your card details are tokenized and never stored on our servers. All transactions are processed through secure payment gateways.' },
    ],
  },
  {
    title: 'Account & Profile',
    icon: <User className="w-5 h-5" />,
    color: 'text-indigo-600 bg-indigo-50',
    faqs: [
      { question: 'How do I update my profile information?', answer: 'Go to Profile and tap Edit. You can update your name, email, date of birth, blood group, allergies, and emergency contact. Your phone number cannot be changed as it is linked to your account verification.' },
      { question: 'How do I delete my account?', answer: 'To request account deletion, go to Help and Support and select Raise a Ticket. Choose the category Account Deletion. Your data will be permanently removed within 30 days of the request. Active orders must be completed before deletion.' },
      { question: 'Can I use multiple phone numbers?', answer: 'Currently, each account is linked to a single phone number. If you need to change your registered number, please contact our support team for assistance with the migration process.' },
    ],
  },
];

export function HelpPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const filteredSections = search.trim()
    ? faqSections
        .map((section) => ({
          ...section,
          faqs: section.faqs.filter(
            (faq) =>
              faq.question.toLowerCase().includes(search.toLowerCase()) ||
              faq.answer.toLowerCase().includes(search.toLowerCase()),
          ),
        }))
        .filter((section) => section.faqs.length > 0)
    : faqSections;

  const toggleSection = (idx: number) => {
    setOpenSection(openSection === idx ? null : idx);
    setOpenFaq(null);
  };

  const toggleFaq = (key: string) => {
    setOpenFaq(openFaq === key ? null : key);
  };

  return (
    <div className="px-4 pt-4 space-y-5 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-heading font-bold text-lg text-gray-900">Help & Support</h1>
      </div>

      {/* Search */}
      <SearchBar
        placeholder="Search FAQs..."
        value={search}
        onChange={setSearch}
      />

      {/* FAQ Sections */}
      <div className="space-y-3">
        {filteredSections.map((section, sIdx) => (
          <Card key={section.title} padding="sm" hover={false}>
            {/* Section Header */}
            <button
              className="w-full flex items-center gap-3 py-1"
              onClick={() => toggleSection(sIdx)}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${section.color}`}>
                {section.icon}
              </div>
              <span className="flex-1 text-left text-sm font-semibold text-gray-900">
                {section.title}
              </span>
              {openSection === sIdx
                ? <ChevronUp className="w-4 h-4 text-gray-400" />
                : <ChevronDown className="w-4 h-4 text-gray-400" />
              }
            </button>

            {/* FAQ Items */}
            {(openSection === sIdx || search.trim()) && (
              <div className="mt-3 space-y-1 border-t border-gray-100 pt-3">
                {section.faqs.map((faq, fIdx) => {
                  const key = `${sIdx}-${fIdx}`;
                  const isOpen = openFaq === key;
                  return (
                    <div key={key}>
                      <button
                        className="w-full flex items-start gap-2 py-2.5 text-left"
                        onClick={() => toggleFaq(key)}
                      >
                        <HelpCircle className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                        <span className="flex-1 text-sm text-gray-700 font-medium">{faq.question}</span>
                        {isOpen
                          ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        }
                      </button>
                      {isOpen && (
                        <div className="ml-6 pb-3">
                          <p className="text-xs text-gray-500 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        ))}
      </div>

      {filteredSections.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <HelpCircle className="w-10 h-10 text-gray-300 mb-3" />
          <p className="text-sm font-medium text-gray-500">No results found</p>
          <p className="text-xs text-gray-400 mt-1">Try a different search term</p>
        </div>
      )}

      {/* Contact Support */}
      <div>
        <h2 className="font-heading font-bold text-base text-gray-900 mb-3">Contact Support</h2>
        <div className="grid grid-cols-3 gap-3">
          <button className="flex flex-col items-center gap-2 bg-white rounded-2xl border border-gray-100 p-4 hover:border-primary-200 transition-colors">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-medium text-gray-700">Call Us</span>
          </button>
          <button className="flex flex-col items-center gap-2 bg-white rounded-2xl border border-gray-100 p-4 hover:border-primary-200 transition-colors">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-gray-700">Email</span>
          </button>
          <button className="flex flex-col items-center gap-2 bg-white rounded-2xl border border-gray-100 p-4 hover:border-primary-200 transition-colors">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-gray-700">Live Chat</span>
          </button>
        </div>
      </div>

      {/* Raise Ticket */}
      <Button
        className="w-full"
        variant="secondary"
        icon={<FileText className="w-4 h-4" />}
      >
        Raise a Support Ticket
      </Button>
    </div>
  );
}
