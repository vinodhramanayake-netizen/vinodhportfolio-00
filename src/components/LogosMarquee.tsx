import { PartnerLogo } from '../types';

interface LogosMarqueeProps {
  logos: PartnerLogo[];
}

export default function LogosMarquee({ logos }: LogosMarqueeProps) {
  // Duplicate logos for smooth infinite marquee
  const extendedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="w-full py-12 sm:py-16 border-y border-[#e5e7eb] bg-[#f4f4f5] overflow-hidden select-none">
      <div className="max-w-[1500px] mx-auto px-4 mb-8 text-center sm:text-left">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#71717a]">
          [ TRUSTED BY FOUNDERS & OPERATORS WORLDWIDE ]
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex shrink-0 items-center gap-12 sm:gap-16 animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
          {extendedLogos.map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="h-9 sm:h-11 w-32 sm:w-40 flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex-shrink-0"
              title={logo.name}
            >
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
