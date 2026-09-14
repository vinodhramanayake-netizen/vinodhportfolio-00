import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
  allProjects: Project[];
}

export default function ProjectDetailModal({
  project,
  onClose,
  onSelectProject,
  allProjects,
}: ProjectDetailModalProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    setActiveImageIdx(0);
  }, [project?.id]);

  if (!project) return null;

  const projectImages: string[] =
    project.images && project.images.length > 0
      ? project.images
      : [project.image];

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const isBrunelly = project.id === 'brunelly';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-8 bg-black/50 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl min-h-screen sm:min-h-0 bg-white border border-[#e4e4e7] my-auto overflow-hidden text-left shadow-2xl"
        >
          {/* Top Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur border-b border-[#e5e7eb]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#15803d] font-semibold">
                Case Study // {project.category}
              </span>
            </div>

            <button
              id="close-case-study-btn"
              onClick={onClose}
              className="font-mono text-[12px] uppercase px-3 py-1 border border-[#e4e4e7] hover:border-[#111111] text-[#71717a] hover:text-[#111111] transition-colors cursor-pointer bg-white"
            >
              Close [✕]
            </button>
          </div>

          <div className="p-6 sm:p-10 space-y-10">
            {/* Title & One-liner */}
            <div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111]">
                {project.title}
              </h2>
              {project.tagline && (
                <p className="mt-3 text-lg sm:text-xl text-[#15803d] font-medium w-full">
                  {project.tagline}
                </p>
              )}
              <p className="mt-3 font-mono text-[13px] text-[#52525b] w-full leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* 5-Image Interactive Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#e4e4e7] bg-[#18181b] group">
                <img
                  key={activeImageIdx}
                  src={projectImages[activeImageIdx]}
                  alt={`${project.title} - View ${activeImageIdx + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  referrerPolicy="no-referrer"
                />

                {/* Prev / Next Arrows */}
                <button
                  onClick={() =>
                    setActiveImageIdx((prev) =>
                      prev > 0 ? prev - 1 : projectImages.length - 1
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() =>
                    setActiveImageIdx((prev) =>
                      prev < projectImages.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Active View Badge */}
                {!isBrunelly && (
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] px-3 py-1">
                    VIEW 0{activeImageIdx + 1} / 0{projectImages.length}
                  </div>
                )}

                {project.metrics && !isBrunelly && (
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur border border-[#e4e4e7] px-4 py-2 font-mono text-[11px] sm:text-[12px] text-[#15803d] font-semibold shadow-xs">
                    [ Metric ]: {project.metrics}
                  </div>
                )}
              </div>

              {/* Thumbnails Strip */}
              <div
                className={`grid gap-2 sm:gap-3 font-mono text-[11px] ${
                  projectImages.length === 2
                    ? 'grid-cols-2 max-w-sm'
                    : projectImages.length === 3
                    ? 'grid-cols-3 max-w-md'
                    : projectImages.length === 4
                    ? 'grid-cols-4'
                    : projectImages.length === 6
                    ? 'grid-cols-3 sm:grid-cols-6'
                    : 'grid-cols-5'
                }`}
              >
                {projectImages.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative aspect-[16/10] overflow-hidden border transition-all cursor-pointer ${
                      activeImageIdx === idx
                        ? 'border-[#15803d] ring-2 ring-[#15803d]/30'
                        : 'border-[#e4e4e7] opacity-60 hover:opacity-100 hover:border-[#a1a1aa]'
                    }`}
                  >
                    <img
                      src={thumb}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {!isBrunelly && (
                      <span
                        className={`absolute bottom-1 right-1 text-[9px] px-1 py-0.2 font-mono ${
                          activeImageIdx === idx
                            ? 'bg-[#15803d] text-white'
                            : 'bg-black/60 text-white'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Metadata Grid */}
            {!isBrunelly && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-[#e5e7eb] font-mono text-[12px]">
                <div>
                  <span className="text-[#71717a] block uppercase tracking-wider">Client</span>
                  <span className="text-[#18181b] font-medium mt-1 block">{project.client}</span>
                </div>
                <div>
                  <span className="text-[#71717a] block uppercase tracking-wider">Timeline</span>
                  <span className="text-[#18181b] font-medium mt-1 block">14-Day Sprint</span>
                </div>
                <div>
                  <span className="text-[#71717a] block uppercase tracking-wider">Category</span>
                  <span className="text-[#18181b] font-medium mt-1 block">{project.category}</span>
                </div>
                <div>
                  <span className="text-[#71717a] block uppercase tracking-wider">Scope</span>
                  <span className="text-[#18181b] font-medium mt-1 block">{project.scope.join(', ')}</span>
                </div>
              </div>
            )}

            {/* Deep Dive Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[14px] leading-relaxed text-[#52525b]">
              <div className="space-y-3">
                <h3 className="font-mono text-[12px] uppercase text-[#111111] font-semibold tracking-wider">
                  The Strategic Challenge
                </h3>
                <p>{project.details.challenge}</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-mono text-[12px] uppercase text-[#111111] font-semibold tracking-wider">
                  The Identity Solution
                </h3>
                <p>{project.details.solution}</p>
              </div>
            </div>

            {/* Deliverables List */}
            <div className="bg-[#f8fafc] border border-[#e2e8f0] p-6 space-y-4">
              <h3 className="font-mono text-[12px] uppercase tracking-wider text-[#111111] font-semibold">
                Sprint Deliverables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[12px] text-[#15803d]">
                {project.details.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-[#71717a]">[{String(idx + 1).padStart(2, '0')}]</span>
                    <span className="text-[#18181b] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Quote if available */}
            {project.quote && (
              <div className="border-l-2 border-[#15803d] pl-6 py-2">
                <p className="text-base sm:text-lg italic text-[#18181b] font-light">
                  "{project.quote.text}"
                </p>
                <div className="mt-3 font-mono text-[12px]">
                  <span className="text-[#111111] font-medium">{project.quote.author}</span>
                  <span className="text-[#71717a] ml-2">/ {project.quote.role}</span>
                </div>
              </div>
            )}

            {/* Next / Previous Project Navigation */}
            <div className="pt-6 border-t border-[#e5e7eb] flex items-center justify-between font-mono text-[12px]">
              <button
                onClick={() => onSelectProject(prevProject)}
                className="group text-[#71717a] hover:text-[#111111] transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>←</span>
                <span>Previous: {prevProject.title}</span>
              </button>

              <button
                onClick={() => onSelectProject(nextProject)}
                className="group text-[#71717a] hover:text-[#111111] transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Next: {nextProject.title}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
