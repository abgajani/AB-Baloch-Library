import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Crown, 
  Check, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  CreditCard,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PremiumModal: React.FC = () => {
  const { showPremiumModal, setShowPremiumModal, language, upgradeToPremium } = useApp();

  const [selectedPlan, setSelectedPlan] = useState<'monthly' | '6month' | 'yearly'>('yearly');
  const [paymentMethod, setPaymentMethod] = useState<'jazzcash' | 'easypaisa' | 'card' | 'raast'>('jazzcash');
  const [accountNumber, setAccountNumber] = useState('0300 1234567');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!showPremiumModal) return null;

  const plans = [
    {
      id: 'monthly',
      nameEn: 'Monthly Plan',
      nameUr: 'ماہانہ پلان',
      price: 'Rs. 500',
      period: '/ month',
      badge: null
    },
    {
      id: '6month',
      nameEn: '6-Month Bundle',
      nameUr: '۶ ماہ کا بنڈل',
      price: 'Rs. 2,400',
      period: '/ 6 mos',
      badge: 'Save 20%'
    },
    {
      id: 'yearly',
      nameEn: 'Annual Pass',
      nameUr: 'سالانہ رکنیت (بہترین بچت)',
      price: 'Rs. 3,900',
      period: '/ year',
      badge: 'Best Value • 7 Days Free Trial'
    }
  ];

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        upgradeToPremium();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-amber-200/50 dark:border-amber-900/30 max-h-[92vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200 space-y-6">
        
        {/* Close Button */}
        <button 
          onClick={() => setShowPremiumModal(false)}
          className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Premium Header Banner */}
        <div className="text-center pt-2">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-400/30">
            <Crown className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white">
            {language === 'ur' ? 'اے بی بلوچ لائبریری پریمیم رکنیت حاصل کریں' : "Upgrade to AB Baloch's Library Pro"}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
            {language === 'ur'
              ? 'تمام ابواب، ماضی کے حل شدہ بورڈ پیپرز اور آف لائن ڈاؤنلوڈز تک لامحدود رسائی۔'
              : 'Unlock all 7 subjects, solved past papers, offline downloads, and detailed reports.'}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
          <div className="grid grid-cols-3 bg-slate-50 dark:bg-slate-800 p-2.5 font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
            <span>Feature</span>
            <span className="text-center text-slate-400">Free</span>
            <span className="text-center text-amber-600 dark:text-amber-400 font-extrabold flex items-center justify-center gap-1">
              <Crown className="w-3 h-3 fill-current" /> Premium
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 p-1">
            <div className="grid grid-cols-3 py-2 px-2 text-slate-600 dark:text-slate-400">
              <span className="font-medium">Lessons Access</span>
              <span className="text-center text-slate-400">Limited</span>
              <span className="text-center text-emerald-600 font-bold">All 100+ Lessons</span>
            </div>
            <div className="grid grid-cols-3 py-2 px-2 text-slate-600 dark:text-slate-400">
              <span className="font-medium">Daily Quizzes</span>
              <span className="text-center text-slate-400">5 / day</span>
              <span className="text-center text-emerald-600 font-bold">Unlimited</span>
            </div>
            <div className="grid grid-cols-3 py-2 px-2 text-slate-600 dark:text-slate-400">
              <span className="font-medium">Solved Past Papers</span>
              <span className="text-center text-slate-300">✗</span>
              <span className="text-center text-emerald-600 font-bold">✓ (FBISE/BISE)</span>
            </div>
            <div className="grid grid-cols-3 py-2 px-2 text-slate-600 dark:text-slate-400">
              <span className="font-medium">Offline Downloads</span>
              <span className="text-center text-slate-300">✗</span>
              <span className="text-center text-emerald-600 font-bold">✓ Full chapters</span>
            </div>
            <div className="grid grid-cols-3 py-2 px-2 text-slate-600 dark:text-slate-400">
              <span className="font-medium">Advertisements</span>
              <span className="text-center text-slate-400">Yes</span>
              <span className="text-center text-emerald-600 font-bold">100% Ad-free</span>
            </div>
          </div>
        </div>

        {/* Plan Selectors */}
        <div className="grid grid-cols-3 gap-2.5">
          {plans.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPlan(p.id as any)}
              className={`p-3 rounded-2xl border text-center transition-all relative flex flex-col justify-between ${
                selectedPlan === p.id
                  ? 'border-amber-400 bg-amber-50/50 dark:bg-amber-950/30 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              {p.badge && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold text-[9px] whitespace-nowrap shadow-sm">
                  {p.badge}
                </span>
              )}
              <div className="mt-1">
                <span className="font-bold text-xs text-slate-800 dark:text-white block">
                  {language === 'ur' ? p.nameUr : p.nameEn}
                </span>
                <span className="text-sm font-extrabold text-slate-900 dark:text-amber-300 block mt-1">
                  {p.price}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">{p.period}</span>
            </button>
          ))}
        </div>

        {/* Local Pakistani Payment Gateways */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            {language === 'ur' ? 'ادائیگی کا ذریعہ منتخب کریں' : 'Choose Local Payment Method (Pakistan)'}
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'jazzcash', name: 'JazzCash', color: 'text-red-600' },
              { id: 'easypaisa', name: 'Easypaisa', color: 'text-emerald-600' },
              { id: 'raast', name: 'Raast Pay', color: 'text-orange-600' },
              { id: 'card', name: 'Card / Visa', color: 'text-blue-600' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setPaymentMethod(m.id as any)}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1 ${
                  paymentMethod === m.id
                    ? 'border-[#0F9D75] bg-emerald-50 dark:bg-emerald-950/40 text-[#0F9D75]'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600'
                }`}
              >
                <span className={m.color}>{m.name}</span>
              </button>
            ))}
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              {paymentMethod === 'card' 
                ? 'Card Number' 
                : (language === 'ur' ? 'موبائل اکاؤنٹ نمبر درج کریں' : 'Account Mobile Number')}
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={e => setAccountNumber(e.target.value)}
              placeholder="0300 1234567"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono text-slate-800 dark:text-white outline-none focus:border-[#0F9D75]"
            />
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            disabled={isProcessing || isSuccess}
            onClick={handleCheckout}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-900" />
                <span>Premium Activated! Welcome to AB Baloch's Library Pro</span>
              </>
            ) : isProcessing ? (
              <span>Connecting to {paymentMethod.toUpperCase()} Gateway...</span>
            ) : (
              <>
                <Crown className="w-4 h-4" />
                <span>
                  {selectedPlan === 'yearly' 
                    ? 'Start 7-Day Free Trial (Then Rs 3,900/yr)' 
                    : `Pay ${selectedPlan === 'monthly' ? 'Rs 500' : 'Rs 2,400'} & Unlock`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="text-[10px] text-center text-slate-400 mt-2">
            🔒 Secure transaction • Cancel anytime with 1-click in settings
          </p>
        </div>
      </div>
    </div>
  );
};
