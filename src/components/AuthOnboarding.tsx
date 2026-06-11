import { useState, KeyboardEvent, FormEvent } from 'react';
import { Mail, Key, User, ArrowRight, Sparkles, Plus, X, Check, Shield } from 'lucide-react';
import officeCebu from '../assets/images/office_cebu_1781174008747.png';
import cebuanoCareerStudents from '../assets/images/cebuano_career_students_1781174551625.png';

interface AuthOnboardingProps {
  onComplete: (username: string, skills: string[]) => void;
  initialSkills?: string[];
}

export default function AuthOnboarding({ onComplete, initialSkills = [] }: AuthOnboardingProps) {
  const [step, setStep] = useState<'login' | 'skills'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [skills, setSkills] = useState<string[]>(
    initialSkills.length > 0 
      ? initialSkills 
      : ['Customer Support', 'Polite Communication', 'Basic Computer Skills']
  );
  const [customSkill, setCustomSkill] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Sourced popular skills relevant to Cebu IT BPM / Tech Ecosystem
  const suggestedSkills = [
    'Customer Support',
    'Polite Communication',
    'Basic Computer Skills',
    'English Conversation',
    'Retail Sales & Cashiering',
    'Data Typing & Entry',
    'Office Filing & Clerical',
    'Motorbike & Delivery Driving',
    'Food Service & Crew Duties',
    'Hotel & Housekeeping Support',
    'Multi-tasking & Attendance',
    'Willing to Learn',
  ];

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setErrorMsg('All protocol inputs are required.');
      return;
    }
    setErrorMsg('');
    setStep('skills');
  };

  const handleToggleSkill = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const handleAddCustomSkill = () => {
    const trimmed = customSkill.trim();
    if (!trimmed) return;
    if (!skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setCustomSkill('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomSkill();
    }
  };

  const handleFinish = () => {
    if (skills.length === 0) {
      setErrorMsg('Please register at least one skill to align your matches.');
      return;
    }
    onComplete(name, skills);
  };

  return (
    <div className="flex-1 flex flex-col justify-center py-2 px-1 animate-fade-in text-white min-h-0">
      <div className="w-full max-w-sm mx-auto flex flex-col gap-3">
        
        {/* Friendly Branding Header */}
        <div className="text-center flex flex-col items-center gap-1.5" id="onboarding-brand-intro">
          <div className="w-10 h-10 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/30 flex items-center justify-center text-[#CCFF00] mb-0.5 relative shadow-[0_0_15px_rgba(204,255,0,0.15)]">
            <Shield className="w-4.5 h-4.5 text-[#CCFF00]" />
            <div className="absolute inset-0 bg-[#CCFF00]/15 animate-ping rounded-full opacity-25"></div>
          </div>
          <span className="text-[8.5px] font-bold text-white/50 uppercase tracking-[0.25em] font-mono">
            Cebu Career & Opportunity Network
          </span>
          <h2 className="text-lg font-black uppercase tracking-wider font-sans leading-none text-white">
            CEBU UPSKILLING
          </h2>
          <div className="mt-0.5 flex items-center gap-1 bg-[#CCFF00]/10 border border-[#CCFF00]/20 rounded px-1.5 py-0.5">
            <span className="w-1 h-1 rounded-full bg-[#CCFF00]"></span>
            <span className="text-[8.5px] text-[#CCFF00] font-bold uppercase tracking-wider font-mono">
              Trabaho ug Kahigayonan sa Sugbo
            </span>
          </div>
          <p className="text-[10px] text-white/60 font-sans tracking-wide mt-0.5 max-w-[280px] leading-normal">
            Tabangan ka namo nga makasulod og nindot nga trabaho sa Sugbo pinaagi sa pag-konektar nimo diritso sa mga lokal nga kompanya.
          </p>
          <div className="w-full h-36 rounded-lg overflow-hidden border border-white/10 mt-1.5 relative">
            <img 
              src={cebuanoCareerStudents} 
              alt="Cebuano candidates upskilling together" 
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-1.5 left-2 text-left bg-black/40 px-1.5 py-0.5 rounded border border-white/5 backdrop-blur-xs">
              <span className="text-[7px] font-mono font-bold tracking-wider text-[#CCFF00] uppercase">
                Active Cebuano Student Registry
              </span>
            </div>
          </div>
        </div>

        {step === 'login' ? (
          <form 
            onSubmit={handleLoginSubmit} 
            className="glass border border-white/10 rounded-lg p-4 flex flex-col gap-3 shadow-2xl relative overflow-hidden"
            id="login-state-form"
          >
            {/* Subtle aesthetic lines */}
            <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-l from-[#CCFF00]/30 to-transparent"></div>
            
            <span className="text-[9px] font-bold text-[#CCFF00] tracking-[0.2em] uppercase font-mono block">
              Create Your Profile
            </span>

            {errorMsg && (
              <div className="p-2.5 rounded bg-red-950/40 text-red-300 border border-red-900/40 text-[10px] font-mono tracking-wide">
                Oops! {errorMsg}
              </div>
            )}

            {/* Name Input */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-[#CCFF00]/70 font-mono">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-white bg-white/[0.03] hover:bg-white/[0.06] font-medium text-xs font-mono h-9.5 pl-8 pr-3 border-b border-white/15 focus:border-[#CCFF00] focus:bg-white/[0.08] outline-none transition-all"
                  required
                />
                <User className="w-3.5 h-3.5 text-white/30 absolute left-2.5 top-3" />
              </div>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-[#CCFF00]/70 font-mono">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-white bg-white/[0.03] hover:bg-white/[0.06] font-medium text-xs font-mono h-9.5 pl-8 pr-3 border-b border-white/15 focus:border-[#CCFF00] focus:bg-white/[0.08] outline-none transition-all"
                  required
                />
                <Mail className="w-3.5 h-3.5 text-white/30 absolute left-2.5 top-3" />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-[#CCFF00]/70 font-mono">
                Choose a Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-white bg-white/[0.03] hover:bg-white/[0.06] font-medium text-xs font-mono h-9.5 pl-8 pr-3 border-b border-white/15 focus:border-[#CCFF00] focus:bg-white/[0.08] outline-none transition-all"
                  required
                />
                <Key className="w-3.5 h-3.5 text-white/30 absolute left-2.5 top-3" />
              </div>
            </div>

            {/* Action CTA */}
            <button
              type="submit"
              className="w-full h-10.5 bg-[#CCFF00] hover:bg-[#b0db00] text-black font-bold uppercase text-[10.5px] tracking-widest rounded flex items-center justify-center gap-1.5 mt-1 transition-all cursor-pointer active:scale-98"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
            </button>

            <p className="text-[8px] text-center text-white/55 font-sans tracking-wide">
              Your preferences are stored securely on your device.
            </p>
          </form>
        ) : (
          <div 
            className="glass border border-white/10 rounded-lg p-4 flex flex-col gap-3 shadow-2xl relative"
            id="skills-state-selector"
          >
            <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-l from-[#CCFF00]/30 to-transparent"></div>
            
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9.5px] font-bold text-[#CCFF00] tracking-[0.2em] uppercase font-mono block">
                  Add Your Skills
                </span>
                <p className="text-white/70 text-[10px] font-sans mt-0.5">
                  Select your core talents to find the perfect job matches.
                </p>
              </div>
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded bg-red-950/40 text-red-300 border border-red-900/40 text-[10px] font-mono tracking-wide">
                {errorMsg}
              </div>
            )}

            {/* Custom Input Tag block */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold uppercase tracking-widest text-[#CCFF00] font-mono">
                Add a Custom Skill
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder=""
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 text-white bg-black/80 font-medium text-xs font-mono h-9 px-3 border border-white/10 rounded focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00]/20 outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddCustomSkill}
                  className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-3 rounded flex items-center justify-center cursor-pointer"
                  title="Add Skill"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Sourced Skill suggestion grid */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[8.5px] font-bold text-white/60 uppercase tracking-wider font-sans">
                Popular Skills in Cebu
              </span>
              <div className="flex flex-wrap gap-1 max-h-[105px] overflow-y-auto pr-0.5">
                {suggestedSkills.map((skill) => {
                  const isSelected = skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleToggleSkill(skill)}
                      className={`text-[9.5px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded transition-colors flex items-center gap-1 border cursor-pointer ${
                        isSelected
                          ? 'bg-[#CCFF00]/15 text-[#CCFF00] border-[#CCFF00]/30'
                          : 'bg-white/5 text-white/60 border-white/5 hover:bg-white/10'
                      }`}
                    >
                      {skill}
                      {isSelected && <Check className="w-2.5 h-2.5 text-[#CCFF00]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Active Matrix Box */}
            <div className="bg-white/5 border border-white/10 rounded p-2">
              <div className="text-[8.5px] font-bold text-[#CCFF00] uppercase tracking-wider font-mono mb-1.5 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Your Selected Skills ({skills.length})
              </div>
              {skills.length === 0 ? (
                <span className="text-[10px] text-white/50 font-sans block">
                  No skills selected yet.
                </span>
              ) : (
                <div className="flex flex-wrap gap-1 max-h-[60px] overflow-y-auto">
                  {skills.map((skill) => (
                    <span 
                      key={skill}
                      className="text-[9px] font-semibold font-mono bg-black text-white/90 border border-white/10 rounded px-1.5 py-0.5 flex items-center gap-1"
                    >
                      {skill}
                      <button 
                        onClick={() => handleToggleSkill(skill)}
                        className="p-0.5 text-white/40 hover:text-white hover:bg-white/5 rounded"
                      >
                        <X className="w-2 h-2" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm buttons */}
            <div className="flex gap-2 mt-1">
              <button
                type="button"
                onClick={() => setStep('login')}
                className="flex-1 h-9.5 border border-white/10 hover:bg-white/5 text-white/80 font-sans text-[10.5px] uppercase tracking-widest font-bold rounded cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="flex-1 h-9.5 bg-[#CCFF00] hover:bg-[#b0db00] text-black font-bold uppercase text-[10.5px] tracking-widest rounded cursor-pointer active:scale-98"
              >
                Let's Go!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
