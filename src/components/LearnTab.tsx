import { useState, useEffect } from 'react';
import { Play, Pause, ChevronUp, ChevronDown, CheckSquare2, Download, Check, Volume2, CloudLightning } from 'lucide-react';

interface LearnTabProps {
  isOffline: boolean;
  onSuccessToast: (msg: string) => void;
}

export default function LearnTab({ isOffline, onSuccessToast }: LearnTabProps) {
  // Accordion state
  const [brandingExpanded, setBrandingExpanded] = useState<boolean>(true);
  const [networkingExpanded, setNetworkingExpanded] = useState<boolean>(false);

  // Audio state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [audioTimer, setAudioTimer] = useState<string>('00:00');

  // Quiz State
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Audio simulator
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            setAudioTimer('02:45');
            return 0;
          }
          const nextVal = prev + 2;
          // Calculate seconds
          const totalSeconds = 165; // 2m45s
          const currentSeconds = Math.floor((nextVal / 100) * totalSeconds);
          const mins = Math.floor(currentSeconds / 60);
          const secs = currentSeconds % 60;
          setAudioTimer(`0${mins}:${secs < 10 ? '0' : ''}${secs}`);
          return nextVal;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const toggleAudio = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      onSuccessToast('Playing streaming lesson audio... Optimized for low-bandwidth bandwidth!');
    }
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) {
      onSuccessToast('Please select an option first.');
      return;
    }
    setChecked(true);
    if (selectedOption === 'option-b') {
      setIsCorrect(true);
      onSuccessToast('Great job! That is the correct definition of a Personal Brand!');
    } else {
      setIsCorrect(false);
      onSuccessToast('Incorrect. Try option B for the best definition of a Personal Brand.');
    }
  };

  return (
    <div className="flex flex-col gap-5 animate-fade-in pb-12 text-white">
      {/* Module Progress Bar card */}
      <div className="glass rounded-lg border border-white/10 p-4">
        <div className="flex justify-between items-center text-[10px] font-bold text-white/50 mb-2 uppercase tracking-widest font-mono">
          <span>// STAGE 01: CORE ESSENTIALS</span>
          <span className="text-[#CCFF00]">MOD_01_FOUNDATIONS</span>
        </div>
        <div className="w-full bg-white/10 h-1.5 rounded-sm overflow-hidden">
          <div className="bg-[#CCFF00] h-full rounded-sm transition-all duration-300" style={{ width: '40%' }}></div>
        </div>
      </div>

      {/* Play audio player (Kinetic theme styling) */}
      <div className="glass text-white rounded-lg overflow-hidden border border-white/10 flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {/* Circular Play Button with Acid Lime high contrast theme */}
          <button
            id="play-audio-btn"
            onClick={toggleAudio}
            className="w-11 h-11 rounded-full bg-[#CCFF00] text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer"
            aria-label={isPlaying ? 'Pause Lesson' : 'Play Lesson'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current text-black stroke-[3]" />
            ) : (
              <Play className="w-5 h-5 fill-current translate-x-0.5 text-black" />
            )}
          </button>

          <div className="flex flex-col">
            <span className="font-extrabold text-[15px] uppercase tracking-wide font-mono text-white">Play Lesson Audio</span>
            <span className="text-white/50 text-[11px] font-mono tracking-wider mt-1">
              {isPlaying ? `TIM: ${audioTimer} / 02:45` : 'SIZE: 1.2 MB • LOW_BANDWIDTH'}
            </span>
          </div>
        </div>

        {/* Download Icon on Right */}
        <button 
          onClick={() => onSuccessToast('Lesson audio downloaded for offline use!')}
          className="p-2 text-white/50 hover:text-white transition-colors hover:bg-white/5 rounded"
          title="Download Audio File"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* Expanded progress tracking wave */}
      {isPlaying && (
        <div className="bg-white/5 p-3 rounded-lg border border-white/10 flex items-center gap-2 animate-pulse">
          <Volume2 className="w-4 h-4 text-[#CCFF00]" />
          <div className="flex-1 flex gap-0.5 items-end justify-between h-4">
            {[14,24,12,32,18,10,34,22,12,28,16,12,32,24,14,35,16,10,24,12].map((height, i) => (
              <div 
                key={i} 
                className="bg-[#CCFF00] w-[3%] rounded-t-xs"
                style={{ 
                  height: `${Math.max(10, Math.min(100, height * (Math.random() * 0.4 + 0.8)))}%` 
                }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* Accordions */}
      <div className="flex flex-col gap-3">
        {/* Accordion Item 1: What is Professional Branding? */}
        <div className="glass rounded-lg border border-white/10 overflow-hidden">
          <button
            id="toggle-branding-accordion"
            onClick={() => setBrandingExpanded(!brandingExpanded)}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
          >
            <span className="font-bold text-[16px] text-white tracking-tight uppercase font-mono">
              What is Professional Branding?
            </span>
            {brandingExpanded ? (
              <ChevronUp className="w-4 h-4 text-[#CCFF00]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#CCFF00]" />
            )}
          </button>

          {brandingExpanded && (
            <div className="px-5 pb-5 border-t border-white/10 pt-4 flex flex-col gap-4 animate-slide-down">
              <p className="text-[15px] leading-[22px] text-white/80 font-sans">
                Professional branding is the practice of marketing people and their careers as brands. It is an ongoing process of developing and maintaining a reputation and impression of an individual, group, or organization.
              </p>

              {/* Diagram Placeholder - Brutalist technical diagram style */}
              <div className="bg-black/40 border border-white/10 rounded-lg p-5 flex flex-col items-center justify-center gap-3 text-center min-h-[140px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 border border-white/5 rounded-full flex items-center justify-center -mr-8 -mt-8">
                  <div className="w-12 h-12 bg-[#CCFF00]/5 rounded-full"></div>
                </div>

                {/* SVG/HTML Diagram Representation */}
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex -space-x-1.5 font-mono">
                    <div className="w-10 h-10 rounded-full border border-white/20 bg-black flex items-center justify-center text-[8px] font-black uppercase text-white">SKILL</div>
                    <div className="w-10 h-10 rounded-full border border-[#CCFF00]/50 bg-[#CCFF00]/20 flex items-center justify-center text-[8px] font-black uppercase text-[#CCFF00]">VALUE</div>
                    <div className="w-10 h-10 rounded-full border border-white/20 bg-black flex items-center justify-center text-[8px] font-black uppercase text-white">TRUST</div>
                  </div>
                </div>
                
                <span className="text-[12px] font-bold text-white/80 uppercase font-mono tracking-widest flex items-center gap-2">
                  <span className="p-1 px-1.5 bg-[#CCFF00]/10 border border-[#CCFF00]/20 text-[#CCFF00] rounded">
                    SYS_DIAG
                  </span>
                  Personal Brand Design Architecture
                </span>
                
                <p className="text-[11px] text-white/45 max-w-[280px] font-mono leading-relaxed">
                  Visualizing core values, competencies, digital presence, and local networking circles.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Accordion Item 2: Core Networking Terms */}
        <div className="glass rounded-lg border border-white/10 overflow-hidden">
          <button
            id="toggle-networking-accordion"
            onClick={() => setNetworkingExpanded(!networkingExpanded)}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
          >
            <span className="font-bold text-[16px] text-white tracking-tight uppercase font-mono">
              Core Networking Terms
            </span>
            {networkingExpanded ? (
              <ChevronUp className="w-4 h-4 text-[#CCFF00]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#CCFF00]" />
            )}
          </button>

          {networkingExpanded && (
            <div className="px-5 pb-5 border-t border-white/10 pt-4 flex flex-col gap-4 animate-slide-down text-white/80">
              <p className="text-[13px] font-mono tracking-wider text-white/50 uppercase">
                Enhance your knowledge of professional engagement in the Philippine ecosystem:
              </p>
              <div className="grid gap-3">
                <div className="p-3 bg-white/5 rounded border border-white/10">
                  <span className="font-black text-xs text-[#CCFF00] block uppercase tracking-widest font-mono mb-1">// 1. Elevator Pitch</span>
                  <span className="text-[13px] text-white/70">A short, 30-second summary of who you are, what you specialize in, and what career value you bring to Cebu's IT/BPM ecosystem.</span>
                </div>
                <div className="p-3 bg-white/5 rounded border border-white/10">
                  <span className="font-black text-xs text-[#CCFF00] block uppercase tracking-widest font-mono mb-1">// 2. Informational Interview</span>
                  <span className="text-[13px] text-white/70 font-sans">A low-pressure conversation with an industry professional in Cebu IT Park to ask questions and learn insights about target job roles.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Knowledge Check Card */}
      <div id="knowledge-check-block" className="glass rounded-lg border-l-4 border-[#CCFF00] border-y border-r border-white/10 p-5 shadow-xs flex flex-col gap-4">
        {/* Title */}
        <div className="flex items-center gap-2 text-teal">
          <CheckSquare2 className="w-[18px] h-[18px] text-[#CCFF00]" />
          <h3 className="font-black text-[15px] text-[#CCFF00] tracking-widest uppercase font-mono">
            // KNOWLEDGE VALIDATION
          </h3>
        </div>

        <p className="text-[16px] font-semibold text-white">
          Which of these best defines a Personal Brand?
        </p>

        {/* Radio Options */}
        <div className="flex flex-col gap-3">
          {/* Option A */}
          <label 
            id="opt-a-wrapper"
            className={`border rounded-lg p-3.5 flex items-center gap-3 cursor-pointer transition-all ${
              selectedOption === 'option-a'
                ? 'border-[#CCFF00] bg-[#CCFF00]/5 text-[#CCFF00]'
                : 'border-white/10 hover:bg-white/5'
            }`}
          >
            <input
              type="radio"
              name="kb-check"
              value="option-a"
              checked={selectedOption === 'option-a'}
              onChange={() => {
                setSelectedOption('option-a');
                setChecked(false);
              }}
              className="mr-1 accent-[#CCFF00]"
            />
            <span className="text-[14px] leading-snug">
              A physical business card or printed resume.
            </span>
          </label>

          {/* Option B */}
          <label 
            id="opt-b-wrapper"
            className={`border rounded-lg p-3.5 flex items-center gap-3 cursor-pointer transition-all ${
              selectedOption === 'option-b'
                ? 'border-[#CCFF00] bg-[#CCFF00]/5 text-[#CCFF00]'
                : 'border-white/10 hover:bg-white/5'
            }`}
          >
            <input
              type="radio"
              name="kb-check"
              value="option-b"
              checked={selectedOption === 'option-b'}
              onChange={() => {
                setSelectedOption('option-b');
                setChecked(false);
              }}
              className="mr-1 accent-[#CCFF00]"
            />
            <span className="text-[14px] leading-snug">
              The unique combination of skills, experience, and personality that you want the world to see.
            </span>
          </label>

          {/* Option C */}
          <label 
            id="opt-c-wrapper"
            className={`border rounded-lg p-3.5 flex items-center gap-3 cursor-pointer transition-all ${
              selectedOption === 'option-c'
                ? 'border-[#CCFF00] bg-[#CCFF00]/5 text-[#CCFF00]'
                : 'border-white/10 hover:bg-white/5'
            }`}
          >
            <input
              type="radio"
              name="kb-check"
              value="option-c"
              checked={selectedOption === 'option-c'}
              onChange={() => {
                setSelectedOption('option-c');
                setChecked(false);
              }}
              className="mr-1 accent-[#CCFF00]"
            />
            <span className="text-[14px] leading-snug">
              A single post on a social media platform like LinkedIn.
            </span>
          </label>
        </div>

        {/* Check Answer Button in Kinetic theme */}
        <button
          id="check-answer-btn"
          onClick={handleCheckAnswer}
          className="w-full h-12 bg-[#CCFF00] hover:bg-[#b0db00] text-black font-black uppercase text-xs tracking-widest rounded transition-colors cursor-pointer"
        >
          Check Answer
        </button>

        {/* Quiz Review feedback */}
        {checked && isCorrect !== null && (
          <div className={`p-3.5 rounded text-xs font-mono tracking-wide ${isCorrect ? 'bg-[#CCFF00]/15 text-[#CCFF00] border border-[#CCFF00]/30' : 'bg-red-950/40 text-red-300 border border-red-900/40'}`}>
            {isCorrect 
              ? '// CORE VALIDATION VERIFIED. Profile priorities updated.' 
              : '// VERIFICATION ERROR. Please reconsider Option B as the correct Personal Brand definition.'
            }
          </div>
        )}

        {/* Soft Save Info at bottom */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/40 font-mono py-1 border-t border-white/10 uppercase tracking-widest mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse"></span>
          <span>Cached offline to active register.</span>
        </div>
      </div>
    </div>
  );
}
