import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface AboutPageProps {
  onOpenContact: () => void;
  onNavigateToWorks: () => void;
}

export default function AboutPage({ onOpenContact, onNavigateToWorks }: AboutPageProps) {
  const stats = [
    { value: '03+', label: 'Years in UX & Product Design' },
    { value: '10+', label: 'Products Worked on' },
    { value: '04+', label: 'Companies' },
    { value: 'DESIGN → CODE', label: 'AI-Augmented Workflow' },
  ];

  const dailyTools = [
    { name: 'Figma', logo: '/images/tools/figma.svg' },
    { name: 'FigJam', logo: '/images/tools/figjam.svg' },
    { name: 'Adobe Photoshop', logo: '/images/tools/photoshop.svg' },
    { name: 'Adobe Illustrator', logo: '/images/tools/illustrator.svg' },
    { name: 'Adobe InDesign', logo: '/images/tools/indesign.svg' },
    { name: 'Jira', logo: '/images/tools/jira.svg' },
    { name: 'Framer', logo: '/images/tools/framer.svg' },
    { name: 'Canva', logo: '/images/tools/canva.svg' },
    { name: 'GitHub', logo: '/images/tools/github.svg' },
    { name: 'VS Code', logo: '/images/tools/vscode.svg' },
  ];

  const aiTools = [
    { name: 'Claude', logo: '/images/tools/claude.svg' },
    { name: 'ChatGPT', logo: '/images/tools/chatgpt.svg' },
    { name: 'Claude Design', logo: '/images/tools/claude-design.svg' },
    { name: 'Figma AI / Figma Make', logo: '/images/tools/figma.svg' },
    { name: 'Lovable', logo: '/images/tools/lovable.svg' },
    { name: 'UX Pilot', logo: '/images/tools/uxpilot.svg' },
  ];

  return (
    <div className="w-full bg-[#fafafa] text-[#18181b] min-h-screen pt-20 sm:pt-24 pb-20">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 md:px-14 lg:px-20">
        
        {/* Top Breadcrumb */}
        <div className="py-4 border-b border-[#e5e7eb] flex items-center justify-between gap-4 font-mono text-[12px]">
          <div className="flex items-center gap-3">
            <span className="text-[#15803d] font-semibold">[ ABOUT ME ]</span>
            <span className="text-[#a1a1aa]">•</span>
            <span className="text-[#71717a]">VINODH RAMANAYAKE</span>
          </div>
        </div>

        {/* Hero Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="pt-10 sm:pt-14 pb-12 border-b border-[#e5e7eb] space-y-8"
        >
          {/* Main Content Grid: Title & Narrative in parallel with Profile Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
            {/* Left Column: Title, Quote, and Narrative */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#111111] leading-[1.05]">
                  Designing clear products from complex ideas.
                </h1>
                <p className="text-xl sm:text-2xl text-[#15803d] font-medium leading-relaxed">
                  "I turn complex product challenges into simple, scalable, and purposeful digital experiences."
                </p>
              </div>

              {/* Narrative Paragraphs */}
              <div className="space-y-5 text-base sm:text-lg text-[#52525b] leading-relaxed font-sans pt-2">
                <p>
                  I’m Vinodh, a UX Designer focused on SaaS, AI-powered products, and complex digital experiences. I design end-to-end—from understanding user needs and workflows to creating intuitive interfaces, scalable design systems, and development-ready solutions.
                </p>
                <p>
                  I collaborate closely with product teams and engineers, combining user-centered thinking, visual design, rapid prototyping, and technical knowledge. By integrating AI into my workflow, I move faster from ideas to production while keeping usability and product goals at the core.
                </p>
              </div>
            </div>

            {/* Right Column: Vinodh Profile Image (Parallel with Title, Fully Colored) */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center lg:items-end w-full">
              <div className="w-full max-w-[380px] sm:max-w-[420px] bg-white border border-[#e5e7eb] p-2.5 sm:p-3 shadow-2xs">
                <div className="relative aspect-square w-full overflow-hidden bg-[#f4f4f5] border border-[#f0f0f0]">
                  <img
                    src="/images/profile%20pic/Vinodh.png"
                    alt="Vinodh Ramanayake"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/Vinodh.png';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4 Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#e5e7eb] p-3.5 sm:p-6 text-center space-y-1.5 shadow-2xs flex flex-col justify-center min-h-[110px]"
              >
                <span
                  className={`font-extrabold text-[#15803d] block font-mono tracking-tight leading-none ${
                    stat.value.length > 10
                      ? 'text-[11px] sm:text-sm md:text-base lg:text-lg xl:text-xl'
                      : stat.value.length > 5
                      ? 'text-xs sm:text-lg lg:text-xl xl:text-2xl'
                      : 'text-2xl sm:text-3xl lg:text-4xl'
                  }`}
                >
                  {stat.value}
                </span>
                <span className="font-mono text-[10px] sm:text-[12px] uppercase text-[#71717a] block leading-snug">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tools I Use Every Day */}
        <div className="py-14 border-b border-[#e5e7eb] space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111]">
              Tools I Use Every Day
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5">
            {dailyTools.map((tool, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#e5e7eb] hover:border-[#15803d] p-3.5 sm:p-6 transition-all duration-300 shadow-2xs flex flex-col items-center justify-center text-center gap-2 sm:gap-3.5 group cursor-default"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center p-2 rounded-lg bg-[#f4f4f5]/60 group-hover:bg-[#f0fdf4] transition-colors duration-300">
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="w-6 h-6 sm:w-9 sm:h-9 object-contain group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <span className="font-semibold text-xs sm:text-[15px] text-[#111111] group-hover:text-[#15803d] transition-colors leading-tight">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Tools I Use Every Day */}
        <div className="py-14 border-b border-[#e5e7eb] space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111]">
              AI Tools I Use Every Day
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {aiTools.map((tool, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#e5e7eb] hover:border-[#15803d] p-3.5 sm:p-6 transition-all duration-300 shadow-2xs flex flex-col items-center justify-center text-center gap-2 sm:gap-3.5 group cursor-default"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center p-2 rounded-lg bg-[#f4f4f5]/60 group-hover:bg-[#f0fdf4] transition-colors duration-300">
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="w-6 h-6 sm:w-9 sm:h-9 object-contain group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <span className="font-semibold text-xs sm:text-[15px] text-[#111111] group-hover:text-[#15803d] transition-colors leading-tight">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Booking & Contact Call to Action */}
        <div className="mt-14 p-8 sm:p-12 bg-[#18181b] text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#22c55e]">
              Ready to collaborate?
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold">
              Let’s turn your product idea into a better experience.
            </h3>
            <p className="text-sm sm:text-base text-[#a1a1aa]">
              Open to exciting product design opportunities, collaborations, and projects where thoughtful UX, strong UI, and AI-augmented workflows can make a real impact.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#15803d] hover:bg-[#16a34a] text-white font-mono text-[12px] uppercase font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Contact Me</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToWorks}
              className="w-full sm:w-auto px-6 py-3.5 border border-white/20 hover:border-white text-white font-mono text-[12px] uppercase font-medium transition-colors cursor-pointer text-center"
            >
              <span>View Selected Works</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
