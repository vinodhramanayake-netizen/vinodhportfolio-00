import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { useScroll } from '../context/ScrollContext';
import BreathingWidget from './BreathingWidget';
import MindfulnessCaseStudy from './MindfulnessCaseStudy';

const PROJECT_METADATA_MAP: Record<string, { role: string; duration: string; team: string; scope: string; tools: string }> = {
  brunelly: {
    role: "UX/UI Designer",
    duration: "Apr 2025 — Present",
    team: "Product Leadership, AI & Engineering Squad",
    scope: "Product Design · UX · UI · Design System · Prototyping",
    tools: "Figma · Claude · Claude Code · Lovable · UX Pilot"
  },
  'mindfulness-meditation-mvp': {
    role: "Sole Product Designer",
    duration: "2-3-Weeks",
    team: "Product Founder & Lead Engineer",
    scope: "MVP level features",
    tools: "Figma and claude"
  },
  'ceylo-tourism': {
    role: "Solo UX/UI Designer",
    duration: "48-Hour Design Challenge",
    team: "None (Hypothetical Challenge)",
    scope: "Conceptual UX/UI · Local Tourism Marketplace",
    tools: "Figma"
  },
  'one-stop-marketplace': {
    role: "UI/UX Designer",
    duration: "2-Week Sprint",
    team: "Growth Lead, Full-Stack Engineers",
    scope: "Landing Page Architecture · Marketplace UI",
    tools: "Figma · Claude"
  },
  'pixelvault-crypto': {
    role: "UI/UX Designer",
    duration: "2 Days",
    team: "None (Hypothetical Challenge)",
    scope: "Conceptual UX/UI · Crypto Dashboard",
    tools: "Figma"
  },
  'ugc-website-redesign': {
    role: "Sole UX Designer",
    duration: "48 Hours",
    team: "None (Competition Challenge)",
    scope: "Website Redesign · Creator Economy",
    tools: "Figma · Claude · FigJam"
  },
  'wellnessgrocer-xr': {
    role: "Lead Spatial & Product Designer",
    duration: "4-Week Sprint",
    team: "XR Prototypers, Health Integration Engineers",
    scope: "Spatial Interaction Design · visionOS layouts",
    tools: "Figma · Apple Reality Composer"
  },
  'mathru-app': {
    role: "Lead Mobile Product Designer",
    duration: "2-Week Sprint",
    team: "Obstetricians, Maternal Community Partners",
    scope: "Cultural Research · Localization Flow · Prototyping",
    tools: "Figma · Miro"
  }
};

interface ProjectDetailPageProps {
  project: Project;
  allProjects: Project[];
  onSelectProject: (p: Project) => void;
  onBackToWorks: () => void;
  onBackToHome?: () => void;
  onOpenContact: () => void;
}

