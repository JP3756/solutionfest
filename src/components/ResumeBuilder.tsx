import { useState, useEffect, FormEvent } from 'react';
import { 
  Plus, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  Download, 
  Layout, 
  Award, 
  FileText, 
  Check, 
  Briefcase, 
  GraduationCap, 
  PlusCircle, 
  Eye, 
  RefreshCw 
} from 'lucide-react';
import { ResumeData, WorkExperience, EducationEntry } from '../types';

const getInitials = (name: string) => {
  if (!name) return 'GP';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

interface ResumeBuilderProps {
  user: { name: string; skills: string[] } | null;
  onSuccessToast: (msg: string) => void;
}

export default function ResumeBuilder({ user, onSuccessToast }: ResumeBuilderProps) {
  // Read state or fallback
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('cebu_talent_resume_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.email === 'johnpaolo.cabaluna@dbtc-cebu.edu.ph') {
          parsed.email = 'applicant@sugbotrabaho.ph';
        }
        return parsed;
      } catch (e) {
        // Fallback
      }
    }

    // Default template data derived from standard user info
    const initialExp: WorkExperience[] = [
      {
        id: '1',
        company: 'Don Bosco Youth Center Cebu',
        role: 'Volunteer Team Lead',
        duration: '2023 - 2025',
        description: 'Coordinated community upskilling workshops, managed logbooks, and assisted in technical laboratory maintenance.'
      },
      {
        id: '2',
        company: 'Local Community Hub',
        role: 'Customer Care Support',
        duration: '2022 - 2023',
        description: 'Assisted local residents in utilizing digital services and filled out civic registry requests.'
      }
    ];

    const initialEdu: EducationEntry[] = [
      {
        id: '1',
        school: 'Don Bosco Technical College Cebu',
        degree: 'Technical Vocational Education Program',
        gradYear: '2028'
      }
    ];

    return {
      phone: '+63 917 482 9182',
      email: 'applicant@sugbotrabaho.ph',
      location: 'Cebu IT Park, Lahug',
      summary: 'Highly energetic and qualified local tech candidate possessing active certificates in professional communication and support basics. Focused on starting a career in Cebu\'s leading upscaling industries.',
      experiences: initialExp,
      educationList: initialEdu,
      template: 'civic'
    };
  });

  // Keep single text field states for adding new accomplishments easily
  const [activeTab, setActiveTab] = useState<'info' | 'experience' | 'education' | 'preview'>('info');
  
  // Experience sub-form states
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newDuration, setNewDuration] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Education sub-form states
  const [newSchool, setNewSchool] = useState('');
  const [newDegree, setNewDegree] = useState('');
  const [newGradYear, setNewGradYear] = useState('2028');

  // Export progress animation
  const [isDownloading, setIsDownloading] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('cebu_talent_resume_data', JSON.stringify(resumeData));
    // Also update old resume format key so we preserve compatibility with other modules which read cebu_talent_resume
    localStorage.setItem('cebu_talent_resume', JSON.stringify({
      phone: resumeData.phone,
      education: resumeData.educationList[0]?.school || 'Don Bosco Technical College Cebu',
      experience: resumeData.experiences[0]?.role + ' at ' + resumeData.experiences[0]?.company || 'Volunteer, Don Bosco',
      summary: resumeData.summary
    }));
  }, [resumeData]);

  // Handle updates of base parameters
  const updateBase = (key: keyof ResumeData, value: string) => {
    setResumeData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Add work experience
  const handleAddExperience = (e: FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newRole) {
      onSuccessToast('Error: Company and Role are required.');
      return;
    }
    const newItem: WorkExperience = {
      id: Date.now().toString(),
      company: newCompany,
      role: newRole,
      duration: newDuration || 'Present',
      description: newDesc
    };
    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newItem]
    }));
    setNewCompany('');
    setNewRole('');
    setNewDuration('');
    setNewDesc('');
    onSuccessToast('Work experience entry logged successfully!');
  };

  // Remove work experience
  const handleRemoveExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
    onSuccessToast('Experience entry removed.');
  };

  // Add education entry
  const handleAddEducation = (e: FormEvent) => {
    e.preventDefault();
    if (!newSchool || !newDegree) {
      onSuccessToast('Error: School and Degree details are required.');
      return;
    }
    const newItem: EducationEntry = {
      id: Date.now().toString(),
      school: newSchool,
      degree: newDegree,
      gradYear: newGradYear || 'Ongoing'
    };
    setResumeData(prev => ({
      ...prev,
      educationList: [...prev.educationList, newItem]
    }));
    setNewSchool('');
    setNewDegree('');
    setNewGradYear('2028');
    onSuccessToast('Education background recorded!');
  };

  // Remove education entry
  const handleRemoveEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      educationList: prev.educationList.filter(edu => edu.id !== id)
    }));
    onSuccessToast('Education entry removed.');
  };

  // Export pdf mock handler
  const triggerPdfExport = () => {
    setIsDownloading(true);
    onSuccessToast('Transpiling career portfolio entries & skill-alignment badges...');
    setTimeout(() => {
      setIsDownloading(false);
      onSuccessToast('Success! High-resolution resume PDF saved to Downloads.');
    }, 2000);
  };

  return (
    <div id="edu-resume-builder" className="glass border border-white/10 rounded-xl p-5 flex flex-col gap-5 relative overflow-hidden text-white">
      <div className="absolute top-0 right-0 w-44 h-[1px] bg-gradient-to-l from-[#CCFF00]/25 to-transparent"></div>
      
      {/* Title block */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded bg-[#CCFF00]/10 border border-[#CCFF00]/20 flex items-center justify-center text-[#CCFF00]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-wider font-sans leading-none text-white">
              Civic Resume Designer
            </h3>
            <span className="text-[9.5px] font-mono tracking-widest text-[#CCFF00] uppercase mt-1 block">
              DMDP Vocational Standard Alignment
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          <span className="text-[8px] font-mono font-bold bg-[#CCFF00]/10 text-[#CCFF00] border border-[#CCFF00]/25 px-1.5 py-0.5 rounded">
            DPA SECURE
          </span>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex bg-black/40 border border-white/5 p-1 rounded-lg gap-1 font-mono text-[10px]">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-1.5 rounded font-bold uppercase transition-all cursor-pointer text-center ${
            activeTab === 'info' ? 'bg-[#CCFF00] text-black' : 'text-white/60 hover:text-white'
          }`}
        >
          1. Profile
        </button>
        <button
          onClick={() => setActiveTab('experience')}
          className={`flex-1 py-1.5 rounded font-bold uppercase transition-all cursor-pointer text-center ${
            activeTab === 'experience' ? 'bg-[#CCFF00] text-black' : 'text-white/60 hover:text-white'
          }`}
        >
          2. Industry
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`flex-1 py-1.5 rounded font-bold uppercase transition-all cursor-pointer text-center ${
            activeTab === 'education' ? 'bg-[#CCFF00] text-black' : 'text-white/60 hover:text-white'
          }`}
        >
          3. Study
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-1.5 rounded font-bold uppercase transition-all cursor-pointer text-center flex items-center justify-center gap-1 ${
            activeTab === 'preview' ? 'bg-cyan-500 text-black' : 'text-cyan-400 hover:text-cyan-200'
          }`}
        >
          <Eye className="w-3 h-3" />
          <span>Preview</span>
        </button>
      </div>

      {/* Main Tab Panels */}
      <div className="min-h-[220px]">
        {/* Tab 1: Profile & Contact Details */}
        {activeTab === 'info' && (
          <div className="flex flex-col gap-4 animate-fade-in font-mono text-[11px]">
            <div className="bg-[#CCFF00]/5 border border-[#CCFF00]/15 rounded p-3 text-[10px] text-white/80 leading-relaxed mb-1">
              Provide updated contact information for recruitment agencies in Cebu Business Center. Let companies reach out to you directly!
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase text-[#CCFF00]">Telephone / Mobile</label>
                <div className="relative">
                  <input
                    type="text"
                    value={resumeData.phone}
                    onChange={(e) => updateBase('phone', e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded h-10 px-3 pl-8 text-xs focus:border-[#CCFF00] outline-none"
                    placeholder="+63 917 123 4567"
                  />
                  <Phone className="w-3.5 h-3.5 text-white/30 absolute left-2.5 top-3.5" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase text-[#CCFF00]">Public Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={resumeData.email}
                    onChange={(e) => updateBase('email', e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded h-10 px-3 pl-8 text-xs focus:border-[#CCFF00] outline-none"
                    placeholder="john@example.com"
                  />
                  <Mail className="w-3.5 h-3.5 text-white/30 absolute left-2.5 top-3.5" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-black uppercase text-[#CCFF00]">Residence / Cebu Area</label>
              <div className="relative">
                <input
                  type="text"
                  value={resumeData.location}
                  onChange={(e) => updateBase('location', e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded h-10 px-3 pl-8 text-xs focus:border-[#CCFF00] outline-none"
                  placeholder="Mandaue City, Cebu"
                />
                <MapPin className="w-3.5 h-3.5 text-white/30 absolute left-2.5 top-3.5" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-black uppercase text-[#CCFF00]">Executive Biography Summary</label>
              <textarea
                value={resumeData.summary}
                onChange={(e) => updateBase('summary', e.target.value)}
                rows={3}
                placeholder="A high-level summary of your core motivation, background, and work ethic in Cebu."
                className="w-full bg-black/60 border border-white/10 rounded p-3 text-xs focus:border-[#CCFF00] outline-none resize-none leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Work Experience */}
        {activeTab === 'experience' && (
          <div className="flex flex-col gap-4 animate-fade-in">
            {/* List existing experiences */}
            {resumeData.experiences.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-bold font-mono text-white/40 uppercase tracking-wider block">
                  Logged Career Milestones ({resumeData.experiences.length})
                </span>
                <div className="flex flex-col gap-2">
                  {resumeData.experiences.map((exp) => (
                    <div 
                      key={exp.id} 
                      className="bg-white/5 border border-white/5 rounded p-3 flex justify-between items-start text-xs font-sans group relative gap-3"
                    >
                      <div className="flex gap-2.5 min-w-0 flex-1">
                        <Briefcase className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-white text-[13px] break-words">{exp.role}</h4>
                          <span className="text-[11.5px] text-white/70 font-medium font-mono break-words block mt-0.5">{exp.company} • {exp.duration}</span>
                          {exp.description && (
                            <p className="text-[10px] text-white/50 mt-1 leading-relaxed break-words whitespace-pre-line">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveExperience(exp.id)}
                        className="p-1 hover:bg-red-500/15 hover:text-red-400 text-white/30 rounded border border-transparent hover:border-red-500/20 cursor-pointer shrink-0 transition-all"
                        title="Delete Milestone"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Form to add a new Work Entry */}
            <form onSubmit={handleAddExperience} className="border-t border-white/10 pt-4 flex flex-col gap-3 font-mono text-[11px]">
              <span className="text-[9.5px] font-black text-[#CCFF00] uppercase tracking-wider block">
                + Add Work Experience Entry
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] uppercase text-white/50">Company Name</label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder=""
                    className="w-full bg-black/60 border border-white/10 rounded h-8.5 px-2.5 text-xs focus:border-[#CCFF00] outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] uppercase text-white/50">Role / Designation</label>
                  <input
                    type="text"
                    required
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder=""
                    className="w-full bg-black/60 border border-white/10 rounded h-8.5 px-2.5 text-xs focus:border-[#CCFF00] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] uppercase text-white/50">Duration (Span)</label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    placeholder=""
                    className="w-full bg-black/60 border border-white/10 rounded h-8.5 px-2.5 text-xs focus:border-[#CCFF00] outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] uppercase text-white/50">Main Achievement</label>
                  <input
                    type="text"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder=""
                    className="w-full bg-black/60 border border-white/10 rounded h-8.5 px-2.5 text-xs focus:border-[#CCFF00] outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="h-9 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] uppercase font-bold tracking-widest rounded flex items-center justify-center gap-1.5 mt-1 cursor-pointer transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#CCFF00]" />
                <span>Append Experience</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Education */}
        {activeTab === 'education' && (
          <div className="flex flex-col gap-4 animate-fade-in">
            {/* List existing education milestones */}
            {resumeData.educationList.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-bold font-mono text-white/40 uppercase tracking-wider block">
                  Enrolled Institutes ({resumeData.educationList.length})
                </span>
                <div className="flex flex-col gap-2">
                  {resumeData.educationList.map((edu) => (
                    <div 
                      key={edu.id} 
                      className="bg-white/5 border border-white/5 rounded p-3 flex justify-between items-start text-xs font-sans w-full group relative gap-3 text-left"
                    >
                      <div className="flex gap-2.5 min-w-0 flex-1">
                        <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-white text-[13px] break-words">{edu.school}</h4>
                          <span className="text-[11px] text-white/70 font-medium font-mono break-words block mt-0.5">
                            {edu.degree} • Completion: {edu.gradYear}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveEducation(edu.id)}
                        className="p-1 hover:bg-red-500/15 hover:text-red-400 text-white/30 rounded border border-transparent hover:border-red-500/20 cursor-pointer shrink-0 transition-all ml-1"
                        title="Delete Education Academic"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Form to append Education Milestone */}
            <form onSubmit={handleAddEducation} className="border-t border-white/10 pt-4 flex flex-col gap-3 font-mono text-[11px]">
              <span className="text-[9.5px] font-black text-cyan-400 uppercase tracking-wider block">
                + Append Academic Record
              </span>

              <div className="flex flex-col gap-1">
                <label className="text-[8px] uppercase text-white/50">School / Technical Institute</label>
                <input
                  type="text"
                  required
                  value={newSchool}
                  onChange={(e) => setNewSchool(e.target.value)}
                  placeholder="e.g. Don Bosco Technical College Cebu"
                  className="bg-black/60 border border-white/10 rounded h-8.5 px-3 text-xs focus:border-[#CCFF00] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="flex flex-col gap-1 col-span-1 sm:col-span-2">
                  <label className="text-[8px] uppercase text-white/50">Degree / Trade Certificate</label>
                  <input
                    type="text"
                    required
                    value={newDegree}
                    onChange={(e) => setNewDegree(e.target.value)}
                    placeholder="e.g. Information Technology Certificate"
                    className="w-full bg-black/60 border border-white/10 rounded h-8.5 px-2.5 text-xs focus:border-[#CCFF00] outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-1">
                  <label className="text-[8px] uppercase text-white/50">Completion Year</label>
                  <input
                    type="text"
                    value={newGradYear}
                    onChange={(e) => setNewGradYear(e.target.value)}
                    placeholder="e.g. 2028"
                    className="w-full bg-black/60 border border-white/10 rounded h-8.5 px-2.5 text-xs focus:border-[#CCFF00] outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="h-9 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] uppercase font-bold tracking-widest rounded flex items-center justify-center gap-1.5 mt-1 cursor-pointer transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Save Academic Milestone</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Interactive Style & Real-time Resume Preview */}
        {activeTab === 'preview' && (
          <div className="flex flex-col gap-4 animate-fade-in">
            {/* Template Selector HUD */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
              <span className="text-[10px] font-bold font-mono text-white/65 uppercase tracking-widest">
                Template Theme UI
              </span>
              <div className="flex gap-1.5 font-mono text-[9px] font-bold">
                <button
                  onClick={() => setResumeData(prev => ({ ...prev, template: 'civic' }))}
                  className={`px-2.5 py-1 rounded transition-colors uppercase border cursor-pointer ${
                    resumeData.template === 'civic' 
                      ? 'bg-blue-600/20 text-blue-400 border-blue-500/40' 
                      : 'bg-white/5 hover:bg-white/10 text-white/50 border-white/10'
                  }`}
                >
                  Gov Blueprint
                </button>
                <button
                  onClick={() => setResumeData(prev => ({ ...prev, template: 'modern' }))}
                  className={`px-2.5 py-1 rounded transition-colors uppercase border cursor-pointer ${
                    resumeData.template === 'modern' 
                      ? 'bg-[#CCFF00]/15 text-[#CCFF00] border-[#CCFF00]/30' 
                      : 'bg-white/5 hover:bg-white/10 text-white/50 border-white/10'
                  }`}
                >
                  Tech Neon
                </button>
                <button
                  onClick={() => setResumeData(prev => ({ ...prev, template: 'minimalist' }))}
                  className={`px-2.5 py-1 rounded transition-colors uppercase border cursor-pointer ${
                    resumeData.template === 'minimalist' 
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' 
                      : 'bg-white/5 hover:bg-white/10 text-white/50 border-white/10'
                  }`}
                >
                  Classy Minimal
                </button>
              </div>
            </div>

            {/* Real Resume Paper Layout Sheet */}
            <div className={`rounded-xl p-4 sm:p-5 text-slate-900 shadow-xl overflow-hidden relative flex flex-col gap-4 border border-slate-200 transition-all duration-300 ${
              resumeData.template === 'civic' 
                ? 'bg-[#f4f7f6] border-t-4 border-t-blue-800' 
                : resumeData.template === 'modern'
                ? 'bg-gradient-to-br from-slate-100 to-white' 
                : 'bg-stone-50 border border-stone-300'
            }`}>
              
              {/* Civic background watermark */}
              {resumeData.template === 'civic' && (
                <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full border border-blue-800/5 rotate-12 flex items-center justify-center pointer-events-none select-none">
                  <div className="w-32 h-32 rounded-full border-4 border-dashed border-blue-800/10 flex items-center justify-center font-bold font-mono text-[9px] text-blue-800/10 text-center leading-none tracking-widest uppercase">
                    DMDP MODEL<br/>CURRICULUM<br/>ALIGNED
                  </div>
                </div>
              )}

              {/* Header section on paper representation */}
              <div className="text-center pb-2.5 border-b border-slate-800/10">
                {resumeData.template === 'civic' && (
                  <>
                    <span className="text-[7px] font-bold tracking-[0.2em] font-mono text-slate-500 block uppercase leading-none">
                      Independent Civic Template Guide
                    </span>
                    <span className="text-[7px] font-bold tracking-[0.1em] font-mono text-slate-400 block uppercase leading-none mt-0.5">
                      Styled for Cebu DMDP Vocational Recommendations
                    </span>
                  </>
                )}
                {resumeData.template === 'modern' && (
                  <span className="text-[8px] font-bold text-[#CCFF00] uppercase tracking-widest bg-slate-900 px-2 py-0.5 rounded font-mono inline-block mb-1 shadow">
                    Upskilling Workforce Registry
                  </span>
                )}
                <h4 className="text-[12px] font-black uppercase text-slate-800 tracking-wider font-sans mt-0.5">
                  OFFICIAL CIVIC CAREER PROFILE
                </h4>
              </div>

              {/* Personal Block */}
              <div className="flex items-center gap-3.5 border-t border-slate-100 pt-3 flex-row relative">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-slate-900 border border-slate-800 text-white flex items-center justify-center font-black font-mono text-sm shadow-sm tracking-wide shrink-0 select-none">
                  {getInitials(user?.name || 'John Paolo Cabaluna')}
                </div>
                <div className="flex flex-col flex-1 gap-0.5 min-w-0">
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase font-sans tracking-wide leading-none">
                    {user?.name || 'John Paolo Cabaluna'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-1 gap-x-2 text-[9px] text-slate-600 font-mono mt-0.5">
                    <span className="truncate flex items-center gap-1">
                      <span className="text-blue-500 font-sans block shrink-0">☎</span> {resumeData.phone}
                    </span>
                    <span className="truncate flex items-center gap-1">
                      <span className="text-blue-500 font-sans block shrink-0">✉</span> {resumeData.email}
                    </span>
                    <span className="truncate flex items-center gap-1">
                      <span className="text-blue-500 font-sans block shrink-0">📍</span> {resumeData.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Career Objective Text block */}
              {resumeData.summary && (
                <div className="flex flex-col gap-1 border-t border-slate-100 pt-2.5">
                  <span className={`text-[8.5px] font-bold tracking-widest font-mono uppercase ${
                    resumeData.template === 'civic' ? 'text-blue-700' : 'text-slate-800 border-b border-slate-200 pb-0.5 mb-1'
                  }`}>
                    Professional Summary
                  </span>
                  <p className="text-[10px] text-slate-700 font-sans leading-relaxed">
                    {resumeData.summary}
                  </p>
                </div>
              )}

              {/* Work Milestones list */}
              {resumeData.experiences.length > 0 && (
                <div className="flex flex-col gap-2.5 border-t border-slate-100 pt-2.5">
                  <span className={`text-[8.5px] font-bold tracking-widest font-mono uppercase block ${
                    resumeData.template === 'civic' ? 'text-blue-700' : 'text-slate-800 border-b border-slate-200 pb-0.5 mb-1'
                  }`}>
                    Industry Experience
                  </span>
                  <div className="flex flex-col gap-2">
                    {resumeData.experiences.map(exp => (
                      <div key={exp.id} className="flex flex-col gap-0.5 text-[10px]">
                        <div className="flex justify-between items-start font-sans font-bold">
                          <span className="text-slate-800">{exp.role} — <span className="text-slate-600 font-medium">{exp.company}</span></span>
                          <span className="text-[8.5px] font-mono text-slate-400 font-normal shrink-0 ml-1">{exp.duration}</span>
                        </div>
                        {exp.description && (
                          <p className="text-[9.5px] text-slate-600 leading-snug font-light font-sans">
                            • {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education section info list */}
              {resumeData.educationList.length > 0 && (
                <div className="flex flex-col gap-2 border-t border-slate-100 pt-2.5">
                  <span className={`text-[8.5px] font-bold tracking-widest font-mono uppercase block ${
                    resumeData.template === 'civic' ? 'text-blue-700' : 'text-slate-800 border-b border-slate-200 pb-0.5 mb-1'
                  }`}>
                    Education Track
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {resumeData.educationList.map(edu => (
                      <div key={edu.id} className="flex justify-between items-start text-[9.5px] font-sans">
                        <div>
                          <span className="font-bold text-slate-800 block leading-snug">{edu.school}</span>
                          <span className="text-slate-500 font-medium block leading-none">{edu.degree}</span>
                        </div>
                        <span className="text-[8.5px] font-mono text-slate-400 font-bold shrink-0 ml-1">{edu.gradYear}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dynamic Course Certified Skills bad_list */}
              <div className="flex flex-col gap-2.5 border-t border-slate-100 pt-2.5">
                <span className={`text-[8.5px] font-bold tracking-widest font-mono uppercase block ${
                  resumeData.template === 'civic' ? 'text-blue-700' : 'text-slate-800 border-b border-slate-200 pb-0.5 mb-1'
                }`}>
                  Completed Skills Portfolio (DMDP Style)
                </span>
                <div className="flex flex-wrap gap-1 pr-6">
                  {user && user.skills.length > 0 ? (
                    user.skills.map(skill => (
                      <span 
                        key={skill}
                        className="text-[8.5px] font-mono font-bold uppercase tracking-wider bg-slate-200/55 text-slate-800 border border-slate-300 px-1.5 py-0.5 rounded"
                      >
                        ✓ {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono italic">
                      No certified courses completed yet. Start studying under "Growth Essentials".
                    </span>
                  )}
                </div>
              </div>

              {/* Certification Stamp sign and simulated register bar-codes */}
              <div className="flex justify-between items-end border-t border-slate-800/10 pt-2.5 mt-2">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-0.5 pointer-events-none opacity-45">
                    <div className="w-[1.5px] h-4 bg-slate-800"></div>
                    <div className="w-[1px] h-4 bg-slate-800"></div>
                    <div className="w-[2px] h-4 bg-slate-800"></div>
                    <div className="w-[1px] h-4 bg-slate-800"></div>
                    <div className="w-[1.5px] h-4 bg-slate-800"></div>
                  </div>
                  <span className="text-[6px] font-mono text-slate-400 font-bold uppercase tracking-widest leading-none">
                    REF-ALIGN-{user?.name.slice(0,4).toUpperCase() || 'CIV'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[7px] font-bold text-slate-400 block uppercase leading-none font-mono">
                    Independent CV Format
                  </span>
                  <span className="text-[6.5px] font-bold text-slate-500 block uppercase mt-0.5 font-mono">
                    Skills-Aligned Output
                  </span>
                </div>
              </div>

            </div>

            {/* Main Action Callouts */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={triggerPdfExport}
                disabled={isDownloading}
                className="w-full h-11 bg-cyan-500 hover:bg-cyan-400 text-neutral-900 disabled:bg-white/5 disabled:text-white/30 rounded font-extrabold uppercase text-xs tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 font-mono"
              >
                {isDownloading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-neutral-900" />
                    <span>Packaging Print Stream...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-neutral-900" />
                    <span>Download Print-Ready PDF</span>
                  </>
                )}
              </button>
              
              <div className="bg-white/5 border border-white/5 rounded-lg p-2.5 text-[10px] font-sans text-white/70 leading-normal flex items-start gap-2">
                <span className="text-[#CCFF00] shrink-0 font-bold mt-0.5">💡</span>
                <p>
                  <strong className="text-white">Next Step:</strong> Print this exported PDF and submit it directly to the local <strong className="text-[#CCFF00]">DMDP Office (Ramos, Cebu City)</strong> or present it during regional hiring events to instantly showcase your aligned vocational skills!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
