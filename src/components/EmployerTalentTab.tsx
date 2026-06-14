import { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Compass, 
  Sparkles, 
  CheckCircle, 
  FileText, 
  Star, 
  Phone, 
  Mail, 
  GraduationCap, 
  Briefcase, 
  X, 
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { User } from '../types';

interface CandidateProfile {
  id: string;
  name: string;
  barangay: string;
  skills: string[];
  role: string;
  phone: string;
  email: string;
  summary: string;
  experience: { company: string; role: string; duration: string; description: string }[];
  education: { school: string; degree: string; year: string }[];
  verifiedBadgesCount: number;
}

interface EmployerTalentTabProps {
  onSuccessToast: (msg: string) => void;
}

export default function EmployerTalentTab({ onSuccessToast }: EmployerTalentTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState('All Sectors');
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile | null>(null);
  const [shortlistedKeys, setShortlistedKeys] = useState<string[]>(() => {
    const saved = localStorage.getItem('cebu_shortlisted_candidates');
    return saved ? JSON.parse(saved) : [];
  });

  const zones = ['All Sectors', 'Cebu IT Park (Lahug)', 'Guadalupe', 'Mambaling', 'Mandaue City', 'Talisay & South Area'];

  // preseeded local candidates
  const candidates: CandidateProfile[] = [
    {
      id: 'cand-1',
      name: 'Joven M.',
      barangay: 'Mambaling, Cebu City',
      skills: ['Customer Support', 'Polite Communication', 'English Conversation', 'Willing to Learn'],
      role: 'Customer Support (Cebu IT Park)',
      phone: '0917-882-1928',
      email: 'joven.mambaling@sugbotrabaho.ph',
      summary: 'Passionate and articulate candidate with specialized vocational upskilling in call-center dialog techniques. Ready to support national and global campaigns.',
      experience: [
        {
          company: 'Sitel Cebu IT Park (Simulation Prep)',
          role: 'BPO Communications Student',
          duration: '3 Months (2026)',
          description: 'Learned telephone polite interaction, handling global customer scenarios, and ticketing software tools.'
        }
      ],
      education: [
        {
          school: 'Abellana National School',
          degree: 'Senior High School Graduate',
          year: '2024'
        }
      ],
      verifiedBadgesCount: 3
    },
    {
      id: 'cand-2',
      name: 'Kassandra Go',
      barangay: 'Guadalupe, Cebu City',
      skills: ['Basic Computer Skills', 'Data Typing & Entry', 'Office Filing & Clerical', 'Polite Communication'],
      role: 'Office Assistant & Data Clerk',
      phone: '0922-110-3882',
      email: 'kassandra.go@sugbotrabaho.ph',
      summary: 'Accurate and highly detailed typing assistant. Skilled in spreadsheets, sorting digital documents, and client greeting.',
      experience: [
        {
          company: 'Guadalupe Local Cooperative Office',
          role: 'Clerical Assistant Volunteer',
          duration: '6 Months (2025)',
          description: 'Sorted cooperative membership applications, verified local tax certificates, and typed database logs.'
        }
      ],
      education: [
        {
          school: 'Cebu Institute of Technology',
          degree: 'Vocational Office Administration Certificate',
          year: '2025'
        }
      ],
      verifiedBadgesCount: 2
    },
    {
      id: 'cand-3',
      name: 'Michael Tecson',
      barangay: 'Mandaue City',
      skills: ['Office Filing & Clerical', 'Basic Computer Skills', 'Willing to Learn'],
      role: 'Warehouse Assistant & Clerk',
      phone: '0935-829-9118',
      email: 'michael.tecson@sugbotrabaho.ph',
      summary: 'Reliable and punctual professional with deep focus on physical inventory filing, sorting systems, and order packing standards.',
      experience: [
        {
          company: 'Mandaue Trading & Sea-Logistics Store',
          role: 'Inventory Helper',
          duration: '1 Year (2025)',
          description: 'Checked package labels against orders using barcode scanners, sorted cargo loads safely, and filled logbooks.'
        }
      ],
      education: [
        {
          school: 'Mandaue High School',
          degree: 'High School Graduate',
          year: '2023'
        }
      ],
      verifiedBadgesCount: 1
    },
    {
      id: 'cand-4',
      name: 'Reynaldo Alcantara',
      barangay: 'Talisay & South Area',
      skills: ['English Conversation', 'Retail Sales & Cashiering', 'Polite Communication', 'Customer Support'],
      role: 'Retail Store Associate',
      phone: '0908-112-9901',
      email: 'reynaldo.alcantara@gmail.com',
      summary: 'Dynamic and conversational sales associate with strong retail cashiering experiences in southern Cebu commercial centers.',
      experience: [
        {
          company: 'Gaisano Grand Tabunok',
          role: 'Cashier & Floor Associate',
          duration: '6 Months (2025)',
          description: 'Operated point-of-sale scanner registries, computed daily cash tallies, and handled guest inquiries.'
        }
      ],
      education: [
        {
          school: 'Talisay City College',
          degree: 'Undergraduate Continuing Studies (1 Year)',
          year: '2024'
        }
      ],
      verifiedBadgesCount: 4
    }
  ];

  const handleShortlistToggle = (candId: string, candName: string) => {
    let updated: string[];
    if (shortlistedKeys.includes(candId)) {
      updated = shortlistedKeys.filter(id => id !== candId);
      onSuccessToast(`Removed ${candName} from shortlists.`);
    } else {
      updated = [...shortlistedKeys, candId];
      onSuccessToast(`Shortlisted ${candName}! Aligned for direct recruitment.`);
    }
    setShortlistedKeys(updated);
    localStorage.setItem('cebu_shortlisted_candidates', JSON.stringify(updated));
  };

  // Filter candidates logic
  const filteredCandidates = candidates.filter((cand) => {
    const zoneMatches = selectedZone === 'All Sectors' || cand.barangay.includes(selectedZone.split(' (')[0]);
    const queryMatches = 
      cand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      cand.role.toLowerCase().includes(searchQuery.toLowerCase());
    return zoneMatches && queryMatches;
  });

  return (
    <div className="flex flex-col gap-4 animate-fade-in text-white pb-12" id="talent-search-view-container">
      
      {/* Upper header */}
      <div id="talent-telemetry-block" className="flex flex-col gap-1.5">
        <span className="text-[10px] font-bold text-[#CCFF00] tracking-[0.2em] uppercase font-mono block">
          Local Talent Pool
        </span>
        <h3 className="text-lg font-black text-white uppercase tracking-wider font-sans leading-none">
          Verify Graduate Profiles
        </h3>
        <p className="text-[10.5px] text-zinc-400 font-sans leading-snug">
          Browse upskilling graduates from local Cebu districts. Aligned with modern TESDA and corporate standards.
        </p>
      </div>

      {/* Filter and search bars */}
      <div className="flex flex-col gap-2 bg-white/5 border border-white/10 rounded-lg p-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, tags, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-white bg-black/50 font-medium text-xs font-mono h-10 pl-10 pr-4 border border-white/10 rounded focus:border-[#CCFF00] outline-none"
          />
          <Search className="w-4 h-4 text-white/45 absolute left-3 top-3" />
        </div>

        {/* Sectors zones slider */}
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
          {zones.map((zone) => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`text-[9px] font-semibold font-mono tracking-wider uppercase px-2.5 py-1.5 rounded border shrink-0 transition-colors cursor-pointer ${
                selectedZone === zone
                  ? 'bg-[#CCFF00] text-black border-[#CCFF00]'
                  : 'bg-white/5 text-white/50 border-white/5 hover:bg-white/10'
              }`}
            >
              {zone}
            </button>
          ))}
        </div>
      </div>

      {/* Candidate Grid */}
      <div className="flex flex-col gap-3">
        {filteredCandidates.length === 0 ? (
          <div className="text-center p-8 bg-white/5 border border-white/10 rounded-lg text-xs text-white/50">
            No candidates matched your filter criteria in Cebu.
          </div>
        ) : (
          filteredCandidates.map((cand) => {
            const isShortlisted = shortlistedKeys.includes(cand.id);
            return (
              <div 
                key={cand.id}
                className="glass border border-white/10 rounded-lg p-4 flex flex-col gap-2 relative transition-all hover:border-white/15"
              >
                {/* Shortlist Star Trigger */}
                <button
                  onClick={() => handleShortlistToggle(cand.id, cand.name)}
                  className="absolute top-4 right-4 p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/80 transition-colors cursor-pointer"
                  title="Shortlist Candidate"
                >
                  <Star className={`w-4 h-4 ${isShortlisted ? 'text-[#CCFF00] fill-[#CCFF00]' : 'text-white/40'}`} />
                </button>

                <div className="pr-8">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black uppercase text-white font-sans">{cand.name}</span>
                    <span className="text-[8px] font-bold font-mono text-emerald-400 border border-emerald-950 bg-emerald-950/40 px-1 rounded">
                      GRADUATE
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono mt-0.5 block uppercase font-medium">{cand.role}</span>
                </div>

                {/* Location Barangay Tag */}
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-300 font-sans mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#CCFF00]" />
                  <span>District: {cand.barangay}</span>
                </div>

                {/* Tag list */}
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {cand.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="text-[8.5px] font-mono leading-none border border-white/5 bg-white/5 text-zinc-300 px-1.5 py-0.5 rounded uppercase"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="border-t border-white/5 pt-3 mt-1.5 flex justify-between items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedCandidate(cand);
                      onSuccessToast(`Opening verified profile for ${cand.name}...`);
                    }}
                    className="flex-1 h-8 border border-white/10 hover:bg-white/5 text-white font-mono text-[9.5px] uppercase tracking-wider rounded flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Civic Resume</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Candidate Profile Details Overlay Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-[360px] max-w-full bg-[#0d0d0d] border border-white/15 rounded-xl shadow-2xl p-5 flex flex-col gap-4 relative max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setSelectedCandidate(null)}
              className="absolute top-4 right-4 p-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Profile Avatar Header */}
            <div className="border-b border-white/10 pb-4 pr-6">
              <span className="text-[8px] font-bold tracking-[0.2em] text-[#CCFF00] font-mono uppercase block">
                Sugbo Talent Verified Profile
              </span>
              <h2 className="text-base font-black text-white uppercase tracking-tight mt-1">
                {selectedCandidate.name}
              </h2>
              <span className="text-[10px] text-zinc-400 font-mono block mt-0.5">{selectedCandidate.role}</span>
              
              <div className="flex items-center gap-2 mt-2 font-mono text-[9px] text-[#CCFF00]">
                <span className="px-1.5 py-0.5 bg-[#CCFF00]/10 border border-[#CCFF00]/20 rounded font-bold">
                  ★ CEBU UPSKILL GRADUATE
                </span>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono border-b border-white/5 pb-3">
              <div className="flex items-center gap-1.5 text-zinc-300">
                <Phone className="w-3.5 h-3.5 text-[#CCFF00]" />
                <span>{selectedCandidate.phone}</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-300 overflow-hidden text-ellipsis">
                <Mail className="w-3.5 h-3.5 text-[#CCFF00]" />
                <span className="truncate">{selectedCandidate.email}</span>
              </div>
            </div>

            {/* Candidate Summary */}
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#CCFF00] font-mono">
                Candidate Summary
              </span>
              <p className="text-[11px] leading-snug font-sans text-zinc-300">
                {selectedCandidate.summary}
              </p>
            </div>

            {/* Credentials / Experience */}
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#CCFF00] font-mono">
                Employment History
              </span>
              {selectedCandidate.experience.map((exp, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/5 rounded p-2.5 font-sans">
                  <div className="flex justify-between items-start">
                    <span className="text-[10.5px] font-bold text-white uppercase">{exp.role}</span>
                    <span className="text-[8.5px] font-mono text-zinc-500 font-bold shrink-0">{exp.duration}</span>
                  </div>
                  <span className="text-[9.5px] text-[#CCFF00] block mt-0.5 font-semibold uppercase font-sans">{exp.company}</span>
                  <p className="text-[10px] text-zinc-400 mt-1 leading-normal">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Education entry */}
            <div className="flex flex-col gap-1.5 border-t border-white/5 pt-3">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#CCFF00] font-mono">
                Educational Background
              </span>
              {selectedCandidate.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-start text-[10.5px] font-sans">
                  <div>
                    <span className="font-bold text-white block uppercase">{edu.degree}</span>
                    <span className="text-[9px] text-zinc-400 font-mono block mt-0.5 uppercase leading-none">{edu.school}</span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 font-bold shrink-0">{edu.year}</span>
                </div>
              ))}
            </div>

            {/* Closing action shortlist */}
            <div className="flex gap-2 border-t border-white/10 pt-4 mt-2">
              <button
                onClick={() => handleShortlistToggle(selectedCandidate.id, selectedCandidate.name)}
                className={`flex-1 h-10.5 font-sans text-[10.5px] font-bold uppercase tracking-wider rounded cursor-pointer ${
                  shortlistedKeys.includes(selectedCandidate.id)
                    ? 'bg-rose-950/40 text-rose-300 border border-rose-900/40 hover:bg-rose-950/60'
                    : 'bg-[#CCFF00] text-black font-black hover:bg-[#b0db00]'
                }`}
              >
                {shortlistedKeys.includes(selectedCandidate.id) ? 'Remove Shortlist' : 'Shortlist Candidate'}
              </button>

              <button
                onClick={() => {
                  onSuccessToast(`Direct Message Link generated! SMS/Email with recruitment invitation sent.`);
                  setSelectedCandidate(null);
                }}
                className="flex-1 h-10.5 border border-white/10 hover:bg-white/5 text-white font-sans text-[10.5px] font-bold uppercase tracking-wider rounded cursor-pointer"
              >
                Message & Invite
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
