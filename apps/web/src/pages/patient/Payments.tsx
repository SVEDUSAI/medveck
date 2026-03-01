import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard, Wallet, Plus, ArrowLeft, Star, Smartphone,
  CheckCircle, ChevronRight,
} from 'lucide-react';

interface SavedCard {
  id: string;
  type: 'VISA' | 'MASTERCARD' | 'RUPAY';
  lastFour: string;
  expiry: string;
  holderName: string;
  isDefault: boolean;
}

interface SavedUPI {
  id: string;
  upiId: string;
  provider: string;
  isDefault: boolean;
}

const mockCards: SavedCard[] = [
  { id: '1', type: 'VISA', lastFour: '4521', expiry: '12/28', holderName: 'Rahul Mehta', isDefault: true },
  { id: '2', type: 'MASTERCARD', lastFour: '8834', expiry: '06/27', holderName: 'Rahul Mehta', isDefault: false },
];

const mockUPI: SavedUPI[] = [
  { id: '1', upiId: 'rahul@ybl', provider: 'PhonePe', isDefault: false },
  { id: '2', upiId: 'rahul.mehta@oksbi', provider: 'SBI Pay', isDefault: false },
];

const cardTypeConfig: Record<string, { label: string; color: string }> = {
  VISA: { label: 'Visa', color: 'text-blue-700 bg-blue-50' },
  MASTERCARD: { label: 'Mastercard', color: 'text-orange-700 bg-orange-50' },
  RUPAY: { label: 'RuPay', color: 'text-green-700 bg-green-50' },
};

export function PaymentsPage() {
  const navigate = useNavigate();
  const walletBalance = 250;

  return (
    <div className="px-4 pt-4 space-y-5 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-heading font-bold text-lg text-gray-900">Payment Methods</h1>
      </div>

      {/* Wallet Balance */}
      <Card className="bg-gradient-to-r from-primary-500 to-primary-600 border-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-primary-200">MedVek Wallet</p>
            <p className="font-heading font-extrabold text-2xl text-white">Rs. {walletBalance}</p>
          </div>
          <Button variant="secondary" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
            Add Money
          </Button>
        </div>
      </Card>

      {/* Saved Cards */}
      <div>
        <h2 className="font-heading font-bold text-base text-gray-900 mb-3">Saved Cards</h2>
        <div className="space-y-3">
          {mockCards.map((card) => {
            const cfg = cardTypeConfig[card.type];
            return (
              <Card key={card.id} padding="sm" className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">
                      {cfg.label} **** {card.lastFour}
                    </p>
                    {card.isDefault && (
                      <Badge variant="success" className="text-[10px] py-0 px-2">Default</Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {card.holderName} | Expires {card.expiry}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
              </Card>
            );
          })}
        </div>
      </div>

      {/* Saved UPI */}
      <div>
        <h2 className="font-heading font-bold text-base text-gray-900 mb-3">UPI Accounts</h2>
        <div className="space-y-3">
          {mockUPI.map((upi) => (
            <Card key={upi.id} padding="sm" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-purple-50 text-purple-600">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-gray-900">{upi.upiId}</p>
                  {upi.isDefault && (
                    <Badge variant="success" className="text-[10px] py-0 px-2">Default</Badge>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{upi.provider}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
            </Card>
          ))}
        </div>
      </div>

      {/* Add New Method */}
      <Button
        className="w-full"
        variant="secondary"
        icon={<Plus className="w-4 h-4" />}
      >
        Add New Payment Method
      </Button>
    </div>
  );
}
