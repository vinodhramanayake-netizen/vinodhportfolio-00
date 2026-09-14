import { useState } from 'react';

interface FlippingTitleProps {
  id?: string;
}

export default function FlippingTitle({ id = 'hero-vinodh-title' }: FlippingTitleProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const verticalSlicesCount = 12;

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* 
        3D Flipping Vertical Slats Container
        - Clean and borderless: no outer outlines, no seams or gaps between slats
        - Responsive typography with ample vertical and horizontal space so the entire name "VINODH" is visible
        - Pure slats wave flip transition triggered on hover or tap
      */}
      <div
        id={id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="relative w-full max-w-[98vw] h-[25vw] min-h-[150px] sm:min-h-[180px] max-h-[480px] cursor-pointer group flex items-center justify-center mx-auto border-none outline-none"
        style={{ perspective: '1400px' }}
        aria-label="Vinodh — UX Designer interactive title"
        title="Hover or tap to flip"
      >
        {/* Continuous dark backdrop when flipped to eliminate any subpixel gap lines */}
        <div
          className={`absolute inset-0 bg-[#141414] transition-opacity duration-300 pointer-events-none ${
            isFlipped ? 'opacity-100 delay-150' : 'opacity-0'
          }`}
        />

        <div className="absolute inset-0 w-full h-full flex m-0 p-0 border-none">
          {Array.from({ length: verticalSlicesCount }).map((_, i) => {
            const widthPct = 100 / verticalSlicesCount;
            // Cascading wave flip: left-to-right when flipping to back, right-to-left when returning to front
            const delay = isFlipped
              ? i * 0.038
              : (verticalSlicesCount - 1 - i) * 0.03;

            return (
              <div
                key={i}
                className="relative h-full m-0 p-0 border-none -mr-px"
                style={{
                  width: `calc(${widthPct}% + 1px)`,
                  perspective: '1200px',
                }}
              >
                <div
                  className="relative w-full h-full m-0 p-0 border-none"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transition: `transform 0.65s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s`,
                  }}
                >
                  {/* FRONT FACE: "VINODH" - Seamless, borderless, no gaps */}
                  <div
                    className="absolute inset-0 overflow-hidden bg-[#fafafa] flex items-center justify-center border-none m-0 p-0"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      boxShadow: '0 0 0 1.5px #fafafa',
                    }}
                  >
                    {/* Sliced text container mathematically aligned across all 12 slats */}
                    <div
                      className="absolute top-0 h-full flex items-center justify-center select-none"
                      style={{
                        left: `-${i * 100}%`,
                        width: `${verticalSlicesCount * 100}%`,
                      }}
                    >
                      <span
                        className="text-[14vw] sm:text-[20vw] md:text-[21vw] font-black tracking-[-0.04em] leading-none text-[#111111] uppercase transition-colors group-hover:text-black whitespace-nowrap"
                        style={{
                          fontFamily:
                            "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                      >
                        VINODH
                      </span>
                    </div>
                  </div>

                  {/* BACK FACE: "UX DESIGNER" - Clean obsidian slate, borderless, zero lines/gaps */}
                  <div
                    className="absolute inset-0 overflow-hidden bg-[#141414] flex items-center justify-center border-none m-0 p-0"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      boxShadow: '0 0 0 1.5px #141414',
                    }}
                  >
                    {/* Sliced text container */}
                    <div
                      className="absolute top-0 h-full flex flex-col items-center justify-center select-none"
                      style={{
                        left: `-${i * 100}%`,
                        width: `${verticalSlicesCount * 100}%`,
                      }}
                    >
                      <span
                        className="font-mono text-[7.5px] sm:text-[11px] md:text-[12px] lg:text-[13px] tracking-[0.1em] sm:tracking-[0.25em] uppercase text-[#22c55e] font-semibold mb-1 sm:mb-2 whitespace-nowrap opacity-90"
                      >
                        Your friendly neighborhood
                      </span>
                      <span
                        className="text-[8.5vw] sm:text-[11vw] md:text-[12vw] font-black tracking-[-0.02em] leading-none text-[#fafafa] uppercase whitespace-nowrap"
                        style={{
                          fontFamily:
                            "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                      >
                        UX DESIGNER
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
