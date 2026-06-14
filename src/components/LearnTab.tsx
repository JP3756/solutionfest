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

const LEVELS_CONTENT = {
  low: {
    id: 'low',
    name: 'Entry-Level (Vocational & Customer Support)',
    description: 'Prepare for high-demand BPO call center agent, hotel guest reception, or customer service advisor roles in Cebu with simple, offline-first communication and interpersonal skills modules.',
    progressText: 'Stage 1: Core Essentials • Module 1: Foundations',
    progressPct: '40%',
    mentorName: 'Coach Maricel Ramos',
    mentorImg: 'cebuanasMentor',
    mentorQuote: "As your key speaker today, I want to help you conquer every voice accent obstacle and secure a great career in Cebu! Connect with me to get direct mentorship, feedback, or simple help styling your pitch.",
    brandingTitle: 'Basics of Quality Customer Support',
    brandingText: 'Great customer service is the absolute core of BPO, retail, and hospitality careers in Cebu. It is about listening carefully to people, being deeply polite, and finding simple, friendly ways to handle their questions or complaints.',
    diagramTitle: 'How Customer Trust is Built',
    diagramDesc: "Visualizing how careful listening, greeting with politeness, and active problem-solving gain a customer's trust and appreciation.",
    diagramBubbles: ['LISTEN', 'POLITE', 'SOLVE'],
    networkingTitle: 'Key Habits for Workplace Success',
    networkingIntro: 'In local customer-facing jobs, these two essential skills make you stand out:',
    networkingHabits: [
      {
        title: '1. Active Listening',
        desc: 'Paying close attention to the customer, repeating their concerns back to them to show you understand, and taking brief notes if needed to avoid mistakes.'
      },
      {
        title: '2. Communicating Cheerfully',
        desc: 'Using a warm tone, steady volume, and gentle words. In Cebuano culture, starting off with a warm "Maayong adlaw!" or nice "Magandang umaga!" establishes instant friendly trust.'
      }
    ],
    voiceHeading: 'Cebu BPO Speech & Voice Lab',
    voiceScenarios: [
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
    ],
    quizQuestion: 'What is the best way to handle a frustrated or angry customer?',
    quizOptions: [
      { id: 'option-a', text: 'Tell them it is not your fault and state company rules immediately.' },
      { id: 'option-b', text: 'Listen calmly while they speak, apologize politely for the trouble, and work out a simple, helpful solution.' },
      { id: 'option-c', text: 'Tell them to come back tomorrow or speak in louder words to show authority.' }
    ],
    quizCorrectId: 'option-b',
    quizSuccessFeedback: 'Correct! Listening patiently and apologizing politely is the golden rule of customer support.',
    quizFailFeedback: 'Not quite! Re-read the habits under Basics of Quality Customer Support and try again.'
  },
  mid: {
    id: 'mid',
    name: 'Mid-Tech (Office & Digital Productivity)',
    description: 'Explore essential software operations, point-of-sale (POS) cashier applications, spreadsheet analysis, and local small business inventory management practices common in Cebu’s shopping hubs.',
    progressText: 'Stage 2: Digital Systems • Module 2: Office Ops',
    progressPct: '65%',
    mentorName: 'Coach Roland Go',
    mentorImg: 'mentorCebu',
    mentorQuote: "Mastering practical office tools like spreadsheets and modern retail software is a highly valued, reliable fast track to promotion inside Cebu business groups! Let’s optimize your data-handling skills together.",
    brandingTitle: 'Understanding Digital Office Systems',
    brandingText: 'Modern regional workplaces run on local spreadsheets, file structures, and Point-of-Sale (POS) systems. Mastering logical data sorting, digital inventory checks, and clear communication makes you highly employable in mid-scale businesses.',
    diagramTitle: 'Local Store Information Stream',
    diagramDesc: 'Visualizing how inventory inputs flow through POS registers into local bookkeeping spreadsheets.',
    diagramBubbles: ['STOCK', 'POS SYS', 'SHEETS'],
    networkingTitle: 'Essential Spreadsheet Integrity Checkups',
    networkingIntro: 'To operate administrative tasks safely and efficiently, build these crucial workplace compliance habits:',
    networkingHabits: [
      {
        title: 'Checking Formula & Cell Alignments',
        desc: 'Always verify sum ranges and cell locks before submitting sales reports. A tiny slip can disrupt stock orders across Mandaue warehouses.'
      },
      {
        title: 'Organized Folder Naming Guides',
        desc: 'Avoid saving files as "report-final-final.xlsx". Use tidy, searchable local standards like "YYYY_MM_Cebu_Retail_Sales.xlsx" so local partners can access records instantly.'
      }
    ],
    voiceHeading: 'Cebu Digital Ops Speech Practice',
    voiceScenarios: [
      {
        id: 'scen-1',
        title: 'POS Register Lag Out',
        context: 'Reporting POS Crash',
        prompt: '"The checkout queue in SM Seaside is piling up because my system froze during transaction processing!"',
        hint: 'Notify supervisor, state the error clearly, and propose checking the local offline network cache.',
        bestPractice: '"Sir Ruel, the checkout system is experiencing network latency. I am verifying the local cache fallback to keep processing sales."',
        proTip: 'Be calm and clear. Pronounce "system" and "cache" precisely to let coworkers know you are solving it.',
      },
      {
        id: 'scen-2',
        title: 'Report Data Mismatch',
        context: 'Addressing Stock Deficit',
        prompt: '"The inventory log lists 50 cargo boxes, but our warehouse floor only counts 42. How did this happen?"',
        hint: 'Avoid panic, outline a step-by-step review process, and reassure them that audits are standard practice.',
        bestPractice: '"I recognize the quantity discrepancy, Sir. I will audit today’s local POS ledger slips and check they match our spreadsheet inputs."',
        proTip: 'A stable, deliberate pace shows professionalism and inspires confidence in hard data situations.',
      },
      {
        id: 'scen-3',
        title: 'Clerical Update Delivery',
        context: 'Explaining Sheet Revisions',
        prompt: '"Why is our monthly local budget estimate layout completely different from last week’s template?"',
        hint: 'Explain the change clearly, offer a quick explanatory guide, and focus on the clean visual benefits.',
        bestPractice: '"We upgraded the layout to automate regional taxes, Ma’am. I added helpful visual indicators to make reading columns simpler."',
        proTip: 'Enunciate the "T" sounds in "layout" and "indicator" sharply to show confidence.',
      }
    ],
    quizQuestion: 'How should you troubleshoot a modern sales POS register that freezes during checkout?',
    quizOptions: [
      { id: 'option-a', text: 'Restart immediately without saving transactions or writing down checkout details.' },
      { id: 'option-b', text: 'Note the customer details, alert your supervisor, and check physical connections, active network cables, or transaction offline logs.' },
      { id: 'option-c', text: 'Blame the remote IT team and politely ask the queuing customers to reschedule their purchases for tomorrow.' }
    ],
    quizCorrectId: 'option-b',
    quizSuccessFeedback: 'Correct! Keeping calm, documenting active inputs, alerting your supervisor, and checking standard hardware connections preserves sales records.',
    quizFailFeedback: 'Not quite! Re-read the spreadsheet habits and troubleshooting guidance, then try again.'
  },
  high: {
    id: 'high',
    name: 'High-Tech (IT & Frontend Software Basics)',
    description: 'Understand core logic patterns, frontend code alignment, basic database setups, web APIs, and responsive UI structures used in high-growth startups in Cebu IT Park.',
    progressText: 'Stage 3: Advanced Tracks • Module 3: Modern Tech',
    progressPct: '90%',
    mentorName: 'Coach Neil Tan',
    mentorImg: 'cebuanasMentor',
    mentorQuote: "Logical modularity and clean, decoupled patterns are the secret to building resilient software. Let’s learn the separation of concerns and step up to high-tech software development!",
    brandingTitle: 'Decoupled Code Systems & Logic',
    brandingText: 'In software engineering, monolithic systems are hard to maintain. Splitting types, custom layout hooks, and state managers into modular files prevents token compilation limits and ensures easy team scaling in Cebu IT Park.',
    diagramTitle: 'Full-Stack Separation of Concerns',
    diagramDesc: 'Showing how the browser UI requests endpoints from an Express API backend server.',
    diagramBubbles: ['UI/VITE', 'EXPRESS API', 'DATABASE'],
    networkingTitle: 'Principles of Modern Software Architecture',
    networkingIntro: 'To write robust, production-ready code that passes lint checks and team code reviews, master these code patterns:',
    networkingHabits: [
      {
        title: 'Separation of Concerns',
        desc: 'Avoid single massive files! Keep static datasets, global definitions, page styles, and layouts in independent, highly modular chunks.'
      },
      {
        title: 'Safe Defensiveness',
        desc: 'Never assume environments or external variables are loaded. Use fallback values, lazy client initializers, and error boundaries so the system never crashes on start.'
      }
    ],
    voiceHeading: 'Cebu IT Park Developer Speech Lab',
    voiceScenarios: [
      {
        id: 'scen-1',
        title: 'Explain API Interruption',
        context: 'Describing Server Downtime',
        prompt: '"The portal registration button is unresponsive! Users are complaining they cannot log in."',
        hint: 'Acknowledge the alert, detail the specific failed endpoint, and state the expected rollback time.',
        bestPractice: '"I audited the server logs and recognized the authentication route is timing out. I am deploying a hotfix patch to restore service."',
        proTip: 'State server diagnostic events like "unresponsive route" with high confidence. Avoid technical slang.',
      },
      {
        id: 'scen-2',
        title: 'Client Web Design Feedback',
        context: 'Explaining Flex Wrap Issues',
        prompt: '"On my mobile device, the dashboard grid columns overflow horizontally off the edge of the screen!"',
        hint: 'Explain how responsive flex-wrap works and outline a simple fix using clean Tailwind CSS prefixes.',
        bestPractice: '"I will configure dynamic CSS wrap attributes with md and lg prefixes to ensure the dashboard fits small devices nicely."',
        proTip: 'Maintain warm, reassuring vocal pacing. Avoid sounding defensive about layout bugs responsive wraps.',
      },
      {
        id: 'scen-3',
        title: 'Senior Developer Code Review',
        context: 'Answering Big File Concerns',
        prompt: '"Your latest app features are great, but you placed 3,000 lines of code into a single React file. Why?"',
        hint: 'Accept the constructive advice, plan a modular split strategy, and emphasize testability benefits.',
        bestPractice: '"I recognize the technical debt. I will componentize the big view and export static datasets into individual source helpers."',
        proTip: 'Demonstrate respect for team code standard criteria. Keep answers highly logical when discussing structure.',
      }
    ],
    quizQuestion: 'In React development, what is the best strategy to keep code clean, testable, and compile-safe?',
    quizOptions: [
      { id: 'option-a', text: 'Consolidate all database connections, page layouts, form states, and styling blocks into a single infinite file.' },
      { id: 'option-b', text: 'Declare TypeScript interfaces in types.ts, extract isolated sub-components into a components folder, and write relative imports.' },
      { id: 'option-c', text: 'Avoid typing variables, let typescript auto-guess everything, and use any for all complex data structures.' }
    ],
    quizCorrectId: 'option-b',
    quizSuccessFeedback: 'Correct! Keeping files clean and splitting logic into modular units is highly recommended. It prevents token exhaustion and lets code build cleanly.',
    quizFailFeedback: 'Not quite! Putting everything in one file triggers compilation errors. Review Separation of Concerns, and try again.'
  }
};

