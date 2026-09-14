import { useState, useEffect, useRef, MouseEvent } from 'react';

interface ManifestoSectionProps {
  onExploreWork?: () => void;
}

interface SkillItem {
  id: string;
  title: string;
  desc: string;
  offsetClass: string;
  floatClass: string;
}

const SKILLS: SkillItem[] = [
  {
    id: 'design-systems',
    title: 'Design Systems',
    desc: 'Multi-brand design tokens, scalable Figma components & coded UI kits',
    offsetClass: 'self-start max-w-[340px] sm:max-w-[380px] rotate-[-1deg]',
    floatClass: 'skill-float-1',
  },
  {
    id: 'b2b-saas',
    title: 'B2B SaaS',
    desc: 'Data-dense workspaces, enterprise analytics & complex role permissions',
    offsetClass: 'self-end max-w-[320px] sm:max-w-[360px] translate-x-0 sm:translate-x-4 rotate-[1.5deg]',
    floatClass: 'skill-float-2',
  },
  {
    id: 'ai-assisted-design',
    title: 'AI-Assisted Design',
    desc: 'Human-in-the-loop flows, prompt steerability & generative interfaces',
    offsetClass: 'self-start max-w-[330px] sm:max-w-[370px] translate-x-0 sm:translate-x-6 rotate-[-0.6deg]',
    floatClass: 'skill-float-3',
  },
  {
    id: 'complex-workflows',
    title: 'Complex Workflows',
    desc: 'Untangling deep multi-step logic into effortless mental models',
    offsetClass: 'self-end max-w-[310px] sm:max-w-[350px] translate-x-0 sm:-translate-x-2 rotate-[1.2deg]',
    floatClass: 'skill-float-4',
  },
  {
    id: 'micro-interactions',
    title: 'Micro-Interactions',
    desc: 'Fluid state transitions, physics-based tactile motion & crisp haptics',
    offsetClass: 'self-start max-w-[320px] sm:max-w-[360px] translate-x-0 sm:translate-x-2 rotate-[-1.2deg]',
    floatClass: 'skill-float-5',
  },
  {
    id: 'rapid-prototyping',
    title: 'Rapid Prototyping',
    desc: 'Interactive high-fidelity models for immediate team & user feedback',
    offsetClass: 'self-end max-w-[330px] sm:max-w-[370px] translate-x-0 sm:translate-x-6 rotate-[0.8deg]',
    floatClass: 'skill-float-6',
  },
];

