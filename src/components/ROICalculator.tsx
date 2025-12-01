'use client';

import { useState } from 'react';

export default function ROICalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(100000);
  const [partnershipPercentage, setPartnershipPercentage] = useState(7);

  const monthlyPayment = monthlyRevenue * (partnershipPercentage / 100);
  const yearlyPayment = monthlyPayment * 12;
  const estimatedGrowth = monthlyRevenue * 3; // 3x growth estimate
  const netProfit = estimatedGrowth - monthlyRevenue - monthlyPayment;

  return (
    <div className="glass-effect-2 rounded-2xl p-8 mt-12">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">מחשבון ROI - כמה תרוויח עם השותפות?</h3>
      
      {/* Percentage Buttons */}
      <div className="flex justify-center gap-3 mb-8">
        {[7, 10, 15].map((percent) => (
          <button
            key={percent}
            onClick={() => setPartnershipPercentage(percent)}
            className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
              partnershipPercentage === percent
                ? 'gradient-primary text-white glow-purple'
                : 'glass-effect-2 text-[#a1a1aa] hover:text-white'
            }`}
          >
            {percent}%
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm text-[#a1a1aa] mb-2">הכנסה חודשית צפויה (₪)</label>
          <input
            type="number"
            value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
            className="w-full px-4 py-3 bg-[#1a1a1e] border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
            min="0"
            step="1000"
          />
        </div>
        <div>
          <label className="block text-sm text-[#a1a1aa] mb-2">אחוז שותפות (%)</label>
          <input
            type="number"
            value={partnershipPercentage}
            onChange={(e) => setPartnershipPercentage(Number(e.target.value))}
            className="w-full px-4 py-3 bg-[#1a1a1e] border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
            min="0"
            max="50"
            step="1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="glass-effect rounded-xl p-6 text-center">
          <div className="text-sm text-[#a1a1aa] mb-2">תשלום חודשי</div>
          <div className="text-3xl font-bold text-white">{Math.round(monthlyPayment).toLocaleString()}₪</div>
        </div>
        <div className="glass-effect rounded-xl p-6 text-center">
          <div className="text-sm text-[#a1a1aa] mb-2">תשלום שנתי</div>
          <div className="text-3xl font-bold text-white">{Math.round(yearlyPayment).toLocaleString()}₪</div>
        </div>
        <div className="glass-effect rounded-xl p-6 text-center border-2 border-green-500/50 bg-green-500/5">
          <div className="text-sm text-[#a1a1aa] mb-2">רווח נטו צפוי</div>
          <div className="text-3xl font-bold text-green-400">{Math.round(netProfit).toLocaleString()}₪</div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
        <div className="text-sm text-green-400 font-semibold mb-1">הערכה: צמיחה של 3x תוך 6-12 חודשים</div>
        <div className="text-xs text-[#a1a1aa]">הערכה זו מבוססת על ממוצע הלקוחות שלנו</div>
      </div>
    </div>
  );
}

