import { useState, FormEvent } from 'react';
import { BadgeCheck, CheckCircle2, ShieldAlert, Award, FileText, X, AlertCircle } from 'lucide-react';

interface CredentialsTabProps {
  onSuccessToast: (msg: string) => void;
}

export default function CredentialsTab({ onSuccessToast }: CredentialsTabProps) {
  // ISA details (Stateful to make it interactive!)
  const [currentIncome, setCurrentIncome] = useState<number>(22000);
  const [showIncomeModal, setShowIncomeModal] = useState<boolean>(false);
  const [tempIncomeInput, setTempIncomeInput] = useState<string>('22000');

  const threshold = 30000;
  const isRepaymentSuspended = currentIncome < threshold;
  const progressPercent = Math.min(100, Math.round((currentIncome / threshold) * 100));

  const handleUpdateIncome = (e: FormEvent) => {
    e.preventDefault();
    const incomeNum = Number(tempIncomeInput);
    if (isNaN(incomeNum) || incomeNum < 0) {
      onSuccessToast('Please enter a valid positive number for monthly income.');
      return;
    }

    setCurrentIncome(incomeNum);
    setShowIncomeModal(false);

    if (incomeNum >= threshold) {
      const repaymentAmount = Math.round(incomeNum * 0.1);
      onSuccessToast(`Income verified at ₱${incomeNum.toLocaleString()}. Repayment is now active (₱${repaymentAmount.toLocaleString()}/mo).`);
    } else {
      onSuccessToast(`Income verified at ₱${incomeNum.toLocaleString()}. Repayment remains suspended.`);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-12 text-white">
      {/* Digital Skills Passport Card */}
      <div className="glass rounded-lg border border-white/10 p-5 relative">
        {/* Verified Badge Header Right Accent */}
        <div id="passport-verified-icon" className="absolute top-5 right-5 w-9 h-9 rounded bg-[#CCFF00]/10 text-[#CCFF00] flex items-center justify-center border border-[#CCFF00]/30" title="Verified Skills Profile">
          <BadgeCheck className="w-5 h-5 text-[#CCFF00]" />
        </div>

        <h2 id="passport-header-title" className="text-sm font-black font-mono text-[#CCFF00] tracking-[0.25em] uppercase mb-4 pr-10">
          // DIGITAL SKILLS PASSPORT
        </h2>

        {/* Certificate items stream */}
        <div className="flex flex-col gap-3">
          {/* Item 1 */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex gap-3.5 items-start">
            <div className="w-5 h-5 rounded bg-[#CCFF00]/15 border border-[#CCFF00]/25 text-[#CCFF00] flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4.5 h-4.5 text-[#CCFF00]" />
            </div>
            <div>
              <h4 className="font-bold text-[14px] uppercase tracking-wide font-mono text-white leading-snug">
                Professional Communication Certificate
              </h4>
              <span className="text-white/45 text-[10px] font-mono block mt-1 uppercase tracking-widest">
                VERIFIED INDEX: OCT 2023
              </span>
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex gap-3.5 items-start">
            <div className="w-5 h-5 rounded bg-[#CCFF00]/15 border border-[#CCFF00]/25 text-[#CCFF00] flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4.5 h-4.5 text-[#CCFF00]" />
            </div>
            <div>
              <h4 className="font-bold text-[14px] uppercase tracking-wide font-mono text-white leading-snug">
                Strategic Problem Solving
              </h4>
              <span className="text-white/45 text-[10px] font-mono block mt-1 uppercase tracking-widest">
                VERIFIED INDEX: JAN 2024
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Income Share Agreement (ISA) Tracker Card */}
      <div id="isa-tracker-card" className="glass rounded-lg border border-white/10 p-5">
        <h2 className="text-sm font-black font-mono text-[#CCFF00] tracking-[0.25em] uppercase mb-4">
          // INCOME SHARE AGREEMENT (ISA)
        </h2>

        {/* Repayment Box */}
        {isRepaymentSuspended ? (
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-5 flex gap-3 items-start">
            <div className="w-6 h-6 rounded bg-white/10 text-white/70 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="font-mono text-xs font-bold">||</span>
            </div>
            <div>
              <h3 className="font-bold text-white uppercase text-xs tracking-wider font-mono">
                Repayment Suspended
              </h3>
              <p className="text-white/60 text-[13px] mt-0.5 leading-snug">
                Current income verified below PHP 30,000 threshold. No dues generated.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-[#CCFF00]/10 border border-[#CCFF00]/30 rounded-lg p-4 mb-5 flex gap-3 items-start">
            <div className="w-6 h-6 rounded bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/30 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs font-mono">
              OK
            </div>
            <div>
              <h3 className="font-black text-[#CCFF00] uppercase text-xs tracking-wider font-mono">
                Repayment Active (10% contribution)
              </h3>
              <p className="text-[#CCFF00]/90 text-[13px] mt-0.5 leading-snug font-sans">
                Current monthly contribution: <span className="font-bold font-mono">PHP {Math.round(currentIncome * 0.1).toLocaleString()}</span>
              </p>
            </div>
          </div>
        )}

        {/* Metrics Display */}
        <div className="mb-4">
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="text-[10px] text-white/50 uppercase block font-bold font-mono tracking-widest">Current Income</span>
              <span id="current-income-metric" className="text-white font-extrabold text-[16px] font-mono">
                PHP {currentIncome.toLocaleString()}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-white/50 uppercase block font-bold font-mono tracking-widest">THRESHOLD BARRIER</span>
              <span className="text-white font-extrabold text-[16px] font-mono">
                PHP {threshold.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Progress Bar represent current vs threshold */}
          <div className="w-full bg-white/10 h-2.5 rounded overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                isRepaymentSuspended ? 'bg-white/40' : 'bg-[#CCFF00]'
              }`} 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Verification cycle tag */}
        <div className="flex justify-between items-center text-[11px] text-white/45 font-mono mb-4 uppercase tracking-wider">
          <span>Next auditing cycle:</span>
          <span className="font-bold text-[#CCFF00]">MARCH 2024</span>
        </div>

        {/* Update Button in Kinetic spec */}
        <button
          id="trigger-update-income-btn"
          onClick={() => {
            setTempIncomeInput(currentIncome.toString());
            setShowIncomeModal(true);
          }}
          className="w-full h-12 bg-white/5 text-white hover:bg-white/15 border border-white/15 text-xs font-black uppercase tracking-widest rounded transition-colors cursor-pointer"
        >
          Update Income Details
        </button>
      </div>

      {/* Professional Development Sponsorship */}
      <div id="govt-sponsorship-banner" className="glass text-white rounded-lg border border-white/10 p-4 flex gap-4 items-center">
        <div className="w-12 h-12 rounded bg-[#CCFF00]/10 border border-[#CCFF00]/30 flex items-center justify-center shrink-0">
          <Award className="w-5 h-5 text-[#CCFF00]" />
        </div>
        <div>
          <h4 className="font-black text-xs uppercase tracking-wider font-mono text-white">
            Professional Development Sponsorship
          </h4>
          <span className="text-[#CCFF00] text-[11px] font-mono uppercase tracking-widest block mt-0.5">
            SPONSOR: CEBU GOV • CIB.O SEC_ACC
          </span>
        </div>
      </div>

      {/* Interactive Modal to update income details - Sticking to raw dark modal specification of Kinetic design */}
      {showIncomeModal && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
          <div className="bg-[#0c0c0c] border border-white/15 max-w-sm w-full rounded-lg shadow-2xl p-6 flex flex-col gap-4 animate-scale-up text-white">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-black text-white text-[14px] uppercase tracking-widest font-mono">
                Update Income Ledger
              </h3>
              <button 
                onClick={() => setShowIncomeModal(false)}
                className="p-1 rounded bg-white/5 text-white/50 hover:text-white transition-colors border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateIncome} className="flex flex-col gap-4 mt-1">
              <div className="flex flex-col gap-1.5">
                <label className="text-white/60 text-[11px] uppercase tracking-widest font-bold font-mono">
                  Monthly Verified Income (PHP)
                </label>
                <input
                  type="number"
                  placeholder="22000"
                  value={tempIncomeInput}
                  onChange={(e) => setTempIncomeInput(e.target.value)}
                  className="w-full text-white bg-black font-extrabold text-[18px] font-mono h-12 px-3 border border-white/10 rounded focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00]/20 outline-none"
                  autoFocus
                />
              </div>

              {/* Threshold warning notice within modal */}
              <div className="bg-white/5 border border-white/10 rounded p-3 text-xs text-white/70 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
                <p className="font-mono text-[10px] uppercase tracking-wide leading-relaxed">
                  Setting verified monthly income above PHP 30,000 will activate monthly contributions of 10%. Below threshold remains suspended.
                </p>
              </div>

              <div className="flex gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setShowIncomeModal(false)}
                  className="px-4 h-11 border border-white/10 rounded text-[11px] font-bold text-white uppercase tracking-wider font-mono hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 h-11 bg-[#CCFF00] hover:bg-[#b0db00] text-black rounded text-[11px] font-black uppercase tracking-wider font-mono"
                >
                  Confirm Audited State
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