export default function ProjectDetailPage({
  project,
  allProjects,
  onSelectProject,
  onBackToWorks,
  onBackToHome,
  onOpenContact,
}: ProjectDetailPageProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const { scrollTo } = useScroll();

  // Reset to first image whenever project changes
  useEffect(() => {
    setActiveImageIdx(0);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project.id]);

  const projectImages: string[] =
    project.images && project.images.length > 0
      ? project.images
      : [project.image];

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const isBrunelly = project.id === 'brunelly';
  const isMindfulness = project.id === 'mindfulness-meditation-mvp';
  const isCeylo = project.id === 'ceylo-tourism';
  const isPixelVault = project.id === 'pixelvault-crypto';
  const isOneStop = project.id === 'one-stop-marketplace';
  const isUgc = project.id === 'ugc-website-redesign';
  const isWellnessGrocer = project.id === 'wellnessgrocer-xr';
  const isMathru = project.id === 'mathru-app';
  const isCustomLayout = isBrunelly || isMindfulness || isCeylo || isPixelVault || isOneStop || isUgc || isWellnessGrocer || isMathru;

  const meta = PROJECT_METADATA_MAP[project.id] || {
    role: "UX/UI Designer",
    duration: "2-Week Sprint",
    team: "Product Team",
    scope: project.scope ? project.scope.slice(0, 3).join(' · ') : "Product Design & UX",
    tools: "Figma · Claude"
  };

  return (
    <div className="w-full bg-[#fafafa] text-[#18181b] min-h-screen pt-20 sm:pt-24 pb-20">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 md:px-14 lg:px-20">
        
        {/* Top Navigation & Breadcrumbs Bar */}
        <div className="py-4 border-b border-[#e5e7eb] flex flex-wrap items-center justify-between gap-4 font-mono text-[12px]">
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <button
              id="back-to-works-btn"
              onClick={onBackToWorks}
              className="group inline-flex items-center gap-2 px-3 py-1.5 border border-[#d4d4d8] bg-white hover:border-[#15803d] text-[#18181b] hover:text-[#15803d] transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="uppercase font-medium">Back to Works</span>
            </button>

            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="text-[#71717a] hover:text-[#111111] transition-colors cursor-pointer hidden sm:inline"
              >
                Home
              </button>
            )}

            <span className="text-[#a1a1aa] hidden sm:inline">/</span>

            <span className="text-[#111111] font-semibold hidden sm:inline">
              {project.title}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#71717a]">
            <span className="font-semibold text-[#15803d]">
              [ 0{currentIndex + 1} / 0{allProjects.length} ]
            </span>
          </div>
        </div>

        {/* Main Editorial Hero */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="pt-10 sm:pt-14 pb-10 border-b border-[#e5e7eb] space-y-6"
        >
          {!isCustomLayout && project.id !== 'pixelvault-crypto' && (
            <div className="flex items-center gap-3 font-mono text-[11px] sm:text-[12px] uppercase tracking-widest text-[#15803d]">
              <span>[ CLIENT CASE STUDY ]</span>
              <span className="text-[#a1a1aa]">•</span>
              <span>{project.client}</span>
            </div>
          )}

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#111111] leading-[1.05]">
            {project.title}
          </h1>

          {project.tagline && project.id !== 'mindfulness-meditation-mvp' && project.id !== 'ceylo-tourism' && project.id !== 'ugc-website-redesign' && (
            <p className="text-xl sm:text-2xl md:text-3xl text-[#15803d] font-medium leading-relaxed w-full">
              "{project.tagline}"
            </p>
          )}

          <p className="text-base sm:text-lg text-[#52525b] leading-relaxed w-full font-sans">
            {project.description}
          </p>

          <div className="pt-6 border-t border-[#e5e7eb]">
            {/* Horizontal Metadata Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
              <div className="p-4 sm:p-5 bg-white border border-[#e4e4e7] hover:border-[#15803d]/40 transition-colors shadow-2xs flex flex-col justify-between gap-2.5">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#71717a]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" />
                  <span>My Role</span>
                </div>
                <div className="text-[14px] sm:text-[15px] font-semibold text-[#111111] leading-snug">
                  {meta.role}
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-white border border-[#e4e4e7] hover:border-[#15803d]/40 transition-colors shadow-2xs flex flex-col justify-between gap-2.5">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#71717a]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" />
                  <span>Duration</span>
                </div>
                <div className="text-[14px] sm:text-[15px] font-semibold text-[#111111] leading-snug">
                  {meta.duration}
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-white border border-[#e4e4e7] hover:border-[#15803d]/40 transition-colors shadow-2xs flex flex-col justify-between gap-2.5 sm:col-span-2 lg:col-span-1 xl:col-span-1">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#71717a]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" />
                  <span>Team</span>
                </div>
                <div className="text-[13px] sm:text-[14px] font-medium text-[#111111] leading-snug">
                  {meta.team}
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-white border border-[#e4e4e7] hover:border-[#15803d]/40 transition-colors shadow-2xs flex flex-col justify-between gap-2.5 sm:col-span-2 lg:col-span-2 xl:col-span-1">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#71717a]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" />
                  <span>Scope</span>
                </div>
                <div className="text-[13px] sm:text-[14px] font-medium text-[#111111] leading-snug">
                  {meta.scope}
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-white border border-[#e4e4e7] hover:border-[#15803d]/40 transition-colors shadow-2xs flex flex-col justify-between gap-2.5 sm:col-span-2 lg:col-span-1 xl:col-span-1">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#71717a]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" />
                  <span>Tools</span>
                </div>
                <div className="text-[13px] sm:text-[14px] font-medium text-[#111111] leading-snug">
                  {meta.tools}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Gallery & Showcase */}
        <div className="py-12 sm:py-16 space-y-6">
          {!isCustomLayout && project.id !== 'pixelvault-crypto' && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[12px]">
              <div className="flex items-center gap-2 text-[#71717a]">
                <span className="uppercase font-semibold text-[#111111]">Interactive Showcase</span>
                <span>—</span>
                <span className="text-[#15803d]">View 0{activeImageIdx + 1} of 0{projectImages.length}</span>
              </div>

              {project.metrics && (
                <div className="inline-flex items-center gap-2 bg-[#f0fdf4] border border-[#bbf7d0] px-3 py-1 text-[#15803d] font-semibold text-[11px] sm:text-[12px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Impact: {project.metrics}</span>
                </div>
              )}
            </div>
          )}

          {/* Big Featured Stage */}
          <div className={`relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden border border-[#e4e4e7] ${
            project.id === 'ceylo-tourism' || project.id.includes('ceylo')
              ? 'bg-[#10B981]'
              : project.id === 'ugc-website-redesign' || project.id.includes('ugc')
              ? 'bg-[#9193A3]'
              : 'bg-[#18181b]'
          } shadow-md group`}>
            <img
              key={activeImageIdx}
              src={projectImages[activeImageIdx]}
              alt={`${project.title} - View ${activeImageIdx + 1}`}
              className={`w-full h-full ${
                project.id === 'ceylo-tourism' || project.id.includes('ceylo')
                  ? 'object-contain scale-[0.88]'
                  : project.id === 'ugc-website-redesign' || project.id.includes('ugc')
                  ? 'object-cover scale-[0.99]'
                  : 'object-cover'
              } object-center transition-all duration-300`}
              referrerPolicy="no-referrer"
            />

            {/* Prev / Next Navigation Arrows */}
            {projectImages.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImageIdx((prev) =>
                      prev > 0 ? prev - 1 : projectImages.length - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/65 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={() =>
                    setActiveImageIdx((prev) =>
                      prev < projectImages.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/65 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Viewfinder Corner Accents */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/60 pointer-events-none" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/60 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/60 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/60 pointer-events-none" />

            {/* Bottom Info Ribbon inside stage */}
            {!isCustomLayout && project.id !== 'pixelvault-crypto' && (
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-black/75 backdrop-blur-md border border-white/15 px-3 sm:px-4 py-1.5 font-mono text-[11px] text-white/90">
                [ 0{activeImageIdx + 1} // 0{projectImages.length} ] • {project.title}{' '}
                {project.id === 'ugc-website-redesign' || project.id.includes('ugc')
                  ? '— Frame 50: UGC Website Redesign'
                  : 'Product Interface'}
              </div>
            )}
          </div>

          {/* Thumbnails Strip */}
          {projectImages.length > 1 && (
            <div
              className={`grid gap-3 sm:gap-4 font-mono text-[11px] ${
                projectImages.length === 2
                  ? 'grid-cols-2 max-w-2xl'
                  : projectImages.length === 3
                  ? 'grid-cols-3 max-w-3xl'
                  : projectImages.length === 4
                  ? 'grid-cols-2 sm:grid-cols-4'
                  : projectImages.length === 6
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6'
                  : 'grid-cols-2 sm:grid-cols-5'
              }`}
            >
              {projectImages.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative aspect-[16/10] overflow-hidden border transition-all cursor-pointer group text-left ${
                    activeImageIdx === idx
                      ? 'border-[#15803d] ring-2 ring-[#15803d]/40 shadow-xs'
                      : 'border-[#e4e4e7] opacity-75 hover:opacity-100 hover:border-[#a1a1aa]'
                  }`}
                >
                  <img
                    src={thumb}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {!isCustomLayout && (
                    <span
                      className={`absolute bottom-1 right-1 text-[9px] px-1.5 py-0.5 font-mono ${
                        activeImageIdx === idx
                          ? 'bg-[#15803d] text-white font-bold'
                          : 'bg-black/70 text-white'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Case Study Narrative & Deep Dive */}
        <div className="py-12 border-t border-[#e5e7eb] space-y-12">
          {isBrunelly ? (
            <div className="space-y-12">
              {/* The Challenge */}
              <div className="space-y-4 w-full">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
                  01. The Challenge
                </h2>
                <p className="text-base sm:text-lg text-[#52525b] leading-relaxed font-sans">
                  As Brunelly evolved beyond a traditional Scrum tool, the product needed to support increasingly complex workflows, data, and AI-powered capabilities without overwhelming the people using it.
                </p>
                
                <span className="block font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#71717a] mt-6">
                  Work item screen before and after
                </span>
                <div className="mt-2 border border-[#e4e4e7] bg-white overflow-hidden shadow-2xs">
                  <img 
                    src="/images/Frame 9b.svg" 
                    alt="Work item screen before and after" 
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Understanding the Product */}
              <div className="space-y-5 w-full pt-8 border-t border-[#e5e7eb]">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
                  02. Understanding the Product
                </h2>
                <p className="text-base sm:text-lg text-[#52525b] leading-relaxed font-sans mt-2">
                  Before redesigning individual experiences, I looked at Brunelly from multiple perspectives how users experienced the product, how they behaved within it, what stakeholders needed, and how competing products approached similar problems.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#15803d]" />
                      Stakeholder Feedback
                    </h3>
                    <p className="text-[14px] leading-relaxed text-[#52525b] font-sans">
                      Regular discussions with stakeholders helped uncover business priorities, product constraints, and upcoming requirements. This helped ensure that UX improvements addressed both user needs and product goals.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#15803d]" />
                      Competitor Analysis
                    </h3>
                    <p className="text-[14px] leading-relaxed text-[#52525b] font-sans">
                      I analysed competing products to understand common patterns, interaction models, and opportunities for differentiation. Rather than copying existing solutions, I used these insights to evaluate where Brunelly could create a clearer and more efficient experience.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#15803d]" />
                      Beta User Feedback
                    </h3>
                    <p className="text-[14px] leading-relaxed text-[#52525b] font-sans">
                      Feedback from beta users revealed recurring usability issues across the product. Users highlighted areas where workflows were unclear, particularly around onboarding and understanding what to do next.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#15803d]" />
                      Behavioural Insights
                    </h3>
                    <p className="text-[14px] leading-relaxed text-[#52525b] font-sans">
                      Clarity helped me go beyond what users said by observing what they actually did. Session recordings and heatmaps helped identify interaction patterns, friction points, and areas where users struggled to navigate or engage with key experiences.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mapping the Experience */}
              <div className="space-y-5 w-full pt-8 border-t border-[#e5e7eb]">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
                  03. Mapping the Experience
                </h2>
                <p className="text-base sm:text-lg text-[#52525b] leading-relaxed font-sans mt-2">
                  Based on the insights gathered from beta users, Clarity, stakeholders, and competitor analysis, I mapped key user journeys and workflows to understand how users moved through Brunelly. This helped identify unnecessary steps, unclear interactions, and opportunities to simplify the overall experience.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#15803d]" />
                      User Journeys
                    </h3>
                    <p className="text-[14px] leading-relaxed text-[#52525b] font-sans">
                      Mapped the end-to-end experience across key product areas to identify user goals, pain points, and opportunities for improvement.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#15803d]" />
                      User Flows
                    </h3>
                    <p className="text-[14px] leading-relaxed text-[#52525b] font-sans">
                      Created and refined flows for key tasks to establish clearer paths and reduce friction before moving into interface design.
                    </p>
                  </div>
                </div>
              </div>

              {/* Design Exploration */}
              <div className="space-y-5 w-full pt-8 border-t border-[#e5e7eb]">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
                  04. Design Exploration
                </h2>
                <p className="text-base sm:text-lg text-[#52525b] leading-relaxed font-sans mt-2">
                  The design process evolved alongside Brunelly. In the early stages, we followed a more traditional UX process—research, user flows, wireframes, high-fidelity designs, prototyping, and validation. As the product became more complex and the need for faster iteration increased, I introduced a more rapid approach to exploration and validation.
                </p>

                <div className="space-y-4 bg-[#f8fafc] border border-[#e2e8f0] p-6 sm:p-8 mt-6">
                  <h3 className="text-lg font-bold text-[#111111]">
                    From Traditional to Rapid
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#52525b] font-sans">
                    Instead of waiting until the end of the design cycle to validate ideas, I moved toward rapid prototyping and continuous validation. Concepts could be explored, tested, refined, and moved closer to implementation much faster.
                  </p>

                  <div className="space-y-6 pt-4">
                    {/* Early Process */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#71717a] font-semibold">
                        Early Process
                      </div>
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[12px]">
                        {["Research", "Flows", "Wireframes", "UI", "Prototype", "Validation"].map((step, idx) => (
                          <div key={step} className="flex items-center gap-2">
                            <span className="bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0] px-2.5 py-1 rounded-sm">
                              {step}
                            </span>
                            {idx < 5 && <span className="text-[#94a3b8] font-sans">→</span>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Evolved Process */}
                    <div className="space-y-2 pt-2 border-t border-[#e2e8f0]">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#15803d] font-semibold">
                        Evolved Process
                      </div>
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[12px]">
                        {["Insight", "Rapid Prototype", "Validate", "Refine", "Build", "Learn", "Iterate"].map((step, idx) => (
                          <div key={step} className="flex items-center gap-2">
                            <span className="bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0] px-2.5 py-1 rounded-sm font-semibold">
                              {step}
                            </span>
                            {idx < 6 && <span className="text-[#86efac] font-sans">→</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[15px] leading-relaxed text-[#52525b] font-sans pt-4">
                  This shift allowed me to test ideas earlier, reduce unnecessary design iterations, and collaborate more closely with development. I also experimented with HTML-based prototypes as development-ready design specifications, using AI-assisted tools to accelerate the transition from concept to working experience.
                </p>

                {/* Building the Design System - Sub-section under 04 */}
                <div className="pt-8 border-t border-dashed border-[#e2e8f0] space-y-4">
                  <h3 className="text-xl font-bold text-[#111111] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#15803d]" />
                    Building the Design System
                  </h3>
                  <p className="text-base sm:text-lg text-[#52525b] leading-relaxed font-sans mt-2">
                    As Brunelly expanded, maintaining consistency across new features and complex workflows became increasingly important. I developed a token-based design system with structured Foundations and reusable Components to create a consistent visual language across the platform.
                  </p>
                  <p className="text-[14px] leading-relaxed text-[#52525b] font-sans">
                    The system covered core foundations such as typography, colour, spacing, layout, and design tokens, which were then translated into reusable components and patterns.
                  </p>

                  {/* Frame 9c - Design System Visual Showcase */}
                  <div className="mt-6 border border-[#e2e8f0] bg-white p-2 rounded-sm overflow-hidden shadow-2xs">
                    <img 
                      src="/images/Frame 9c.svg" 
                      alt="Brunelly Design System Foundations & Token System" 
                      className="w-full h-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* High-Fidelity Design, Prototyping & Testing - Sub-section under 04 */}
                <div className="pt-8 border-t border-dashed border-[#e2e8f0] space-y-4">
                  <h3 className="text-xl font-bold text-[#111111] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#15803d]" />
                    High-Fidelity Design, Prototyping & Testing
                  </h3>
                  <p className="text-base sm:text-lg text-[#52525b] leading-relaxed font-sans mt-2">
                    Once the direction was established, I translated the concepts into high-fidelity interfaces and interactive prototypes. Prototyping became an important part of validating not only the visual design, but also navigation, interactions, hierarchy, and overall usability.
                  </p>
                  <p className="text-[14px] leading-relaxed text-[#52525b] font-sans">
                    I used prototypes to simulate realistic product scenarios and gather feedback before moving designs further toward implementation.
                  </p>

                  <div className="space-y-4 bg-[#f8fafc] border border-[#e2e8f0] p-6 sm:p-8 mt-6">
                    <h4 className="text-lg font-bold text-[#111111]">
                      From screens to experiences
                    </h4>
                    <p className="text-[14px] leading-relaxed text-[#52525b] font-sans">
                      Rather than validating individual screens in isolation, I connected key interfaces into realistic flows so users could experience the product as they would in the real world.
                    </p>

                    <div className="flex flex-wrap items-center gap-2 font-mono text-[12px] pt-2">
                      {["High-Fidelity UI", "Interactive Prototype", "User Testing", "Feedback & Insights", "Refinement"].map((step, idx) => (
                        <div key={step} className="flex items-center gap-2">
                          <span className="bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0] px-2.5 py-1 rounded-sm font-semibold">
                            {step}
                          </span>
                          {idx < 4 && <span className="text-[#86efac] font-sans">→</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-[14px] leading-relaxed text-[#52525b] font-sans pt-2">
                    This iterative approach helped identify usability issues earlier and allowed design decisions to be refined before development.
                  </p>
                </div>

                {/* Evolving into an AI-Augmented Workflow - Sub-section under 04 */}
                <div className="pt-8 border-t border-dashed border-[#e2e8f0] space-y-4">
                  <h3 className="text-xl font-bold text-[#111111] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#15803d]" />
                    Evolving into an AI-Augmented Workflow
                  </h3>
                  <p className="text-base sm:text-lg text-[#52525b] leading-relaxed font-sans mt-2">
                    My design workflow evolved significantly throughout the development of Brunelly.
                  </p>

                  <div className="space-y-6 bg-[#f8fafc] border border-[#e2e8f0] p-6 sm:p-8 mt-6">
                    {/* Initially - Figma */}
                    <div className="space-y-2">
                      <h4 className="text-md font-bold text-[#111111]">
                        Initially — Figma
                      </h4>
                      <p className="text-[14px] leading-relaxed text-[#52525b] font-sans">
                        The process started with a traditional Figma-first workflow, where ideation, wireframing, high-fidelity design, and prototyping were primarily handled within Figma.
                      </p>
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[12px] pt-1">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#71717a] font-semibold mr-2">Figma:</span>
                        {["Ideation", "Wireframes", "UI", "Prototype"].map((step, idx) => (
                          <div key={step} className="flex items-center gap-2">
                            <span className="bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0] px-2.5 py-1 rounded-sm">
                              {step}
                            </span>
                            {idx < 3 && <span className="text-[#94a3b8] font-sans">→</span>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Then - Figma + UX Pilot */}
                    <div className="space-y-2 pt-4 border-t border-[#e2e8f0]">
                      <h4 className="text-md font-bold text-[#111111]">
                        Then — Figma + UX Pilot
                      </h4>
                      <p className="text-[14px] leading-relaxed text-[#52525b] font-sans">
                        As AI-assisted design became part of my workflow, I started using UX Pilot alongside Figma to accelerate ideation and explore different interface directions before committing to a design.
                      </p>
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[12px] pt-1">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#0369a1] font-semibold mr-2">UX Pilot + Figma:</span>
                        {["Explore", "Generate directions", "Refine", "Design"].map((step, idx) => (
                          <div key={step} className="flex items-center gap-2">
                            <span className="bg-[#f0f9ff] text-[#0369a1] border border-[#bae6fd] px-2.5 py-1 rounded-sm font-semibold">
                              {step}
                            </span>
                            {idx < 3 && <span className="text-[#7dd3fc] font-sans">→</span>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Now - Rapid AI Prototyping */}
                    <div className="space-y-2 pt-4 border-t border-[#e2e8f0]">
                      <h4 className="text-md font-bold text-[#15803d]">
                        Now — Rapid AI Prototyping
                      </h4>
                      <p className="text-[14px] leading-relaxed text-[#52525b] font-sans">
                        The workflow evolved further with Lovable, UX Pilot, and Claude, allowing me to move rapidly from an idea to something interactive and testable.
                      </p>
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[12px] pt-1">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#15803d] font-semibold mr-2">Workflow:</span>
                        {["Idea", "UX Exploration", "Rapid Prototype", "Validate", "Refine"].map((step, idx) => (
                          <div key={step} className="flex items-center gap-2">
                            <span className="bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0] px-2.5 py-1 rounded-sm font-semibold">
                              {step}
                            </span>
                            {idx < 4 && <span className="text-[#86efac] font-sans">→</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-[14px] leading-relaxed text-[#52525b] font-sans pt-2">
                    Instead of spending significant time creating every interaction manually before testing an idea, I can quickly turn concepts into working prototypes, evaluate them, and iterate.
                  </p>
                </div>
              </div>

              {/* Design Development, Handover */}
              <div className="space-y-5 w-full pt-8 border-t border-[#e5e7eb]">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
                  05. Design Development, Handover
                </h2>
                <p className="text-base sm:text-lg text-[#52525b] leading-relaxed font-sans mt-2">
                  With a basic technical understanding of HTML, CSS, JavaScript, I work closely with development to make sure the final implementation stays true to the intended experience.
                </p>

                <div className="pt-6 border-t border-dashed border-[#e2e8f0] space-y-4">
                  <h3 className="text-xl font-bold text-[#111111] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#15803d]" />
                    Beyond the traditional handoff
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#52525b] font-sans">
                    In later stages, Instead of relying only on static Figma screens, I experimented with HTML-based prototypes as development-ready design specifications. This allowed interactions, layouts, states, and responsive behaviour to be communicated more directly to developers.
                  </p>
                </div>
              </div>

              {/* What I Learned */}
              <div className="space-y-5 w-full pt-8 border-t border-[#e5e7eb]">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
                  06. What I Learned
                </h2>
                <p className="text-base sm:text-lg font-bold text-[#111111] leading-relaxed font-sans mt-2">
                  Designing the system, not just the screen.
                </p>
                <p className="text-[15px] leading-relaxed text-[#52525b] font-sans">
                  Working on Brunelly taught me that complex SaaS products aren't solved by individual screens. The real challenge is creating a consistent system that allows users to move between workflows, understand complex information, and adopt new capabilities without increasing cognitive load.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  <div className="bg-[#f8fafc] border border-[#e2e8f0] p-6 space-y-3">
                    <span className="font-mono text-[24px] font-bold text-[#15803d]">01</span>
                    <h4 className="text-sm font-bold text-[#111111] leading-snug">
                      Complex products need strong information architecture.
                    </h4>
                  </div>

                  <div className="bg-[#f8fafc] border border-[#e2e8f0] p-6 space-y-3">
                    <span className="font-mono text-[24px] font-bold text-[#15803d]">02</span>
                    <h4 className="text-sm font-bold text-[#111111] leading-snug">
                      Design systems become increasingly important as product scope grows.
                    </h4>
                  </div>

                  <div className="bg-[#f8fafc] border border-[#e2e8f0] p-6 space-y-3">
                    <span className="font-mono text-[24px] font-bold text-[#15803d]">03</span>
                    <h4 className="text-sm font-bold text-[#111111] leading-snug">
                      AI is most useful when integrated into existing workflows—not added as a layer on top.
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ) : isCeylo ? (
            <div className="space-y-16">
              {/* 01 — Understanding the Challenge */}
              <div className="space-y-6 w-full">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
                    01. Understanding the Challenge
                  </h2>
                </div>

                <p className="text-base sm:text-lg text-[#3f3f46] leading-relaxed font-sans font-light">
                  Sri Lanka offers a wide range of local and community-led experiences, but tourists can often find it difficult to discover authentic experiences beyond conventional tourism platforms.
                </p>

                <p className="text-base sm:text-lg text-[#3f3f46] leading-relaxed font-sans font-light">
                  The challenge was to explore a digital solution that connects foreign tourists with local vendors and communities, while encouraging sustainable tourism and creating fair opportunities for local businesses.
                </p>

                <div className="bg-[#fafafa] border border-[#e5e7eb] p-6 sm:p-8 space-y-3">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#71717a] font-bold">
                    The Challenge
                  </div>
                  <p className="text-base text-[#111111] leading-relaxed font-sans font-medium">
                    How might we make it easier for tourists to discover authentic local experiences while creating meaningful opportunities for Sri Lankan communities?
                  </p>
                </div>
              </div>

              {/* 02 — Research & Insights */}
              <div className="space-y-8 w-full pt-12 border-t border-[#e5e7eb]">
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
                    02. Research & Insights
                  </h2>
                  <p className="text-base sm:text-lg text-[#3f3f46] leading-relaxed font-sans font-light">
                    As this was a hypothetical design competition challenge, our research focused on secondary research and existing traveller conversations.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-mono text-[11px] sm:text-[12px] uppercase tracking-wider text-[#71717a] font-bold">
                    We Explored
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Facebook travel groups and discussions from tourists visiting Sri Lanka",
                      "Existing travel and local-service platforms",
                      "Traveller reviews and feedback",
                      "Sustainable tourism platforms from around the world",
                      "Common patterns in travel discovery and booking experiences"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-white border border-[#e4e4e7] shadow-3xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#15803d] mt-2 shrink-0" />
                        <span className="text-[14px] text-[#27272a] font-sans leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 pt-6">
                  <h3 className="font-mono text-[11px] sm:text-[12px] uppercase tracking-wider text-[#71717a] font-bold">
                    Key Insights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Authenticity",
                        desc: "Travellers were interested in experiences that felt local and less commercial."
                      },
                      {
                        title: "Discoverability",
                        desc: "Many local experiences and vendors can be difficult to discover through conventional travel platforms."
                      },
                      {
                        title: "Trust",
                        desc: "Clear information, reviews, and transparent service details are important when choosing local experiences."
                      },
                      {
                        title: "Sustainability",
                        desc: "A platform should encourage responsible tourism while ensuring local communities benefit from tourist activity."
                      }
                    ].map((insight, idx) => (
                      <div key={idx} className="p-5 bg-white border border-[#e4e4e7] hover:border-[#15803d]/40 transition-colors shadow-2xs flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#15803d] shrink-0" />
                          <h4 className="text-[16px] font-bold text-[#111111] leading-snug">
                            {insight.title}
                          </h4>
                        </div>
                        <p className="text-[14px] text-[#52525b] font-sans leading-relaxed pl-3.5">
                          {insight.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-base text-[#52525b] leading-relaxed font-sans font-light italic pt-4">
                  These insights helped shape the core experience and features we explored for Ceylo.
                </p>
              </div>

              {/* 03 — Ideation & Wireframing */}
              <div className="space-y-8 w-full pt-12 border-t border-[#e5e7eb]">
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
                    03. Ideation & Wireframing
                  </h2>
                  <p className="text-base sm:text-lg text-[#3f3f46] leading-relaxed font-sans font-light">
                    Using our research insights, we collaboratively explored different ways to connect tourists with local experiences.
                  </p>
                  <p className="text-base sm:text-lg text-[#3f3f46] leading-relaxed font-sans font-light">
                    We started with low-fidelity wireframes to establish the information architecture and understand how the different parts of the platform could work together.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-mono text-[11px] sm:text-[12px] uppercase tracking-wider text-[#71717a] font-bold">
                    Our Focus Was On
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: "Simplifying Discovery", text: "Removing layers of menus to make finding authentic local tours immediate." },
                      { title: "Reducing Steps", text: "Streamlining registration and confirmation paths down to the essentials." },
                      { title: "Vendor Discoverability", text: "Providing direct spotlight placements for micro-vendors and remote communities." },
                      { title: "Omnichannel Consistency", text: "Creating an absolute visual bridge between web planner and mobile companion apps." },
                      { title: "Storytelling", text: "Connecting exploration reviews, direct booking routes, and visual community stories." }
                    ].map((focus, idx) => (
                      <div key={idx} className="p-5 bg-[#fafafa] border border-[#e5e7eb] space-y-2">
                        <div className="font-mono text-[11px] text-[#15803d] font-bold">0{idx + 1}</div>
                        <h4 className="text-[15px] font-bold text-[#111111]">{focus.title}</h4>
                        <p className="text-[13px] text-[#71717a] leading-relaxed font-sans">{focus.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#fafafa] border border-[#e5e7eb] p-1.5 overflow-hidden shadow-xs">
                      <img 
                        src="/images/Ceylo/Frame 32b.png" 
                        alt="Ceylo Wireframe" 
                        className="w-full h-auto object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="bg-[#fafafa] border border-[#e5e7eb] p-1.5 overflow-hidden shadow-xs">
                      <img 
                        src="/images/Ceylo/Frame 32c.png" 
                        alt="Ceylo Wireframe" 
                        className="w-full h-auto object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* 04 — Prototyping & Iteration */}
              <div className="space-y-8 w-full pt-12 border-t border-[#e5e7eb]">
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
                    04. Prototyping & Iteration
                  </h2>
                  <p className="text-base sm:text-lg text-[#3f3f46] leading-relaxed font-sans font-light">
                    Developing prototypes for Ceylo involved several iterations to address the unique challenges of integrating multiple features. We used Figma to create interactive prototypes, simulating user interactions with the interactive map, booking platform, accommodation finder, and storytelling hub. User testing sessions provided valuable feedback, which we used to refine the design.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-mono text-[11px] sm:text-[12px] uppercase tracking-wider text-[#71717a] font-bold">
                    Key Flows Refined
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      "Navigating on landing page",
                      "onboarding",
                      "surf through user feed",
                      "read blog post",
                      "view services provided by vendors"
                    ].map((flow, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-white border border-[#e4e4e7] shadow-3xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#15803d] shrink-0" />
                        <span className="text-[13.5px] text-[#27272a] font-sans font-medium">{flow}</span>
                      </div>
                    ))}
                  </div>
                </div>



                <p className="text-base text-[#52525b] leading-relaxed font-sans font-light italic pt-4">
                  The iterative process helped us simplify the experience and ensure the different features worked together as one consistent journey.
                </p>
              </div>

              {/* 05 — Final Design and Handoff */}
              <div className="space-y-8 w-full pt-12 border-t border-[#e5e7eb]">
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
                    05. Final Design and Handoff
                  </h2>
                  <p className="text-base sm:text-lg text-[#3f3f46] leading-relaxed font-sans font-light">
                    After multiple iterations and incorporating feedback, we finalized the Ceylo design. The final product features a clean, user-friendly interface that connects tourists with authentic Sri Lankan experiences while promoting sustainable tourism and supporting local communities.
                  </p>
                  <p className="text-base sm:text-lg text-[#3f3f46] leading-relaxed font-sans font-light">
                    The final designs were organized and prepared for handoff, with the key screens, interactions, and user flows documented to ensure a clear transition from concept to implementation.
                  </p>
                </div>

                <div className="pt-4 space-y-6">
                  <div className="bg-[#fafafa] border border-[#e5e7eb] p-1.5 overflow-hidden shadow-sm max-w-5xl mx-auto">
                    <img 
                      src="/images/Ceylo/Frame 32e.jpg" 
                      alt="Ceylo Final Design Showcase" 
                      className="w-full h-auto object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="bg-[#fafafa] border border-[#e5e7eb] p-1.5 overflow-hidden shadow-sm max-w-5xl mx-auto">
                    <img 
                      src="/images/Frame 32f.png" 
                      alt="Ceylo User Journey and Handoff Specifications" 
                      className="w-full h-auto object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : isMindfulness ? (
            <MindfulnessCaseStudy />
          ) : isPixelVault ? (
            <PixelVaultCaseStudy />
          ) : isOneStop ? (
            <OneStopCaseStudy />
          ) : isUgc ? (
            <UgcCaseStudy />
          ) : isWellnessGrocer ? (
            <WellnessGrocerCaseStudy />
          ) : isMathru ? (
            <MathruCaseStudy />
          ) : (
            /* Challenge & Solution 2-Col Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
              <div className="space-y-4 bg-white p-6 sm:p-8 border border-[#e5e7eb] shadow-2xs">
                <div className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-[#dc2626] font-semibold">
                  <span>[ 01 // The Problem ]</span>
                </div>
                <h3 className="text-2xl font-bold text-[#111111]">
                  The Strategic Challenge
                </h3>
                <p className="text-[15px] leading-relaxed text-[#52525b] font-sans">
                  {project.details.challenge}
                </p>
              </div>

              <div className="space-y-4 bg-white p-6 sm:p-8 border border-[#e5e7eb] shadow-2xs">
                <div className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-[#15803d] font-semibold">
                  <span>[ 02 // The Execution ]</span>
                </div>
                <h3 className="text-2xl font-bold text-[#111111]">
                  The UX & System Solution
                </h3>
                <p className="text-[15px] leading-relaxed text-[#52525b] font-sans">
                  {project.details.solution}
                </p>
              </div>
            </div>
          )}

          {/* Deliverables Section */}
          {!isCustomLayout && (
            <div className="bg-[#f8fafc] border border-[#e2e8f0] p-6 sm:p-10 space-y-6">
              <div className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-[#111111] font-semibold">
                <Layers className="w-4 h-4 text-[#15803d]" />
                <span>Sprint Deliverables & Design Tokens</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-[12px]">
                {project.details.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-[#e2e8f0] p-4 flex items-start gap-3 shadow-2xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#a1a1aa] block text-[10px]">OUTPUT 0{idx + 1}</span>
                      <span className="text-[#18181b] font-medium">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Client Testimonial / Quote */}
          {!isCustomLayout && project.quote && (
            <div className="border-l-4 border-[#15803d] bg-white p-6 sm:p-10 border-y border-r border-[#e5e7eb] space-y-4 shadow-2xs">
              <p className="text-xl sm:text-2xl italic text-[#18181b] font-light leading-relaxed">
                "{project.quote.text}"
              </p>
              <div className="pt-2 font-mono text-[12px]">
                <span className="text-[#111111] font-bold">{project.quote.author}</span>
                <span className="text-[#71717a] ml-2">— {project.quote.role}</span>
              </div>
            </div>
          )}

          {/* CTA Banner */}
          {!isCustomLayout && (
            <div className="p-8 sm:p-12 bg-[#18181b] text-white flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#22c55e]">
                  Looking for similar results?
                </span>
                <h4 className="text-2xl sm:text-3xl font-bold">
                  Let’s turn your product idea into a better experience.
                </h4>
                <p className="text-sm text-[#a1a1aa] max-w-xl">
                  Open to exciting product design opportunities, collaborations, and projects where thoughtful UX, strong UI, and AI-augmented workflows can make a real impact.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenContact}
                  className="px-6 py-3 bg-[#15803d] hover:bg-[#16a34a] text-white font-mono text-[12px] uppercase font-semibold transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>Contact Me</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Bottom Previous / Next Project Navigation Bar */}
          <div className="pt-8 border-t border-[#e5e7eb] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[12px]">
            {!isBrunelly ? (
              <button
                onClick={() => onSelectProject(prevProject)}
                className="group w-full sm:w-auto p-4 border border-[#e4e4e7] bg-white hover:border-[#15803d] text-[#71717a] hover:text-[#111111] transition-all cursor-pointer flex items-center justify-between sm:justify-start gap-4"
              >
                <span className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#15803d]" />
                  <span>Previous Project</span>
                </span>
                <span className="font-semibold text-[#111111]">{prevProject.title}</span>
              </button>
            ) : (
              <div className="hidden sm:block w-full sm:w-auto" />
            )}

            <button
              onClick={onBackToWorks}
              className="font-mono text-[11px] uppercase text-[#71717a] hover:text-[#111111] px-4 py-2 border border-transparent hover:border-[#d4d4d8] transition-colors cursor-pointer"
            >
              [ View All 8 Works ]
            </button>

            <button
              onClick={() => onSelectProject(nextProject)}
              className="group w-full sm:w-auto p-4 border border-[#e4e4e7] bg-white hover:border-[#15803d] text-[#71717a] hover:text-[#111111] transition-all cursor-pointer flex items-center justify-between sm:justify-start gap-4"
            >
              <span className="font-semibold text-[#111111]">{nextProject.title}</span>
              <span className="flex items-center gap-2">
                <span>Next Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#15803d]" />
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function PixelVaultCaseStudy() {
  return (
    <div className="space-y-16">
      {/* 01 — Problem Statement */}
      <div className="space-y-6 w-full">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
          01. Problem Statement
        </h2>
        <div className="bg-white border border-[#e5e7eb] p-6 sm:p-10 shadow-3xs space-y-4">
          <p className="text-base sm:text-lg text-[#3f3f46] leading-relaxed font-sans font-light">
            PixelVault, a new marketplace for NFTs, sought to create a sleek and intuitive dashboard that allows users to discover, collect, and sell NFTs with zero gas fees.
          </p>
          <p className="text-[#52525b] leading-relaxed text-[15px] font-sans">
            The challenge was to design a dashboard that provides users with quick access to critical information, such as their portfolio balance, top coins, and recent activity, while also promoting trending NFTs and top artists. The design needed to be visually appealing while maintaining usability for both novice and experienced users in the crypto space.
          </p>
        </div>
      </div>

      {/* 02 — Objectives and Goals */}
      <div className="space-y-6 w-full pt-12 border-t border-[#e5e7eb]">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
          02. Objectives and Goals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-4 shadow-3xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-[24px] font-bold text-[#15803d]">01</span>
              <h4 className="text-base font-bold text-[#111111] leading-snug mt-2">
                Visually Engaging Experience
              </h4>
              <p className="text-[14px] leading-relaxed text-[#52525b] font-sans mt-2">
                Create a visually engaging and easy-to-navigate interface that showcases trending NFTs, top artists, and key account information.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-4 shadow-3xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-[24px] font-bold text-[#15803d]">02</span>
              <h4 className="text-base font-bold text-[#111111] leading-snug mt-2">
                Digestible Data Streams
              </h4>
              <p className="text-[14px] leading-relaxed text-[#52525b] font-sans mt-2">
                Highlight essential crypto information, such as balance, top coins, and recent activity, in a clear and digestible format.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-4 shadow-3xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-[24px] font-bold text-[#15803d]">03</span>
              <h4 className="text-base font-bold text-[#111111] leading-snug mt-2">
                Enhanced Engagement USP
              </h4>
              <p className="text-[14px] leading-relaxed text-[#52525b] font-sans mt-2">
                Enhance user engagement by promoting the platform's unique selling proposition (zero gas fees) and making it easy for users to explore and buy NFTs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 03 — Design Thinking Process */}
      <div className="space-y-8 w-full pt-12 border-t border-[#e5e7eb]">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
          03. Design Thinking Process
        </h2>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">1</span>
              Understanding the Challenge
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              Pixel Vault aimed to establish a unique NFT marketplace with zero gas fees, targeting both crypto enthusiasts and new users entering the world of NFTs. The primary challenge was to design an intuitive dashboard that could display complex financial and portfolio data in a simplified and visually appealing manner. The design needed to strike a balance between showcasing trending NFTs and managing essential user account information, such as wallet balances and recent transactions.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-3 pt-6 border-t border-dashed border-[#e4e4e7]">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">2</span>
              Research and Insights
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              I conducted research on leading NFT and crypto platforms, such as OpenSea and Rarible, as well as well-known crypto dashboards like Binance and Coinbase. By analyzing their interfaces, I gained insights into how they present complex information in a simplified way.
            </p>
            <div className="pl-7 pt-2">
              <div className="bg-[#fafafa] border border-[#e5e7eb] p-1.5 overflow-hidden shadow-xs max-w-4xl">
                <img 
                  src="/images/Frame 41c.png" 
                  alt="Research and Competitor Insights Analysis" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-3 pt-6 border-t border-dashed border-[#e4e4e7]">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">3</span>
              Wireframing and Ideation
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              In the wireframing stage, I focused on creating a streamlined layout that organizes key features such as the user’s portfolio, trending NFTs, and recent activities in a logical and accessible manner. The left-hand menu bar was designed for quick navigation to core sections like collections, bids, and favorites, while the main content area highlighted trending NFTs and user portfolio data.
            </p>
            <div className="pl-7 pt-2">
              <div className="bg-[#fafafa] border border-[#e5e7eb] p-1.5 overflow-hidden shadow-xs max-w-4xl">
                <img 
                  src="/images/Frame 41b.png" 
                  alt="Wireframing and Ideation Concepts" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-3 pt-6 border-t border-dashed border-[#e4e4e7]">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">4</span>
              Final UIs and Prototyping
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              In the prototyping stage, I translated the wireframes into high-fidelity prototypes using Figma. The prototypes were designed to be fully interactive, allowing users to navigate through the homepage as they would in a live environment.
            </p>
            <div className="pl-7 pt-2 space-y-6">
              <div className="bg-[#fafafa] border border-[#e5e7eb] p-1.5 overflow-hidden shadow-xs max-w-4xl">
                <img 
                  src="/images/Frame 30t.png" 
                  alt="PixelVault High-Fidelity Interface Blueprint" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="bg-[#fafafa] border border-[#e5e7eb] p-1.5 overflow-hidden shadow-xs max-w-4xl">
                <img 
                  src="/images/Frame 30r.png" 
                  alt="PixelVault Interactive Asset and Market Streams" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OneStopCaseStudy() {
  return (
    <div className="space-y-16">
      {/* 01 — Problem Statement */}
      <div className="space-y-6 w-full">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
          01. Problem Statement
        </h2>
        <div className="bg-white border border-[#e5e7eb] p-6 sm:p-10 shadow-3xs space-y-4">
          <p className="text-base sm:text-lg text-[#3f3f46] leading-relaxed font-sans font-light">
            "OneStop," an online retail store with over 100+ products across various categories, needed a visually appealing and user-friendly homepage.
          </p>
          <p className="text-[#52525b] leading-relaxed text-[15px] font-sans">
            The homepage would serve as the first point of contact for customers, guiding them effortlessly through product categories and making it easy to browse and add items to their cart. The key challenge was to design a clean user flow that effectively showcases the diverse range of products.
          </p>
        </div>
      </div>

      {/* 02 — Objectives and Goals */}
      <div className="space-y-6 w-full pt-12 border-t border-[#e5e7eb]">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
          02. Objectives and Goals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-3 shadow-3xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-[24px] font-bold text-[#15803d]">01</span>
              <h4 className="text-base font-bold text-[#111111] leading-snug mt-1">
                Aesthetic Simplicity
              </h4>
              <p className="text-[14px] leading-relaxed text-[#52525b] font-sans mt-2">
                Design a visually appealing homepage that captures users' attention while maintaining simplicity and ease of navigation.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-3 shadow-3xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-[24px] font-bold text-[#15803d]">02</span>
              <h4 className="text-base font-bold text-[#111111] leading-snug mt-1">
                Promote Top Sellers
              </h4>
              <p className="text-[14px] leading-relaxed text-[#52525b] font-sans mt-2">
                Highlight top-selling products and categories prominently to drive user engagement and boost sales.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-3 shadow-3xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-[24px] font-bold text-[#15803d]">03</span>
              <h4 className="text-base font-bold text-[#111111] leading-snug mt-1">
                Connected Interactions
              </h4>
              <p className="text-[14px] leading-relaxed text-[#52525b] font-sans mt-2">
                Incorporate essential features such as a search bar, navigation menu, social media links, and a newsletter sign-up form for better user interaction and brand connectivity.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-3 shadow-3xs flex flex-col justify-between md:col-span-1">
            <div>
              <span className="font-mono text-[24px] font-bold text-[#15803d]">04</span>
              <h4 className="text-base font-bold text-[#111111] leading-snug mt-1">
                Product Hierarchy
              </h4>
              <p className="text-[14px] leading-relaxed text-[#52525b] font-sans mt-2">
                Improve user experience by providing a clean, structured layout with a clear product hierarchy and straightforward user flow.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-3 shadow-3xs flex flex-col justify-between md:col-span-2">
            <div>
              <span className="font-mono text-[24px] font-bold text-[#15803d]">05</span>
              <h4 className="text-base font-bold text-[#111111] leading-snug mt-1">
                Strategic Placement & Visibility
              </h4>
              <p className="text-[14px] leading-relaxed text-[#52525b] font-sans mt-2">
                Increase product visibility through the strategic placement of best-sellers and key product categories across desktop and mobile form factors.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 03 — Design Thinking Process */}
      <div className="space-y-8 w-full pt-12 border-t border-[#e5e7eb]">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
          03. Design Thinking Process
        </h2>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">1</span>
              Understanding the Challenge
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              OneStop, a growing online retail store, aimed to enhance its digital presence by creating a seamless shopping experience for its diverse customer base. The primary challenge was to design an engaging homepage that effectively showcases over 100+ products across various categories, such as electronics and health & beauty. My task focused on creating a homepage that balances aesthetic appeal with functionality, ensuring an intuitive user flow that allows customers to easily browse, search, and add products to their cart. Additionally, I selected matching brand colors and theme to create a cohesive visual identity that resonates with the target audience.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-3 pt-6 border-t border-dashed border-[#e4e4e7]">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">2</span>
              Research and Insights
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              I conducted thorough research on leading e-commerce platforms like Amazon, eBay, and Wayfair to gain insights into effective homepage designs and user flows. By analyzing these platforms, I identified best practices for showcasing diverse product categories, simplifying navigation, and enhancing the overall user experience. This research helped me integrate proven design elements, such as intuitive filtering options and prominent product displays, while also incorporating innovative features to improve user engagement and ease of use.
            </p>
            <div className="pl-7 pt-2">
              <div className="bg-[#fafafa] border border-[#e5e7eb] p-1.5 overflow-hidden shadow-xs max-w-4xl">
                <img 
                  src="/images/Frame 51b.png" 
                  alt="OneStop Competitor Benchmarking and Interface Analysis" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-3 pt-6 border-t border-dashed border-[#e4e4e7]">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">3</span>
              Wireframing and Ideation
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              During the wireframing and ideation phase, I developed initial wireframes focusing on a clean, user-friendly interface that could efficiently showcase OneStop's diverse product range. The goal was to create a seamless navigation experience that allows users to easily browse through multiple categories, locate popular items, and quickly access essential features like the search bar, shopping cart, and product highlights.
            </p>
            <div className="pl-7 pt-2">
              <div className="bg-[#fafafa] border border-[#e5e7eb] p-1.5 overflow-hidden shadow-xs max-w-4xl">
                <img 
                  src="/images/Frame 51c.png" 
                  alt="OneStop Wireframing and Information Flow Concepts" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-3 pt-6 border-t border-dashed border-[#e4e4e7]">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">4</span>
              Final UIs and Prototyping
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              In the prototyping stage, I translated the wireframes into high-fidelity prototypes using Figma. The prototypes were designed to be fully interactive, allowing users to navigate through the homepage as they would in a live environment.
            </p>
            <div className="pl-7 pt-2">
              <div className="bg-[#fafafa] border border-[#e5e7eb] p-1.5 overflow-hidden shadow-xs max-w-4xl">
                <img 
                  src="/images/Frame 51e.png" 
                  alt="OneStop Final High-Fidelity UI Screens" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UgcCaseStudy() {
  return (
    <div className="space-y-16">
      {/* 01 — Problem Statement */}
      <div className="space-y-6 w-full">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
          01. Problem Statement
        </h2>
        <div className="bg-white border border-[#e5e7eb] p-6 sm:p-10 shadow-3xs space-y-4">
          <p className="text-base sm:text-lg text-[#3f3f46] leading-relaxed font-sans font-light">
            The University Grants Commission (UGC) website was outdated and challenging to navigate, causing frustration among its diverse user base, which includes students, educators, and administrative staff.
          </p>
          <p className="text-[#52525b] leading-relaxed text-[15px] font-sans">
            The existing design lacked a modern aesthetic, was not user-friendly, and did not meet current accessibility standards. It became a friction point for critical institutional workflows and academic communications.
          </p>
        </div>
      </div>

      {/* Current Website Section */}
      <div className="space-y-4 w-full pt-6 border-t border-[#e5e7eb]">
        <h3 className="text-xl font-bold tracking-tight text-[#111111]">
          Current Website
        </h3>
        <div className="bg-[#fafafa] border border-[#e5e7eb] p-1.5 overflow-hidden shadow-xs max-w-4xl">
          <img 
            src="/images/Frame 61a.png" 
            alt="Current UGC Website Layout and Issues" 
            className="w-full h-auto object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* 02 — Objectives and Goals */}
      <div className="space-y-6 w-full pt-12 border-t border-[#e5e7eb]">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
          02. Objectives and Goals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-3 shadow-3xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-[24px] font-bold text-[#15803d]">01</span>
              <h4 className="text-base font-bold text-[#111111] leading-snug mt-1">
                User-Friendly Navigation
              </h4>
              <p className="text-[14px] leading-relaxed text-[#52525b] font-sans mt-2">
                Simplify the website structure for easy, intuitive access to information across all user demographics.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-3 shadow-3xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-[24px] font-bold text-[#15803d]">02</span>
              <h4 className="text-base font-bold text-[#111111] leading-snug mt-1">
                Modern Design
              </h4>
              <p className="text-[14px] leading-relaxed text-[#52525b] font-sans mt-2">
                Update the visual design and typography to reflect a contemporary, clean, and highly professional look.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-3 shadow-3xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-[24px] font-bold text-[#15803d]">03</span>
              <h4 className="text-base font-bold text-[#111111] leading-snug mt-1">
                Accessibility
              </h4>
              <p className="text-[14px] leading-relaxed text-[#52525b] font-sans mt-2">
                Ensure the website strictly complies with modern accessibility standards (WCAG) to support all users.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-3 shadow-3xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-[24px] font-bold text-[#15803d]">04</span>
              <h4 className="text-base font-bold text-[#111111] leading-snug mt-1">
                Enhanced Functionality
              </h4>
              <p className="text-[14px] leading-relaxed text-[#52525b] font-sans mt-2">
                Introduce streamlined utility tools and search structures to serve students, educators, and administrators.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 03 — Design Thinking Process */}
      <div className="space-y-8 w-full pt-12 border-t border-[#e5e7eb]">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
          03. Design Thinking Process
        </h2>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">1</span>
              Understanding the Challenge
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              The existing UGC (University Grants Commission) website was outdated, difficult to navigate, and lacked essential features for its users, including students, educators, and administrative staff. Our team was tasked with redesigning the website to improve usability, accessibility, and user satisfaction across all primary and secondary user flows.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-3 pt-6 border-t border-dashed border-[#e4e4e7]">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">2</span>
              Research and Insights
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              Our team conducted extensive analysis of the current website’s analytics. We identified key pain points such as difficult navigation, outdated design, and lack of accessibility features. Competitor analysis provided insights into best practices and innovative solutions for major academic and educational portal architectures.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-3 pt-6 border-t border-dashed border-[#e4e4e7]">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">3</span>
              Wireframing and Ideation
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              Based on our research, we sketched initial wireframes to visualize the new website structure. Our goal was to create an intuitive layout that organized information logically and made key features easily accessible. We focused on minimizing the number of clicks needed to reach important sections and ensuring absolute visual consistency across all key responsive views.
            </p>
            <div className="pl-7 mt-4">
              <div className="bg-[#fafafa] border border-[#e5e7eb] p-1.5 overflow-hidden shadow-xs max-w-4xl">
                <img 
                  src="/images/Frame 61b.png" 
                  alt="UGC Redesign Wireframes and Ideation" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-3 pt-6 border-t border-dashed border-[#e4e4e7]">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">4</span>
              Prototyping
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              Using Figma, we developed interactive prototypes to simulate the new design and functionality. Prototyping allowed us to test various design concepts and gather user feedback. We conducted multiple user testing sessions to identify and resolve usability issues, ensuring that the final design met user needs and expectations.
            </p>
          </div>

          {/* Step 5 */}
          <div className="space-y-3 pt-6 border-t border-dashed border-[#e4e4e7]">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">5</span>
              Final Design and Handoff
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              After several iterations, we finalized the design, incorporating user feedback and ensuring alignment with UGC’s branding guidelines. The new design featured a clean, modern interface with improved navigation, enhanced accessibility, and additional functionalities like a search bar and accessibility feature.
            </p>
            <div className="pl-7 mt-4">
              <div className="bg-[#fafafa] border border-[#e5e7eb] p-1.5 overflow-hidden shadow-xs max-w-4xl">
                <img 
                  src="/images/Frame 61c.png" 
                  alt="UGC Redesign Final Design and Handoff" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WellnessGrocerCaseStudy() {
  return (
    <div className="space-y-16">
      {/* 01 — Problem Statement */}
      <div className="space-y-6 w-full">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
          01. Problem Statement
        </h2>
        <div className="bg-white border border-[#e5e7eb] p-6 sm:p-10 shadow-3xs space-y-4">
          <p className="text-base sm:text-lg text-[#3f3f46] leading-relaxed font-sans font-light">
            In today's busy world, professionals aged 25-45 struggle to manage their health due to limited time and high work commitments. Grocery shopping, meal planning, and health often take a backseat.
          </p>
          <p className="text-[#52525b] leading-relaxed text-[15px] font-sans">
            WellnessGrocer addresses this by integrating grocery shopping with personalized wellness experiences in a user-friendly platform, leveraging Apple's Vision Pro for an immersive and interactive experience.
          </p>
        </div>
      </div>

      {/* 02 — Objectives and Goals */}
      <div className="space-y-6 w-full pt-12 border-t border-[#e5e7eb]">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
          02. Objectives and Goals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-3 shadow-3xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-[24px] font-bold text-[#10b981]">01</span>
              <h4 className="text-base font-bold text-[#111111] leading-snug mt-1">
                Convenience
              </h4>
              <p className="text-[14px] leading-relaxed text-[#52525b] font-sans mt-2">
                Simplify grocery shopping and meal planning for busy professionals through automated curation.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-3 shadow-3xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-[24px] font-bold text-[#10b981]">02</span>
              <h4 className="text-base font-bold text-[#111111] leading-snug mt-1">
                Personalization
              </h4>
              <p className="text-[14px] leading-relaxed text-[#52525b] font-sans mt-2">
                Provide tailored health and wellness recommendations based on individual needs and preferences.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-3 shadow-3xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-[24px] font-bold text-[#10b981]">03</span>
              <h4 className="text-base font-bold text-[#111111] leading-snug mt-1">
                Health Management
              </h4>
              <p className="text-[14px] leading-relaxed text-[#52525b] font-sans mt-2">
                Offer tools for tracking fitness, nutrition, sleep, and stress to promote overall well-being.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-3 shadow-3xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-[24px] font-bold text-[#10b981]">04</span>
              <h4 className="text-base font-bold text-[#111111] leading-snug mt-1">
                User Engagement
              </h4>
              <p className="text-[14px] leading-relaxed text-[#52525b] font-sans mt-2">
                Create an immersive, interactive user experience using spatial XR concepts and Apple's visionOS guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Challenges Section */}
      <div className="space-y-6 w-full pt-12 border-t border-[#e5e7eb]">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
          Core Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#fafafa] border border-[#e5e7eb] p-6 flex gap-4 items-start">
            <span className="w-6 h-6 rounded-full bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shrink-0 font-mono text-[11px] font-bold">!</span>
            <div>
              <h4 className="text-sm font-bold text-[#111111]">Integrating XR into Practical App Flows</h4>
              <p className="text-[13px] text-[#52525b] leading-relaxed font-sans mt-1">
                Moving complex mixed reality (XR) paradigms into real daily utilities like checkout pathways, calorie metrics, and cart updates.
              </p>
            </div>
          </div>

          <div className="bg-[#fafafa] border border-[#e5e7eb] p-6 flex gap-4 items-start">
            <span className="w-6 h-6 rounded-full bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shrink-0 font-mono text-[11px] font-bold">!</span>
            <div>
              <h4 className="text-sm font-bold text-[#111111]">Ensuring Intuitive and Spatial Engagement</h4>
              <p className="text-[13px] text-[#52525b] leading-relaxed font-sans mt-1">
                Ensuring eye-gaze selections and subtle gestures are immediately intuitive and do not introduce physical fatigue during long spatial sessions.
              </p>
            </div>
          </div>

          <div className="bg-[#fafafa] border border-[#e5e7eb] p-6 flex gap-4 items-start">
            <span className="w-6 h-6 rounded-full bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shrink-0 font-mono text-[11px] font-bold">!</span>
            <div>
              <h4 className="text-sm font-bold text-[#111111]">Multi-Source Data Aggregation</h4>
              <p className="text-[13px] text-[#52525b] leading-relaxed font-sans mt-1">
                Merging real-time fitness metrics (sleep, activity, stress) with live transactional grocery catalogs and automated pantry inventories.
              </p>
            </div>
          </div>

          <div className="bg-[#fafafa] border border-[#e5e7eb] p-6 flex gap-4 items-start">
            <span className="w-6 h-6 rounded-full bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shrink-0 font-mono text-[11px] font-bold">!</span>
            <div>
              <h4 className="text-sm font-bold text-[#111111]">Technical Prototyping Constraints</h4>
              <p className="text-[13px] text-[#52525b] leading-relaxed font-sans mt-1">
                Overcoming spatial fidelity limitations in classical flat-screen prototyping tools (like Figma) to mimic immersive spatial fields and depths.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 03 — Design Thinking Process */}
      <div className="space-y-8 w-full pt-12 border-t border-[#e5e7eb]">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
          03. Design Thinking Process
        </h2>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">1</span>
              Understanding the Challenge
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              In today’s busy world, professionals aged 25-45 struggle to balance work commitments and personal health management. Our team identified the need for a seamless integration of grocery shopping and wellness management, aiming to create an intuitive platform that utilizes Apple's Vision Pro to deliver an immersive, spatial user experience.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-3 pt-6 border-t border-dashed border-[#e4e4e7]">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">2</span>
              Research and Insights
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              Our team conducted extensive user research to identify the needs and pain points of our target audience. We analyzed competitor solutions and gathered user feedback to inform our design decisions. Key insights included the critical need for simplicity, deep nutrition personalization, and a holistic approach to tracking activity alongside daily meal planning.
            </p>
          </div>

          {/* User Persona */}
          <div className="pl-7 pt-2">
            <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-4 max-w-4xl shadow-3xs">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f4f4f5] flex items-center justify-center text-lg font-bold text-[#71717a] font-mono border border-[#e4e4e7]">
                  SP
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#111111]">Sarah Patel — The Busy High-Performer</h4>
                  <p className="text-xs text-[#71717a] font-mono">34 Years Old · Senior Product Manager · London</p>
                </div>
              </div>
              <div className="border-t border-dashed border-[#e4e4e7] pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-sans">
                <div>
                  <h5 className="font-bold text-[#111111] text-xs uppercase tracking-wider mb-1">Frustrations & Needs</h5>
                  <p className="text-[13px] text-[#52525b] leading-relaxed font-light">
                    Sarah wants to eat healthy and plan nutritious dinners, but spends 10+ hours a day in meetings. Manual food logging is too time-consuming, and she often defaults to unhealthy delivery apps.
                  </p>
                </div>
                <div>
                  <h5 className="font-bold text-[#111111] text-xs uppercase tracking-wider mb-1">Desired Spatial Solution</h5>
                  <p className="text-[13px] text-[#52525b] leading-relaxed font-light">
                    An intuitive spatial canvas where she can glance at high-fidelity 3D food items, select meal prep kits in seconds, and have wellness diagnostics automatically update her pantry cart.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-3 pt-6 border-t border-dashed border-[#e4e4e7]">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">3</span>
              Wireframing and Ideation
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              Armed with our research, we collaboratively sketched initial wireframes. Our objective was to design a straightforward and engaging user interface that integrates grocery shopping with wellness features. We focused on minimizing steps, keeping spatial focal areas clean, and ensuring ease of navigation across active gaze parameters.
            </p>
          </div>

          {/* Step 4 */}
          <div className="space-y-3 pt-6 border-t border-dashed border-[#e4e4e7]">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">4</span>
              Prototyping
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              Prototyping for an XR UI presented unique challenges due to the complexity of designing immersive interactions. Using Figma, we developed interactive prototypes to simulate the user experience. These prototypes allowed us to conduct user testing sessions, gather feedback, and iteratively improve the design despite the technical difficulties inherent in XR prototyping.
            </p>
          </div>

          {/* Step 5 */}
          <div className="space-y-3 pt-6 border-t border-dashed border-[#e4e4e7]">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">5</span>
              Final Design and Handoff
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              After multiple iterations and refinements, we finalized the design. The result was a clean, user-friendly interface that integrates grocery shopping with personalized wellness experiences inside a cohesive visionOS spatial ecosystem, complete with transparent material properties and spec handoffs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MathruCaseStudy() {
  return (
    <div className="space-y-16">
      {/* 01 — Problem Statement */}
      <div className="space-y-6 w-full">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
          01. Problem Statement
        </h2>
        <div className="bg-white border border-[#e5e7eb] p-6 sm:p-10 shadow-3xs space-y-4">
          <p className="text-base sm:text-lg text-[#3f3f46] leading-relaxed font-sans font-light">
            Expectant mothers in Sri Lanka face unique challenges during their pregnancy journey due to the lack of a culturally tailored, comprehensive pregnancy tracking app.
          </p>
          <p className="text-[#52525b] leading-relaxed text-[15px] font-sans">
            Existing global pregnancy apps fail to address the specific needs, local clinical pathways, and language preferences of Sri Lankan mothers, leading to difficulties in accessing reliable, relevant, and culturally supportive maternal care resources.
          </p>
        </div>
      </div>

      {/* 02 — Objectives and Goals */}
      <div className="space-y-6 w-full pt-12 border-t border-[#e5e7eb]">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
          02. Objectives and Goals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pregnancy Tracker */}
          <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-3 shadow-3xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-[24px] font-bold text-[#ec4899]">01</span>
              <h4 className="text-base font-bold text-[#111111] leading-snug mt-1">
                Pregnancy Tracker
              </h4>
              <p className="text-[14px] leading-relaxed text-[#52525b] font-sans mt-2">
                Log symptoms, weight, height, and movement with notes. Track clinical check-up dates, trigger local reminders, and store doctor prescriptions securely.
              </p>
            </div>
          </div>

          {/* Wellbeing */}
          <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-3 shadow-3xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-[24px] font-bold text-[#ec4899]">02</span>
              <h4 className="text-base font-bold text-[#111111] leading-snug mt-1">
                Wellbeing Core
              </h4>
              <p className="text-[14px] leading-relaxed text-[#52525b] font-sans mt-2">
                Access guided prenatal yoga routines tailored by trimester and relax with carefully compiled calming audio/meditation guides.
              </p>
            </div>
          </div>

          {/* Community */}
          <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-3 shadow-3xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-[24px] font-bold text-[#ec4899]">03</span>
              <h4 className="text-base font-bold text-[#111111] leading-snug mt-1">
                Community Forum
              </h4>
              <p className="text-[14px] leading-relaxed text-[#52525b] font-sans mt-2">
                Connect with other expectant mothers and verified professionals in a safe forum. Access localized medical FAQs in Sinhala, Tamil, and English.
              </p>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-white border border-[#e4e4e7] p-6 sm:p-8 space-y-3 shadow-3xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-[24px] font-bold text-[#ec4899]">04</span>
              <h4 className="text-base font-bold text-[#111111] leading-snug mt-1">
                Emergency Hotline
              </h4>
              <p className="text-[14px] leading-relaxed text-[#52525b] font-sans mt-2">
                Call a local maternity ambulance with a single tap, notify emergency contacts automatically, and ensure core safety features work offline.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 03 — Design Thinking Process */}
      <div className="space-y-8 w-full pt-12 border-t border-[#e5e7eb]">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
          03. Design Thinking Process
        </h2>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">1</span>
              Understanding the Challenge
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              Promoting sustainable and community tourism in Sri Lanka requires a solution that connects foreign tourists with authentic local experiences offered by Sri Lankan communities. The challenge was to design a web and mobile-compatible application that facilitates this connection while promoting eco-friendly practices and ensuring fair compensation for local vendors.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-3 pt-6 border-t border-dashed border-[#e4e4e7]">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">2</span>
              Research and Insights
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              Our team conducted thorough research on the needs and preferences of expectant mothers in Sri Lanka. We gathered insights through interviews with healthcare professionals, obstetricians, and community leaders. We analyzed successful maternal health apps worldwide to identify best practices and innovative features to incorporate into Mathru.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-3 pt-6 border-t border-dashed border-[#e4e4e7]">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">3</span>
              Wireframing and Ideation
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              Using our research insights, we collaboratively sketched initial wireframes for Mathru. Our focus was on creating an intuitive user interface that seamlessly integrates the app's various features. We aimed to minimize the number of steps required to access key functionalities and ensure a consistent design across different screens.
            </p>
          </div>

          {/* Low-Fidelity UI Placeholder */}
          <div className="pl-7 pt-2">
            <div className="bg-[#fafafa] border border-[#e5e7eb] p-8 sm:p-12 text-center space-y-4 max-w-4xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="max-w-md mx-auto space-y-3 relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink-50 border border-pink-200 text-pink-600 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-[#111111]">Low-Fidelity Mobile UI Wireframes</h4>
                <p className="text-xs text-[#52525b] leading-relaxed font-sans">
                  The initial interactive blueprints focused on accessibility, large tap targets, high contrast, and simplified user pathways for stress-free tracking in emergency modes.
                </p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-3 pt-6 border-t border-dashed border-[#e4e4e7]">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">4</span>
              Prototyping
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              Developing prototypes for Mathru involved several iterations to address the unique challenges of designing for expectant mothers. We used Figma to create interactive prototypes, simulating user interactions with the pregnancy tracker, meal planner, wellbeing features, and community forum. User testing sessions provided valuable feedback, which we used to refine the design.
            </p>
          </div>

          {/* Step 5 */}
          <div className="space-y-3 pt-6 border-t border-dashed border-[#e4e4e7]">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold">5</span>
              Final Design and Handoff
            </h3>
            <p className="text-[15px] text-[#52525b] leading-relaxed font-sans font-light pl-7">
              After multiple iterations and incorporating user feedback, we finalized the design for Mathru. The final product features a clean, user-friendly interface that supports expectant mothers with personalized and culturally relevant information and tools. Comprehensive documentation and guidelines were created to ensure a smooth handoff to the development team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
