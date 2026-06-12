import { useState, FormEvent } from 'react';
import { BadgeCheck, CheckCircle2, ShieldAlert, Award, FileText, X, AlertCircle, Plus, Sparkles } from 'lucide-react';

interface CredentialsTabProps {
  onSuccessToast: (msg: string) => void;
  user: { name: string; skills: string[] } | null;
  onUpdateSkills: (updatedSkills: string[]) => void;
  onLogOut: () => void;
}

export default function CredentialsTab({ onSuccessToast, user, onUpdateSkills, onLogOut }: CredentialsTabProps) {
  // Skill setup
  const [showEditSkillsModal, setShowEditSkillsModal] = useState<boolean>(false);
  const [customSkillInput, setCustomSkillInput] = useState<string>('');

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-12 text-white">
      {/* Registered Active Skills Matrix Card */}
      <div id="skills-registry-matrix-card" className="glass rounded-lg border border-white/10 p-5 relative">
        <div id="skills-profile-decor" className="absolute top-5 right-5 w-9 h-9 rounded bg-[#CCFF00]/5 text-[#CCFF00] flex items-center justify-center border border-[#CCFF00]/20" title="Active Skills Index">
          <Sparkles className="w-4 h-4 text-[#CCFF00]" />
        </div>

        <h2 className="text-sm font-bold font-mono text-[#CCFF00] tracking-[0.1em] uppercase mb-1">
          Your Registered Skills
        </h2>
        <span className="text-[10px] text-white/70 font-sans block uppercase mb-4">
          Skills that match you with awesome local jobs
        </span>

        {user && user.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-5">
            {user.skills.map((skill) => (
              <span 
                key={skill}
                className="bg-white/5 border border-white/10 text-white font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded flex items-center gap-2 font-bold"
              >
                {skill}
                <button
                  onClick={() => {
                    const filtered = user.skills.filter((s) => s !== skill);
                    onUpdateSkills(filtered);
                  }}
                  className="p-0.5 text-white/40 hover:text-white hover:bg-white/5 rounded cursor-pointer transition-colors"
                  title={`Remove ${skill}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded p-4 text-center text-white/50 text-[11px] font-mono mb-5 uppercase tracking-wider">
            No active skills listed yet. Add some to get started!
          </div>
        )}

        {/* Action button row to trigger editing modal or log out */}
        <div className="flex gap-3 font-mono">
          <button
            onClick={() => setShowEditSkillsModal(true)}
            className="flex-1 h-11 bg-[#CCFF00]/10 border border-[#CCFF00]/25 text-[#CCFF00] hover:bg-[#CCFF00]/20 text-xs font-bold uppercase tracking-widest rounded transition-colors cursor-pointer"
          >
            Add or Remove Skills
          </button>
          <button
            onClick={onLogOut}
            className="px-4 h-11 bg-red-950/25 hover:bg-red-950/35 border border-red-900/30 text-red-300 text-xs uppercase tracking-widest font-bold rounded transition-colors cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Professional Development Sponsorship */}
      <div id="professional-sponsorship-banner" className="glass text-white rounded-lg border border-white/10 p-4 flex gap-4 items-center">
        <div className="w-12 h-12 rounded bg-[#CCFF00]/10 border border-[#CCFF00]/30 flex items-center justify-center shrink-0">
          <Award className="w-5 h-5 text-[#CCFF00]" />
        </div>
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider font-mono text-white">
            Cebu Vocational Training & Alignment Guide
          </h4>
          <span className="text-[#CCFF00] text-[11px] font-sans block mt-0.5">
            Verified standard alignments preparing you for career-certified training roles
          </span>
        </div>
      </div>

      {/* Interactive Modal to configure user skills - Matches Kinetic Design specifications */}
      {showEditSkillsModal && user && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
          <div className="bg-[#0c0c0c] border border-white/15 max-w-sm w-full rounded-lg shadow-2xl p-6 flex flex-col gap-4 animate-scale-up text-white animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-black text-white text-[13px] uppercase tracking-widest font-mono">
                // SKILLS DIRECTORY INDEX
              </h3>
              <button 
                onClick={() => setShowEditSkillsModal(false)}
                className="p-1 rounded bg-white/5 text-white/50 hover:text-white transition-colors border border-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-4 mt-1 font-mono">
              {/* Type Custom Skill */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white/60 text-[10px] uppercase tracking-widest font-bold">
                  Add Custom Skill
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder=""
                    value={customSkillInput}
                    onChange={(e) => setCustomSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const trimmed = customSkillInput.trim();
                        if (trimmed && !user.skills.includes(trimmed)) {
                          onUpdateSkills([...user.skills, trimmed]);
                        }
                        setCustomSkillInput('');
                      }
                    }}
                    className="flex-1 text-white bg-black font-semibold text-xs h-10 px-3 border border-white/10 rounded focus:border-[#CCFF00] focus:ring-1 focus:ring-[#CCFF00]/20 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const trimmed = customSkillInput.trim();
                      if (trimmed && !user.skills.includes(trimmed)) {
                        onUpdateSkills([...user.skills, trimmed]);
                      }
                      setCustomSkillInput('');
                    }}
                    className="bg-[#CCFF00] hover:bg-[#b0db00] text-black px-3 rounded flex items-center justify-center cursor-pointer font-bold"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>

              {/* Suggestions matrix */}
              <div className="flex flex-col gap-1.5">
                <span className="text-white/50 text-[10px] uppercase tracking-widest font-bold">
                  Suggested Skills
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-[125px] overflow-y-auto pr-1">
                  {[
                    'Customer Support',
                    'Polite Communication',
                    'Basic Computer Skills',
                    'English Conversation',
                    'Retail Sales & Cashiering',
                    'Data Typing & Entry',
                    'Office Filing & Clerical',
                    'Food Service & Crew Duties',
                    'Hotel & Housekeeping Support'
                  ].map(suggested => {
                    const isSelected = user.skills.includes(suggested);
                    return (
                      <button
                        key={suggested}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            onUpdateSkills(user.skills.filter(s => s !== suggested));
                          } else {
                            onUpdateSkills([...user.skills, suggested]);
                          }
                        }}
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors border cursor-pointer ${
                          isSelected
                            ? 'bg-[#CCFF00]/15 text-[#CCFF00] border-[#CCFF00]/30'
                            : 'bg-white/5 text-white/60 border-white/5 hover:bg-white/10'
                        }`}
                      >
                        {suggested}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mini tag summary representing current registry */}
              <div className="bg-white/5 border border-white/10 rounded p-3 text-xs">
                <span className="text-[9px] text-[#CCFF00] font-bold block mb-2 uppercase tracking-wider">// REGISTERED UNITS ({user.skills.length})</span>
                {user.skills.length === 0 ? (
                  <span className="text-[10px] text-white/30 block uppercase tracking-wider">No active units catalogued.</span>
                ) : (
                  <div className="flex flex-wrap gap-1 max-h-[100px] overflow-y-auto">
                    {user.skills.map(s => (
                      <span key={s} className="bg-black border border-white/10 text-white/80 px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                        {s}
                        <button
                          onClick={() => onUpdateSkills(user.skills.filter(it => it !== s))}
                          className="hover:text-red-400 font-bold p-0.5"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setShowEditSkillsModal(false)}
                  className="px-5 h-11 bg-[#CCFF00] hover:bg-[#b0db00] text-black rounded text-[11px] font-black uppercase tracking-wider cursor-pointer"
                >
                  Conclude Editing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
