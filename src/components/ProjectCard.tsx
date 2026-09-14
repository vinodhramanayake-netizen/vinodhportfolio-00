import { useState, useRef, MouseEvent, TouchEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  key?: string | number;
  project: Project;
  index: number;
  total: number;
  onSelectProject: (p: Project) => void;
  isFocusMode?: boolean;
  isGridMode?: boolean;
  disableImageChange?: boolean;
}

export default function ProjectCard({
  project,
  index,
  total,
  onSelectProject,
  isFocusMode = false,
  isGridMode = false,
  disableImageChange = false,
}: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Dynamic images array:
  // - On landing page (!disableImageChange): up to 5 images for interactive horizontal scrubbing
  // - On works page (disableImageChange): single static cover image with no image cycling
  const projectImages: string[] = disableImageChange
    ? [project.image]
    : project.images && project.images.length > 0
    ? project.images.slice(0, 5)
    : [project.image];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pxX = e.clientX - rect.left;
    const pxY = e.clientY - rect.top;

    // Normalized from -1 to 1 for subtle 3D tilt
    const normX = (pxX / rect.width) * 2 - 1;
    const normY = (pxY / rect.height) * 2 - 1;

    // Subtle tilt: max 2.8 degrees
    setTilt({
      x: -normY * 2.5,
      y: normX * 2.8,
    });

    if (!disableImageChange && projectImages.length > 1) {
      // Horizontal navigation between the 5 images
      const horizontalFraction = Math.max(0, Math.min(0.9999, pxX / rect.width));
      const newIndex = Math.floor(horizontalFraction * projectImages.length);
      setActiveImageIndex(newIndex);
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    if (disableImageChange || projectImages.length <= 1) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const pxX = touch.clientX - rect.left;
    const horizontalFraction = Math.max(0, Math.min(0.9999, pxX / rect.width));
    const newIndex = Math.floor(horizontalFraction * projectImages.length);
    setActiveImageIndex(newIndex);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setActiveImageIndex(0);
  };

  const isCeylo = project.id === 'ceylo-tourism' || project.id.includes('ceylo');
  const isUgc = project.id === 'ugc-website-redesign' || project.id.includes('ugc');

  const imageStageElement = (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full overflow-hidden ${
        isCeylo ? 'bg-[#10B981]' : isUgc ? 'bg-[#9193A3]' : 'bg-[#18181b]'
      } border border-[#e4e4e7] transition-all duration-500 ease-out ${
        isGridMode
          ? 'aspect-[16/10]'
          : 'aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10]'
      }`}
      style={{
        perspective: '1200px',
        borderColor: isHovered ? '#15803d' : '#e4e4e7',
        boxShadow: isHovered
          ? '0 24px 54px -12px rgba(21, 128, 61, 0.18), 0 12px 24px -8px rgba(0,0,0,0.06)'
          : '0 4px 20px -2px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Dynamic Tilt Layer */}
      <div
        className="relative w-full h-full will-change-transform"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered
            ? 'transform 0.1s ease-out'
            : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Visual Images with Cross-fade */}
        {projectImages.map((imgSrc, idx) => (
          <img
            key={idx}
            src={imgSrc}
            alt={`${project.title} - View 0${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-200 ease-out ${
              activeImageIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            style={{
              transform: isHovered
                ? isCeylo || isUgc
                  ? `scale(1.02) translate(${tilt.y * -1.5}px, ${tilt.x * 1.5}px)`
                  : `scale(1.04) translate(${tilt.y * -1.5}px, ${tilt.x * 1.5}px)`
                : isCeylo || isUgc
                ? 'scale(0.99) translate(0px, 0px)'
                : 'scale(1) translate(0px, 0px)',
              transition: isHovered
                ? 'opacity 0.2s ease-out, transform 0.1s ease-out'
                : 'opacity 0.3s ease-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            referrerPolicy="no-referrer"
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
        ))}

        {/* Cinematic Vignette */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none transition-opacity duration-500 ${
            isCeylo || isUgc ? 'opacity-30 group-hover:opacity-15' : 'opacity-60 group-hover:opacity-40'
          } z-15`}
        />

        {/* Technical Viewfinder Corner Marks */}
        <div
          className={`absolute top-3 left-3 sm:top-4 sm:left-4 w-3.5 h-3.5 sm:w-4 sm:h-4 border-t-2 border-l-2 transition-all duration-300 pointer-events-none z-20 ${
            isHovered
              ? 'border-[#22c55e] scale-110 translate-x-0.5 translate-y-0.5'
              : 'border-white/40'
          }`}
        />
        <div
          className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-3.5 h-3.5 sm:w-4 sm:h-4 border-t-2 border-r-2 transition-all duration-300 pointer-events-none z-20 ${
            isHovered
              ? 'border-[#22c55e] scale-110 -translate-x-0.5 translate-y-0.5'
              : 'border-white/40'
          }`}
        />
        <div
          className={`absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-3.5 h-3.5 sm:w-4 sm:h-4 border-b-2 border-l-2 transition-all duration-300 pointer-events-none z-20 ${
            isHovered
              ? 'border-[#22c55e] scale-110 translate-x-0.5 -translate-y-0.5'
              : 'border-white/40'
          }`}
        />
        <div
          className={`absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-3.5 h-3.5 sm:w-4 sm:h-4 border-b-2 border-r-2 transition-all duration-300 pointer-events-none z-20 ${
            isHovered
              ? 'border-[#22c55e] scale-110 -translate-x-0.5 -translate-y-0.5'
              : 'border-white/40'
          }`}
        />

        {/* Floating Interactive Action Badge */}
        <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 pointer-events-none z-25">
          <div
            className={`inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider px-3 py-1.5 sm:px-3.5 sm:py-2 border transition-all duration-300 ${
              isHovered
                ? 'bg-[#15803d] border-[#22c55e] text-white shadow-[0_8px_24px_rgba(34,197,94,0.4)]'
                : 'bg-black/65 backdrop-blur-md border-white/20 text-white/90 shadow-sm'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                isHovered ? 'bg-white animate-pulse' : 'bg-[#22c55e]'
              }`}
            />
            <span>Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );

  if (isGridMode) {
    return (
      <motion.article
        id={`project-card-${project.id}`}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full group select-none cursor-pointer flex flex-col justify-between bg-white border border-[#e4e4e7] hover:border-[#15803d] p-5 sm:p-6 transition-all duration-300 shadow-2xs hover:shadow-xl"
        onClick={() => onSelectProject(project)}
      >
        <div className="space-y-4">
          {/* Top Visual Stage */}
          {imageStageElement}

          {/* Metadata Row */}
          <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-[#71717a] pt-1 border-b border-[#f4f4f5] pb-2">
            <span>[ 0{index + 1} // 0{total} ]</span>
          </div>

          {/* Title and Arrow */}
          <div>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] group-hover:text-[#15803d] transition-colors">
                {project.title}
              </h3>
              <ArrowUpRight className="w-5 h-5 text-[#a1a1aa] group-hover:text-[#15803d] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            {project.tagline && (
              <p className="text-[13px] sm:text-[14px] font-medium text-[#27272a] leading-snug mt-1.5">
                "{project.tagline}"
              </p>
            )}
          </div>

          {/* Description */}
          <p className="text-[12px] sm:text-[13px] text-[#52525b] leading-relaxed font-sans w-full">
            {project.description}
          </p>
        </div>

        {/* Card Footer Link */}
        <div className="pt-5 mt-4 border-t border-[#e5e7eb] flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[#15803d] font-semibold group-hover:text-[#16a34a] transition-colors">
          <span>Read Full Case Study</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      id={`project-card-${project.id}`}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full group select-none cursor-pointer ${
        isFocusMode ? 'max-w-[1300px] mx-auto' : 'border-b border-[#e5e7eb] pb-16 sm:pb-24'
      }`}
      onClick={() => onSelectProject(project)}
    >
      {/* 1. Project Editorial Narrative Header (Title, Tagline & Full Length Description) */}
      <div className="mb-6 sm:mb-8 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111111] group-hover:text-[#15803d] transition-colors duration-300">
              {project.title}
            </h3>
            <ArrowUpRight
              className="w-5 h-5 sm:w-6 sm:h-6 text-[#a1a1aa] group-hover:text-[#15803d] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
            />
          </div>

          {project.tagline && (
            <p className="text-[14px] sm:text-[16px] font-medium text-[#27272a] leading-snug">
              "{project.tagline}"
            </p>
          )}
        </div>

        {/* Full Length Description */}
        <p className="w-full text-[13px] sm:text-[15px] text-[#52525b] leading-relaxed font-sans">
          {project.description}
        </p>
      </div>

      {/* 2. Interactive Image Stage */}
      {imageStageElement}
    </motion.article>
  );
}
