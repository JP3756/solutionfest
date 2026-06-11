import { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  ChevronUp, 
  ChevronDown, 
  CheckSquare2, 
  Download, 
  Check, 
  Volume2, 
  CloudLightning, 
  Mic, 
  MicOff, 
  Sparkles, 
  RefreshCw, 
  Sliders, 
  Award, 
  ThumbsUp,
  CheckCircle2
} from 'lucide-react';
import mentorCebu from '../assets/images/mentor_cebu_1781173991843.png';
import cebuanasMentor from '../assets/images/cebuanas_office_mentors_1781174586933.png';

const VOICE_SCENARIOS = [
  {
    id: 'scen-1',
    title: 'Lahug BPO Escalation',
    context: 'Angry Billing Customer',
    prompt: '"I was charged twice for my subscription last night, this is completely unacceptable!"',
    hint: 'Acknowledge immediately, apologize politely, and offer a quick trace on the billing ID.',
    bestPractice: '"I sincerely apologize for the double billing error, Sir. Let me look into this immediately and resolve it for you."',
    proTip: 'Avoid flat Cebuano "e/i" vowels. Keep the "sincerely" pronunciation rounded and warm.',
  },
  {
    id: 'scen-2',
    title: 'Mactan Resort Check-in',
    context: 'Exhausted Guest Arrival',
    prompt: '"We had a 4-hour delay in Manila, is our room ready yet? We are exhausted."',
    hint: 'Give a warm cordial welcome, show empathy, and speed up their check-in process.',
    bestPractice: '"Maayong adlaw! Welcome to Cebu, Ma’am. I understand you had a long journey, let me activate your keys right away."',
    proTip: 'Smile while speaking. A smiling face naturally creates a friendly, highly polite vocal frequency.',
  },
  {
    id: 'scen-3',
    title: 'Mandaue Logistics Trace',
    context: 'Upset Delivery Client',
    prompt: '"My priority package says delivered, but it is not in my office! Where is it?"',
    hint: 'Acknowledge the stress, stay calm, and ask for the express dispatch parcel tracking number.',
    bestPractice: '"I understand the urgency and regret the confusion, Sir. Let me double check the GPS dispatch coordinate right now."',
    proTip: 'Pronounce consonants clearly. Make sure the ending sounds of "urgency" and "dispatch" are sharp.',
  }
];

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

  // Voice Coach Simulator State
  const [activeScenario, setActiveScenario] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [voiceEvaluation, setVoiceEvaluation] = useState<{
    politenessScore: number;
    clarityScore: number;
    pacing: string;
    tips: string[];
  } | null>(null);

  // Simple simulator timer for voice recording
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      setRecordingSeconds(0);
      interval = setInterval(() => {
        setRecordingSeconds(prev => {
          if (prev >= 3) {
            clearInterval(interval);
            setIsRecording(false);
            // Generate evaluation scores
            setVoiceEvaluation({
              politenessScore: 88 + Math.floor(Math.random() * 12),
              clarityScore: 85 + Math.floor(Math.random() * 15),
              pacing: 'Conversational • 135 WPM',
              tips: [
                'Excellent use of polite pronouns ("Sir" / "Ma’am").',
                'Your speed is steady and easy for foreign callers to understand.',
                'Work on softening your "T" plosives in words like "can’t" or "billing" to sound friendlier.'
              ]
            });
            onSuccessToast('Speech analyzed successfully! Review your voice quality score below.');
            return 3;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

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
      onSuccessToast('Great job! That is the correct way to handle an upset customer!');
    } else {
      setIsCorrect(false);
      onSuccessToast('Not quite. Listening calmly and apologizing politely is always the best way.');
    }
  };

  return (
    <div className="flex flex-col gap-5 animate-fade-in pb-12 text-white">
      {/* Module Progress Bar card */}
      <div className="glass rounded-lg border border-white/10 p-4">
        <div className="flex justify-between items-center text-[10px] font-bold text-white/60 mb-2 uppercase tracking-widest font-mono">
          <span>Stage 1: Core Essentials</span>
          <span className="text-[#CCFF00]">Module 1: Foundations</span>
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
            <span className="font-bold text-[15px] uppercase tracking-wide font-mono text-white">Listen to Lesson</span>
            <span className="text-white/70 text-[11px] font-mono tracking-wider mt-1">
              {isPlaying ? `Time: ${audioTimer} / 02:45` : 'Duration: 2:45 • Data-Saving Mode'}
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

      {/* Visual BPO Coaching Mentor Board */}
      <div id="bpo-coaching-board" className="glass rounded-lg border border-white/10 p-4 flex gap-4 items-center">
        <img 
          src={cebuanasMentor} 
          alt="Featured Speaker - Coach Maricel" 
          className="w-16 h-16 rounded-lg object-cover border border-white/15 shrink-0"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <span className="text-[9px] font-mono font-bold text-[#CCFF00] uppercase tracking-widest block">
            Featured Speaker for Today
          </span>
          <h4 className="text-sm font-black text-white uppercase mt-0.5">Coach Maricel Ramos</h4>
          <p className="text-[11px] text-white/70 mt-1 leading-snug font-sans">
            &ldquo;As your key speaker today, I want to help you conquer every voice accent obstacle and secure a great career in Cebu! Connect with me to get direct mentorship, feedback, or simple help styling your pitch.&rdquo;
          </p>
          <div className="flex gap-2 mt-2">
            <button 
              onClick={() => onSuccessToast('Connecting you with today\'s speaker, Coach Maricel Ramos, for live career support and pronunciation feedback!')}
              className="px-2.5 py-1 rounded bg-[#CCFF00]/10 border border-[#CCFF00]/30 hover:bg-[#CCFF00]/20 text-[#CCFF00] font-mono text-[9px] font-bold uppercase transition-colors text-left"
            >
              Connect with Today's Speaker
            </button>
          </div>
        </div>
      </div>

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
              Basics of Quality Customer Support
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
                Great customer service is the absolute core of BPO, retail, and hospitality careers in Cebu. It is about listening carefully to people, being deeply polite, and finding simple, friendly ways to handle their questions or complaints.
              </p>

              {/* Diagram Placeholder - Brutalist technical diagram style */}
              <div className="bg-black/40 border border-white/10 rounded-lg p-5 flex flex-col items-center justify-center gap-3 text-center min-h-[140px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 border border-white/5 rounded-full flex items-center justify-center -mr-8 -mt-8">
                  <div className="w-12 h-12 bg-[#CCFF00]/5 rounded-full"></div>
                </div>

                {/* SVG/HTML Diagram Representation */}
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex -space-x-1.5 font-mono">
                    <div className="w-10 h-10 rounded-full border border-white/20 bg-black flex items-center justify-center text-[7px] font-black uppercase text-white">LISTEN</div>
                    <div className="w-10 h-10 rounded-full border border-[#CCFF00]/50 bg-[#CCFF00]/20 flex items-center justify-center text-[8px] font-black uppercase text-[#CCFF00]">POLITE</div>
                    <div className="w-10 h-10 rounded-full border border-white/20 bg-black flex items-center justify-center text-[8px] font-black uppercase text-white">SOLVE</div>
                  </div>
                </div>
                
                <span className="text-[12px] font-bold text-white/90 uppercase font-mono tracking-widest flex items-center gap-2">
                  <span className="p-1 px-1.5 bg-[#CCFF00]/10 border border-[#CCFF00]/20 text-[#CCFF00] rounded">
                    Diagram
                  </span>
                  How Customer Trust is Built
                </span>
                
                <p className="text-[11px] text-white/60 max-w-[280px] font-sans leading-relaxed">
                  Visualizing how careful listening, greeting with politeness, and active problem-solving gain a customer's trust and appreciation.
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
              Key Habits for Workplace Success
            </span>
            {networkingExpanded ? (
              <ChevronUp className="w-4 h-4 text-[#CCFF00]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#CCFF00]" />
            )}
          </button>

          {networkingExpanded && (
            <div className="px-5 pb-5 border-t border-white/10 pt-4 flex flex-col gap-4 animate-slide-down text-white/80">
              <p className="text-[13px] font-sans text-white/70">
                In local jobs, these two essential skills make you stand out:
              </p>
              <div className="grid gap-3">
                <div className="p-3 bg-white/5 rounded border border-white/10">
                  <span className="font-bold text-xs text-[#CCFF00] block uppercase tracking-widest font-mono mb-1">1. Active Listening</span>
                  <span className="text-[13px] text-white/80">Paying close attention to the customer, repeating their concerns back to them to show you understand, and taking brief notes if needed to avoid mistakes.</span>
                </div>
                <div className="p-3 bg-white/5 rounded border border-white/10">
                  <span className="font-bold text-xs text-[#CCFF00] block uppercase tracking-widest font-mono mb-1">2. Communicating Cheerfully</span>
                  <span className="text-[13px] text-white/80 font-sans">Using a warm tone, steady volume, and gentle words. In Cebuano culture, starting off with a warm &quot;Maayong adlaw!&quot; or nice &quot;Magandang umaga!&quot; establishes instant friendly trust.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Cebuano BPO Voice Lab & Audio Coach */}
      <div id="bpo-voice-lab-card" className="glass rounded-lg border border-white/10 p-5 flex flex-col gap-4 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/5 pb-3">
          <div className="flex flex-col">
            <h3 className="text-sm font-bold font-mono text-[#CCFF00] tracking-[0.1em] uppercase flex items-center gap-2">
              <Mic className="w-4 h-4 text-[#CCFF00]" />
              Cebu BPO Speech & Voice Lab
            </h3>
            <span className="text-[10px] text-white/55 font-mono uppercase tracking-wider block mt-1">
              Offline-Ready Speech Pattern Simulator
            </span>
          </div>
          <div className="self-start sm:self-center bg-[#CCFF00]/10 text-[#CCFF00] border border-[#CCFF00]/20 px-2 py-0.5 rounded text-[9px] font-bold font-mono tracking-wider uppercase flex items-center gap-1 shrink-0 animate-pulse">
            <Sparkles className="w-3 h-3 text-[#CCFF00]" />
            <span>Active Trainer</span>
          </div>
        </div>

        {/* Scenario Select Buttons */}
        <div className="grid grid-cols-3 gap-2 border-y border-white/5 py-2.5 my-0.5 scrollbar-none overflow-x-auto text-left font-mono">
          {VOICE_SCENARIOS.map((sc, index) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => {
                setActiveScenario(index);
                setVoiceEvaluation(null);
                setIsRecording(false);
              }}
              className={`text-[9.5px] px-2 py-3 rounded border leading-tight transition-all font-bold uppercase cursor-pointer flex flex-col justify-between min-h-[58px] ${
                activeScenario === index
                  ? 'bg-[#CCFF00]/10 border-[#CCFF00] text-[#CCFF00]'
                  : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:border-white/10'
              }`}
            >
              <span className="opacity-50 text-[7px] tracking-widest">{sc.context}</span>
              <span className="mt-1.5 truncate max-w-full block">{sc.title}</span>
            </button>
          ))}
        </div>

        {/* Prompts Pane */}
        <div className="bg-black/30 border border-white/5 p-4 rounded-lg text-left relative overflow-hidden">
          <span className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest block mb-2 leading-none">
            Customer Dialogue Cue:
          </span>
          <p className="text-xs italic text-white/95 font-medium leading-relaxed font-sans mb-3 pl-3 border-l bg-gradient-to-r from-white/5 to-transparent py-1.5 rounded-r border-[#CCFF00]">
            {VOICE_SCENARIOS[activeScenario].prompt}
          </p>

          <span className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest block mb-2 leading-none">
            Your Training Line:
          </span>
          <p className="text-[12px] text-[#CCFF00] font-bold leading-relaxed font-mono bg-white/5 rounded p-3 border border-white/5">
            {VOICE_SCENARIOS[activeScenario].bestPractice}
          </p>
          
          <div className="mt-2.5 flex items-start gap-1.5 p-2 bg-[#CCFF00]/5 border border-[#CCFF00]/10 rounded text-[10px] text-white/70">
            <Sliders className="w-3.5 h-3.5 text-[#CCFF00] shrink-0 mt-0.5" />
            <p className="font-sans leading-snug">
              <strong className="text-white">Coach Tip:</strong> {VOICE_SCENARIOS[activeScenario].hint}
            </p>
          </div>
        </div>

        {/* Audio Recording Controller with wave effect simulation */}
        <div className="flex flex-col gap-3 items-center text-center justify-center py-1 relative">
          {/* Waveform Visualization area */}
          <div className="w-full h-12 flex items-center justify-center bg-black/40 border border-white/10 rounded-lg relative overflow-hidden">
            {isRecording ? (
              <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center gap-1 px-4">
                {[...Array(24)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-[#CCFF00] rounded-full transition-all duration-100"
                    style={{
                      height: `${15 + Math.sin(recordingSeconds * 5 + i) * 20 + Math.random() * 30}%`,
                      opacity: 0.4 + Math.random() * 0.6
                    }}
                  ></div>
                ))}
              </div>
            ) : (
              <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-2 select-none">
                <Volume2 className="w-4 h-4 opacity-50" />
                <span>Microphone Standby • Click speak to record</span>
              </div>
            )}
            
            {isRecording && (
              <div className="absolute top-2 right-3 flex items-center gap-1.5 font-mono text-[9px] text-[#CCFF00] tracking-widest font-black uppercase">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span>REC 0:0{recordingSeconds}s</span>
              </div>
            )}
          </div>

          <div className="flex gap-3 w-full">
            <button
              onClick={() => {
                setVoiceEvaluation(null);
                setIsRecording(true);
              }}
              disabled={isRecording}
              className={`flex-1 h-12 rounded flex items-center justify-center gap-2 font-mono text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
                isRecording
                  ? 'bg-red-950/45 text-red-300 border border-red-900/30'
                  : 'bg-[#CCFF00] text-black hover:bg-[#b0db00] active:scale-[0.98]'
              }`}
            >
              <Mic className="w-4 h-4 stroke-[2]" />
              <span>{isRecording ? `Recording... 0:0${recordingSeconds}s` : 'Speak Line & Record'}</span>
            </button>

            {voiceEvaluation && (
              <button
                onClick={() => {
                  setVoiceEvaluation(null);
                }}
                className="px-4 border border-white/15 bg-white/5 hover:bg-white/10 hover:text-white text-white/70 rounded flex items-center justify-center cursor-pointer transition-colors"
                title="Reset simulation"
              >
                <RefreshCw className="w-4 h-4 animate-spin-once" />
              </button>
            )}
          </div>
        </div>

        {/* Voice Quality Assessment Evaluation Panel */}
        {voiceEvaluation && (
          <div className="bg-[#CCFF00]/5 border border-[#CCFF00]/25 rounded-lg p-4 animate-fade-in text-left">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2.5 mb-3 justify-between">
              <div className="flex items-center gap-1.5 font-mono">
                <Award className="w-4 h-4 text-[#CCFF00]" />
                <h4 className="font-bold text-xs uppercase tracking-widest text-[#CCFF00]">
                  BPO Speech Evaluation
                </h4>
              </div>
              <span className="text-[9px] font-mono text-white/55 uppercase tracking-widest font-extrabold bg-[#CCFF00]/10 px-1.5 py-0.5 rounded border border-[#CCFF00]/15 leading-none">
                Grade: {voiceEvaluation.politenessScore >= 94 ? 'EXCELLENT A+' : 'PASS A-'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center mb-4 font-mono">
              <div className="bg-black/30 p-2 border border-white/5 rounded">
                <span className="text-[8px] text-white/40 block pb-1 uppercase tracking-widest leading-none">Politeness</span>
                <span className="text-15px sm:text-base font-black text-[#CCFF00]">{voiceEvaluation.politenessScore}%</span>
              </div>
              <div className="bg-black/30 p-2 border border-white/5 rounded">
                <span className="text-[8px] text-white/40 block pb-1 uppercase tracking-widest leading-none">Clarity</span>
                <span className="text-15px sm:text-base font-black text-white">{voiceEvaluation.clarityScore}%</span>
              </div>
              <div className="bg-black/30 p-2 border border-white/5 rounded">
                <span className="text-[8px] text-white/40 block pb-1 uppercase tracking-widest leading-none">Pacing</span>
                <span className="text-[8.5px] font-black text-[#CCFF00] uppercase tracking-tighter leading-none mt-1 select-none block">Conversational</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[8.5px] font-mono uppercase tracking-widest text-white/40 block font-bold leading-none mb-1">
                Voice Quality Feedback & Pro Tips:
              </span>
              <ul className="flex flex-col gap-2 pl-1 leading-relaxed">
                {voiceEvaluation.tips.map((tip, i) => (
                  <li key={i} className="text-[11.5px] text-white/80 flex items-start gap-2">
                    <span className="text-[#CCFF00] shrink-0 mt-0.5">✦</span>
                    <span className="font-sans leading-tight">{tip}</span>
                  </li>
                ))}
                <li className="text-[10px] text-[#CCFF00]/85 font-mono uppercase bg-[#CCFF00]/10 border border-[#CCFF00]/15 p-2 rounded flex items-center gap-1.5 mt-1 leading-snug">
                  <ThumbsUp className="w-3.5 h-3.5 text-[#CCFF00] shrink-0" />
                  <span>Cebu Civic Certified Badge progress: +15 EXP!</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Knowledge Check Card */}
      <div id="knowledge-check-block" className="glass rounded-lg border-l-4 border-[#CCFF00] border-y border-r border-white/10 p-5 shadow-xs flex flex-col gap-4">
        {/* Title */}
        <div className="flex items-center gap-2 text-teal">
          <CheckSquare2 className="w-[18px] h-[18px] text-[#CCFF00]" />
          <h3 className="font-bold text-[15px] text-[#CCFF00] tracking-wider uppercase font-mono">
            Quick Pop Quiz
          </h3>
        </div>

        <p className="text-[16px] font-semibold text-white">
          What is the best way to handle a frustrated or angry customer?
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
              Tell them it is not your fault and state company rules immediately.
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
              Listen calmly while they speak, apologize politely for the trouble, and work out a simple, helpful solution.
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
              Tell them to come back tomorrow or speak in louder words to show authority.
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
              ? 'Correct! Listening patiently and apologizing politely is the golden rule of customer support.' 
              : 'Not quite! Re-read the habits under Basics of Quality Customer Support and try again.'
            }
          </div>
        )}

        {/* Soft Save Info at bottom */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/50 font-mono py-1 border-t border-white/10 uppercase tracking-widest mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse"></span>
          <span>Your progress is saved!</span>
        </div>
      </div>
    </div>
  );
}