export default function ManifestoCookieSection({ onExploreWork }: ManifestoSectionProps) {
  // Active skills triggered by horizontal cursor alignment or direct hover
  const [activeSkills, setActiveSkills] = useState<Record<string, boolean>>({});
  const rafRef = useRef<number | null>(null);
  const isOverJumpRef = useRef(false);

  // Scroll expansion state
  const sectionRef = useRef<HTMLElement | null>(null);
  const [expandProgress, setExpandProgress] = useState(0);
  const lastProgressRef = useRef(0);

  // Horizontal cursor alignment tracking across the entire section
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
    const target = e.target as HTMLElement | null;

    let isCursorOverJump =
      isOverJumpRef.current || Boolean(target && target.closest('[data-jump-button]'));

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!sectionRef.current) return;

      if (!isCursorOverJump) {
        const jumpBtns = sectionRef.current.querySelectorAll<HTMLElement>('[data-jump-button]');
        jumpBtns.forEach((btn) => {
          const bRect = btn.getBoundingClientRect();
          if (
            clientX >= bRect.left - 8 &&
            clientX <= bRect.right + 8 &&
            clientY >= bRect.top - 8 &&
            clientY <= bRect.bottom + 8
          ) {
            isCursorOverJump = true;
          }
        });
      }

      const cards = sectionRef.current.querySelectorAll<HTMLElement>('[data-skill-card="base"]');
      const nextActive: Record<string, boolean> = {};
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const id = card.getAttribute('data-skill-id');
        if (id && clientY >= rect.top && clientY <= rect.bottom) {
          // EXCEPTION: When hovering over the Jump button, do not highlight micro-interactions
          if (isCursorOverJump && id === 'micro-interactions') {
            return;
          }
          nextActive[id] = true;
        }
      });
      setActiveSkills(nextActive);
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setActiveSkills({});
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Scroll tracking: Vertical line appears from the start, then expands horizontally to left & right
  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Section is completely below viewport
      if (rect.top >= windowHeight) {
        if (lastProgressRef.current !== 0) {
          lastProgressRef.current = 0;
          setExpandProgress(0);
        }
        return;
      }

      // Section has scrolled completely above viewport
      if (rect.bottom <= 0) {
        if (lastProgressRef.current !== 1) {
          lastProgressRef.current = 1;
          setExpandProgress(1);
        }
        return;
      }

      const enterThreshold = windowHeight * 0.94;
      if (rect.top > enterThreshold) {
        if (lastProgressRef.current !== 0) {
          lastProgressRef.current = 0;
          setExpandProgress(0);
        }
        return;
      }

      // Expansion phase: expands from center (0 width) to full width (100%)
      const endThreshold = windowHeight * 0.12;
      const span = enterThreshold - endThreshold;

      if (rect.top <= endThreshold) {
        if (lastProgressRef.current !== 1) {
          lastProgressRef.current = 1;
          setExpandProgress(1);
        }
      } else {
        const raw = (enterThreshold - rect.top) / span;
        // Smooth organic easing as it floods outward from the center
        const progress = Math.min(1, Math.max(0, Math.pow(raw, 1.08)));
        if (Math.abs(progress - lastProgressRef.current) > 0.003 || progress === 0 || progress === 1) {
          lastProgressRef.current = progress;
          setExpandProgress(progress);
        }
      }
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
      }
    };

    updateProgress();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  // Half-width expansion percentage from center (0% to 50%)
  const halfWidth = expandProgress * 50;
  const clipLeft = 50 - halfWidth;
  const clipRight = 50 - halfWidth;

  // Reusable content renderer to guarantee seamless 1-to-1 layout between light & black layers
  const renderContent = (isDark: boolean) => (
    <div className="max-w-[1500px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      {/* Left Column: Headline Statement */}
      <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
        <div>
          <h2
            id={isDark ? 'manifesto-tagline-heading-dark' : 'manifesto-tagline-heading'}
            className={`text-[9.5vw] sm:text-[6.8vw] md:text-[5.4vw] lg:text-[4.2vw] xl:text-[4.4vw] font-medium tracking-[-0.03em] leading-[1.08] ${
              isDark ? 'text-[#fafafa]' : 'text-[#111111]'
            }`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            A Designer
            <br />
            Specializing In
            <br />
            <span
              className={`font-normal text-[0.52em] sm:text-[0.56em] md:text-[0.58em] tracking-normal whitespace-nowrap inline-block mt-1 ${
                isDark ? 'text-[#a1a1aa]' : 'text-[#71717a]'
              }`}
            >
              (mostly on weekdays)
            </span>
          </h2>

          {/* [ JUMP ] button */}
          <div className="mt-7 sm:mt-9">
            <button
              id={isDark ? 'manifesto-jump-btn-dark' : 'manifesto-jump-btn'}
              data-jump-button="true"
              onMouseEnter={() => {
                isOverJumpRef.current = true;
                setActiveSkills((prev) => {
                  if (prev['micro-interactions']) {
                    const copy = { ...prev };
                    delete copy['micro-interactions'];
                    return copy;
                  }
                  return prev;
                });
              }}
              onMouseLeave={() => {
                isOverJumpRef.current = false;
              }}
              onClick={onExploreWork}
              className={`group inline-flex items-center gap-2 font-mono text-[11px] sm:text-[13px] md:text-[14px] tracking-[0.2em] uppercase py-2 transition-colors cursor-pointer ${
                isDark
                  ? 'text-[#a1a1aa] hover:text-white'
                  : 'text-[#71717a] hover:text-[#111111]'
              }`}
            >
              <span
                className={`transition-colors ${
                  isDark
                    ? 'text-[#52525b] group-hover:text-[#22c55e]'
                    : 'text-[#a1a1aa] group-hover:text-[#15803d]'
                }`}
              >
                [
              </span>
              <span className="group-hover:tracking-[0.25em] transition-all duration-300">
                JUMP
              </span>
              <span
                className={`transition-colors ${
                  isDark
                    ? 'text-[#52525b] group-hover:text-[#22c55e]'
                    : 'text-[#a1a1aa] group-hover:text-[#15803d]'
                }`}
              >
                ]
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Randomly Placed UX Design Skills with Gray Card Design & Dynamic Green Activation */}
      <div className="lg:col-span-6 xl:col-span-6 flex flex-col space-y-4 sm:space-y-5 py-4">
        {SKILLS.map((skill) => {
          const isActive = Boolean(activeSkills[skill.id]);

          return (
            <div
              key={skill.id}
              className={`w-full ${skill.offsetClass} transition-transform duration-300`}
            >
              <div
                data-skill-card={isDark ? 'dark' : 'base'}
                data-skill-id={skill.id}
                onMouseEnter={() =>
                  setActiveSkills((prev) => ({ ...prev, [skill.id]: true }))
                }
                onMouseLeave={() =>
                  setActiveSkills((prev) => ({ ...prev, [skill.id]: false }))
                }
                className={`${skill.floatClass} w-full p-4 sm:p-5 rounded-none transition-all duration-300 cursor-pointer group ${
                  isDark
                    ? isActive
                      ? 'bg-[#15803d] border border-[#22c55e] shadow-[0_14px_36px_rgba(34,197,94,0.4)] scale-[1.03]'
                      : 'bg-[#1c1c20] border border-[#2e2e34] shadow-[0_12px_32px_rgba(0,0,0,0.55)] hover:bg-[#15803d] hover:border-[#22c55e] hover:shadow-[0_14px_36px_rgba(34,197,94,0.4)] hover:scale-[1.03]'
                    : isActive
                    ? 'bg-[#15803d] border border-[#15803d] shadow-[0_14px_32px_rgba(21,128,61,0.3)] scale-[1.03]'
                    : 'bg-[#f4f4f5] border border-[#e4e4e7] shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:bg-[#15803d] hover:border-[#15803d] hover:shadow-[0_14px_32px_rgba(21,128,61,0.3)] hover:scale-[1.03]'
                }`}
              >
                {/* Skill Title */}
                <h3
                  className={`font-sans font-semibold text-[16px] sm:text-[17px] tracking-tight transition-colors duration-300 ${
                    isActive
                      ? 'text-white'
                      : isDark
                      ? 'text-[#fafafa] group-hover:text-white'
                      : 'text-[#18181b] group-hover:text-white'
                  }`}
                >
                  {skill.title}
                </h3>

                {/* Skill Description */}
                <p
                  className={`font-mono text-[11px] sm:text-[12px] leading-relaxed mt-1 transition-colors duration-300 ${
                    isActive
                      ? 'text-white/95'
                      : isDark
                      ? 'text-[#a1a1aa] group-hover:text-white/95'
                      : 'text-[#52525b] group-hover:text-white/95'
                  }`}
                >
                  {skill.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section
      id="manifesto-section"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90vh] sm:min-h-screen w-full flex flex-col justify-center px-4 sm:px-8 md:px-14 lg:px-20 py-16 sm:py-24 border-t border-[#e5e7eb] overflow-hidden bg-[#fafafa]"
    >
      {/* Synchronized CSS Keyframes for subtle organic floating */}
      <style>{`
        @keyframes subtleFloat1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(0.4deg); }
        }
        @keyframes subtleFloat2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-0.5deg); }
        }
        @keyframes subtleFloat3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(0.4deg); }
        }
        @keyframes subtleFloat4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-0.4deg); }
        }
        @keyframes subtleFloat5 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(0.5deg); }
        }
        @keyframes subtleFloat6 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-9px) rotate(-0.3deg); }
        }
        .skill-float-1 { animation: subtleFloat1 4.4s ease-in-out infinite; }
        .skill-float-2 { animation: subtleFloat2 5.6s ease-in-out infinite; }
        .skill-float-3 { animation: subtleFloat3 4.8s ease-in-out infinite; }
        .skill-float-4 { animation: subtleFloat4 6.2s ease-in-out infinite; }
        .skill-float-5 { animation: subtleFloat5 5.2s ease-in-out infinite; }
        .skill-float-6 { animation: subtleFloat6 5.8s ease-in-out infinite; }
      `}</style>

      {/* BASE LAYER (Light theme: dark text on light canvas with light gray skill cards) */}
      <div className="w-full">
        {renderContent(false)}
      </div>

      {/* 
        EXPANDING BLACK LAYER:
        Expands horizontally from the central vertical line to left and right as the user scrolls,
        eventually coloring the whole section in deep architectural black (#111113).
      */}
      <div
        className="absolute inset-0 w-full h-full flex flex-col justify-center px-4 sm:px-8 md:px-14 lg:px-20 py-16 sm:py-24 bg-[#111113] z-20 overflow-hidden"
        style={{
          clipPath: `inset(0 ${clipRight}% 0 ${clipLeft}%)`,
          WebkitClipPath: `inset(0 ${clipRight}% 0 ${clipLeft}%)`,
          opacity: expandProgress > 0 ? 1 : 0,
          pointerEvents: expandProgress > 0.05 ? 'auto' : 'none',
        }}
        aria-hidden={expandProgress < 0.05}
      >
        {/* Subtle dark ambient depth */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black/40" />
        <div className="relative z-10 w-full">
          {renderContent(true)}
        </div>
      </div>

      {/* 
        EXPANDING LEADING WAVE BOUNDARIES:
        Clean traveling edges without corner dots as the black field expands
      */}
      {expandProgress >= 0.015 && expandProgress < 0.995 && (
        <>
          {/* Left traveling line */}
          <div
            className="absolute top-0 bottom-0 w-[1.5px] bg-[#27272a] pointer-events-none z-30"
            style={{
              left: `${50 - halfWidth}%`,
            }}
          />

          {/* Right traveling line */}
          <div
            className="absolute top-0 bottom-0 w-[1.5px] bg-[#27272a] pointer-events-none z-30"
            style={{
              left: `${50 + halfWidth}%`,
            }}
          />
        </>
      )}
    </section>
  );
}