interface LearnTabProps {
  isOffline: boolean;
  onSuccessToast: (msg: string) => void;
}

export default function LearnTab({ isOffline, onSuccessToast }: LearnTabProps) {
  // Curriculum Level state
  const [technicality, setTechnicality] = useState<'low' | 'mid' | 'high'>('low');

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

  // Reset states when changing technicality
  useEffect(() => {
    setActiveScenario(0);
    setVoiceEvaluation(null);
    setIsRecording(false);
    setSelectedOption(null);
    setChecked(false);
    setIsCorrect(null);
    setIsPlaying(false);
    setAudioProgress(0);
    setAudioTimer('00:00');
  }, [technicality]);

  const activeContent = LEVELS_CONTENT[technicality];

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
                activeContent.voiceScenarios[activeScenario].proTip,
                'Excellent use of helpful, professional vocabulary.',
                'Your rate of speech is steady and matches local Cebuano workplace environment limits.'
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
  }, [isRecording, activeScenario, technicality]);

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
      onSuccessToast(`Playing local ${activeContent.name} lesson audio... Optimized for low-bandwidth!`);
    }
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) {
      onSuccessToast('Please select an option first.');
      return;
    }
    setChecked(true);
    if (selectedOption === activeContent.quizCorrectId) {
      setIsCorrect(true);
      onSuccessToast('Great job! That is the correct answer!');
    } else {
      setIsCorrect(false);
      onSuccessToast('Not quite. Review the module materials & try again!');
    }
  };

  return (
    <div className="flex flex-col gap-5 animate-fade-in pb-12 text-white">
      {/* Dynamic Technicality Level Selector Panel */}
      <div className="glass rounded-lg border border-white/10 p-5 flex flex-col gap-3">
        <div>
          <span className="text-[9px] font-mono font-bold text-[#CCFF00] uppercase tracking-widest block mb-1">
            // CURRICULUM TRACK
          </span>
          <h3 className="text-base font-black uppercase text-white font-mono tracking-tight">
            Select Competency Level
          </h3>
          <p className="text-xs text-white/75 font-sans mt-1 leading-normal">
            Choose a learning level to dynamically adapt the lesson guides, interactive simulator dialogs, and evaluation playbooks.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-2 font-mono">
          {(['low', 'mid', 'high'] as const).map((level) => {
            const active = technicality === level;
            const text = {
              low: 'Foundational Core',
              mid: 'Applied Operations',
              high: 'Strategic Advanced'
            }[level];
            const badge = {
              low: 'LEVEL 1 • CORE',
              mid: 'LEVEL 2 • APPLIED',
              high: 'LEVEL 3 • STRATEGIC'
            }[level];
            const colorClass = {
              low: 'text-[#CCFF00]',
              mid: 'text-cyan-400',
              high: 'text-pink-400'
            }[level];
            
            return (
              <button
                key={level}
                type="button"
                onClick={() => {
                  setTechnicality(level);
                  onSuccessToast(`Switched career track to ${LEVELS_CONTENT[level].name}!`);
                }}
                className={`px-4 py-3.5 border rounded-lg text-left transition-all relative overflow-hidden flex flex-col justify-center min-h-[76px] cursor-pointer ${
                  active
                    ? 'bg-[#CCFF00] text-black border-[#CCFF00] shadow-lg shadow-[#CCFF00]/10'
                    : 'bg-black/40 text-white hover:bg-white/5 border-white/10'
                }`}
              >
                {active && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                    <Sparkles className="w-8 h-8 text-black animate-pulse" />
                  </div>
                )}
                <span className={`text-[8px] font-bold tracking-widest leading-none block ${
                  active ? 'text-black/70' : colorClass
                }`}>
                  {badge}
                </span>
                <span className="text-xs font-black uppercase tracking-normal mt-1.5 block leading-tight">
                  {text}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Module Progress Bar card */}
      <div className="glass rounded-lg border border-white/10 p-4">
        <div className="flex justify-between items-center text-[10px] font-bold text-white/60 mb-2 uppercase tracking-widest font-mono">
          <span>{activeContent.progressText}</span>
          <span className="text-[#CCFF00]">Progress: {activeContent.progressPct}</span>
        </div>
        <div className="w-full bg-white/10 h-1.5 rounded-sm overflow-hidden">
          <div className="bg-[#CCFF00] h-full rounded-sm transition-all duration-300" style={{ width: activeContent.progressPct }}></div>
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
            <span className="font-bold text-[13px] sm:text-sm uppercase tracking-wide font-mono text-white">
              Listen to Lesson: {activeContent.id === 'low' ? 'Low-Tech Basics' : activeContent.id === 'mid' ? 'Digital Workplaces' : 'Frontend Logical Architecture'}
            </span>
            <span className="text-white/70 text-[11px] font-mono tracking-wider mt-1">
              {isPlaying ? `Time: ${audioTimer} / 02:45` : 'Duration: 2:45 • Low-Bandwidth Mode'}
            </span>
          </div>
        </div>

        {/* Download Icon on Right */}
        <button 
          onClick={() => onSuccessToast(`Downloaded local ${activeContent.name} lesson guide for offline study!`)}
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
          src={activeContent.mentorImg === 'mentorCebu' ? mentorCebu : cebuanasMentor} 
          alt={`Featured Speaker - ${activeContent.mentorName}`} 
          className="w-16 h-16 rounded-lg object-cover border border-white/15 shrink-0"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <span className="text-[9px] font-mono font-bold text-[#CCFF00] uppercase tracking-widest block">
            Featured Coach for {activeContent.id === 'low' ? 'Low-Tech' : activeContent.id === 'mid' ? 'Mid-Tech' : 'High-Tech'}
          </span>
          <h4 className="text-sm font-black text-white uppercase mt-0.5">{activeContent.mentorName}</h4>
          <p className="text-[11px] text-white/70 mt-1 leading-snug font-sans italic">
            &ldquo;{activeContent.mentorQuote}&rdquo;
          </p>
          <div className="flex gap-2 mt-2">
            <button 
              onClick={() => onSuccessToast(`Connecting you with today's featured speaker, ${activeContent.mentorName}, for live Cebu tech-readiness support!`)}
              className="px-2.5 py-1 rounded bg-[#CCFF00]/10 border border-[#CCFF00]/30 hover:bg-[#CCFF00]/20 text-[#CCFF00] font-mono text-[9px] font-bold uppercase transition-colors text-left"
            >
              Contact {activeContent.mentorName.split(' ')[0]}
            </button>
          </div>
        </div>
      </div>

      {/* Accordions */}
      <div className="flex flex-col gap-3">
        {/* Accordion Item 1 */}
        <div className="glass rounded-lg border border-white/10 overflow-hidden">
          <button
            id="toggle-branding-accordion"
            onClick={() => setBrandingExpanded(!brandingExpanded)}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
          >
            <span className="font-bold text-[14px] sm:text-[16px] text-white tracking-tight uppercase font-mono">
              {activeContent.brandingTitle}
            </span>
            {brandingExpanded ? (
              <ChevronUp className="w-4 h-4 text-[#CCFF00]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#CCFF00]" />
            )}
          </button>

          {brandingExpanded && (
            <div className="px-5 pb-5 border-t border-white/10 pt-4 flex flex-col gap-4 animate-slide-down">
              <p className="text-[14px] leading-[22px] text-white/80 font-sans">
                {activeContent.brandingText}
              </p>

              {/* Diagram Placeholder - Brutalist technical diagram style */}
              <div className="bg-black/40 border border-white/10 rounded-lg p-5 flex flex-col items-center justify-center gap-3 text-center min-h-[140px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 border border-white/5 rounded-full flex items-center justify-center -mr-8 -mt-8">
                  <div className="w-12 h-12 bg-[#CCFF00]/5 rounded-full"></div>
                </div>

                {/* SVG/HTML Diagram Representation */}
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex -space-x-1.5 font-mono">
                    <div className="w-12 h-12 rounded-full border border-white/20 bg-black flex items-center justify-center text-[7px] font-black uppercase text-white/40">START</div>
                    {activeContent.diagramBubbles.map((bubble, idx) => (
                      <div 
                        key={idx}
                        className={`w-12 h-12 rounded-full border flex items-center justify-center text-[7.5px] font-black uppercase text-center p-1 leading-none ${
                        idx === 1 
                          ? 'border-[#CCFF00]/50 bg-[#CCFF00]/20 text-[#CCFF00]' 
                          : 'border-white/20 bg-black text-white'
                        }`}
                      >
                        {bubble}
                      </div>
                    ))}
                  </div>
                </div>
                
                <span className="text-[11px] sm:text-[12px] font-bold text-white/90 uppercase font-mono tracking-widest flex items-center gap-2">
                  <span className="p-0.5 px-1.5 bg-[#CCFF00]/10 border border-[#CCFF00]/20 text-[#CCFF00] rounded text-[9px]">
                    Interactive Map
                  </span>
                  {activeContent.diagramTitle}
                </span>
                
                <p className="text-[11px] text-white/60 max-w-[280px] font-sans leading-relaxed">
                  {activeContent.diagramDesc}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Accordion Item 2 */}
        <div className="glass rounded-lg border border-white/10 overflow-hidden">
          <button
            id="toggle-networking-accordion"
            onClick={() => setNetworkingExpanded(!networkingExpanded)}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
          >
            <span className="font-bold text-[14px] sm:text-[16px] text-white tracking-tight uppercase font-mono">
              {activeContent.networkingTitle}
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
                {activeContent.networkingIntro}
              </p>
              <div className="grid gap-3">
                {activeContent.networkingHabits.map((habit, idx) => (
                  <div key={idx} className="p-3 bg-white/5 rounded border border-white/10">
                    <span className="font-bold text-xs text-[#CCFF00] block uppercase tracking-widest font-mono mb-1">{habit.title}</span>
                    <span className="text-[13px] text-white/80 leading-relaxed font-sans">{habit.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Speech & Voice Lab / Communication coach */}
      <div id="bpo-voice-lab-card" className="glass rounded-lg border border-white/10 p-5 flex flex-col gap-4 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/5 pb-3">
          <div className="flex flex-col">
            <h3 className="text-sm font-bold font-mono text-[#CCFF00] tracking-[0.1em] uppercase flex items-center gap-2">
              <Mic className="w-4 h-4 text-[#CCFF00]" />
              {activeContent.voiceHeading}
            </h3>
            <span className="text-[10px] text-white/55 font-mono uppercase tracking-wider block mt-1">
              Interactive Speech Pattern Simulator
            </span>
          </div>
          <div className="self-start sm:self-center bg-[#CCFF00]/10 text-[#CCFF00] border border-[#CCFF00]/20 px-2 py-0.5 rounded text-[9px] font-bold font-mono tracking-wider uppercase flex items-center gap-1 shrink-0 animate-pulse">
            <Sparkles className="w-3 h-3 text-[#CCFF00]" />
            <span>Active Trainer</span>
          </div>
        </div>

        {/* Scenario Select Buttons */}
        <div className="grid grid-cols-3 gap-2 border-y border-white/5 py-2.5 my-0.5 scrollbar-none overflow-x-auto text-left font-mono">
          {activeContent.voiceScenarios.map((sc, index) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => {
                setActiveScenario(index);
                setVoiceEvaluation(null);
                setIsRecording(false);
              }}
              className={`text-[9px] px-2 py-3 rounded border leading-tight transition-all font-bold uppercase cursor-pointer flex flex-col justify-between min-h-[64px] ${
                activeScenario === index
                  ? 'bg-[#CCFF00]/10 border-[#CCFF00] text-[#CCFF00]'
                  : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:border-white/10'
              }`}
            >
              <span className="opacity-50 text-[7px] tracking-widest block truncate max-w-full">{sc.context}</span>
              <span className="mt-1.5 truncate max-w-full block text-[9.5px]">{sc.title}</span>
            </button>
          ))}
        </div>

        {/* Prompts Pane */}
        <div className="bg-black/30 border border-white/5 p-4 rounded-lg text-left relative overflow-hidden">
          <span className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest block mb-2 leading-none">
            Scenario Stakeholder Dialogue Cue:
          </span>
          <p className="text-xs italic text-white/95 font-medium leading-relaxed font-sans mb-3 pl-3 border-l bg-gradient-to-r from-white/5 to-transparent py-1.5 rounded-r border-[#CCFF00]">
            {activeContent.voiceScenarios[activeScenario].prompt}
          </p>

          <span className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest block mb-2 leading-none">
            Your Practicing Line:
          </span>
          <p className="text-[12px] text-[#CCFF00] font-bold leading-relaxed font-mono bg-white/5 rounded p-3 border border-white/5">
            {activeContent.voiceScenarios[activeScenario].bestPractice}
          </p>
          
          <div className="mt-2.5 flex items-start gap-1.5 p-2 bg-[#CCFF00]/5 border border-[#CCFF00]/10 rounded text-[10px] text-white/70">
            <Sliders className="w-3.5 h-3.5 text-[#CCFF00] shrink-0 mt-0.5" />
            <p className="font-sans leading-snug">
              <strong className="text-white">Coach Help Tip:</strong> {activeContent.voiceScenarios[activeScenario].hint}
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
                <span>Microphone Standby • Click below to practice voicing</span>
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
                  Cebuanas Voice Assessment
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
                <span className="text-[8.5px] font-black text-[#CCFF00] uppercase tracking-tighter leading-none mt-1 select-none block">Steady</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[8.5px] font-mono uppercase tracking-widest text-white/40 block font-bold leading-none mb-1">
                Acoustic Analysis & Speech Pro-Tips:
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
                  <span>Cebu Career Readiness Badge progress: +15 EXP!</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Pop Quiz */}
      <div id="knowledge-check-block" className="glass rounded-lg border-l-4 border-[#CCFF00] border-y border-r border-white/10 p-5 shadow-xs flex flex-col gap-4">
        {/* Title */}
        <div className="flex items-center gap-2 text-teal">
          <CheckSquare2 className="w-[18px] h-[18px] text-[#CCFF00]" />
          <h3 className="font-bold text-[15px] text-[#CCFF00] tracking-wider uppercase font-mono">
            Level Interactive Pop Quiz
          </h3>
        </div>

        <p className="text-[15px] sm:text-[16px] font-semibold text-white leading-snug">
          {activeContent.quizQuestion}
        </p>

        {/* Radio Options */}
        <div className="flex flex-col gap-3">
          {activeContent.quizOptions.map((opt) => {
            const isSelected = selectedOption === opt.id;
            return (
              <label 
                key={opt.id}
                className={`border rounded-lg p-3.5 flex items-center gap-3 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#CCFF00] bg-[#CCFF00]/5 text-[#CCFF00]'
                    : 'border-white/10 hover:bg-white/5'
                }`}
              >
                <input
                  type="radio"
                  name="kb-check"
                  value={opt.id}
                  checked={isSelected}
                  onChange={() => {
                    setSelectedOption(opt.id);
                    setChecked(false);
                  }}
                  className="mr-1 accent-[#CCFF00]"
                />
                <span className="text-[13px] sm:text-[14px] leading-snug flex-1">
                  {opt.text}
                </span>
              </label>
            );
          })}
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
          <div className={`p-3.5 rounded text-xs font-mono tracking-wide ${isCorrect ? 'bg-[#CCFF00]/15 text-[#CCFF00] border border-[#CCFF00]/30 animate-fade-in' : 'bg-red-950/40 text-red-300 border border-red-900/40 animate-fade-in'}`}>
            {isCorrect 
              ? activeContent.quizSuccessFeedback 
              : activeContent.quizFailFeedback
            }
          </div>
        )}

        {/* Soft Save Info at bottom */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/50 font-mono py-1 border-t border-white/10 uppercase tracking-widest mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse"></span>
          <span>Your progress is auto-saved locally!</span>
        </div>
      </div>
    </div>
  );
}
