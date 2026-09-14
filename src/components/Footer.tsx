import { ScreenId } from '../types';
import { useScroll } from '../context/ScrollContext';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenContact?: () => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { scrollTo } = useScroll();

  return (
    <footer id="main-footer" className="pt-20 pb-12 px-4 sm:px-8 md:px-14 lg:px-20 bg-[#f4f4f5] text-[#71717a] border-t border-[#e5e7eb]">
      <div className="max-w-[1500px] mx-auto space-y-16">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 border-b border-[#e5e7eb] pb-16">
          {/* Col 1: Mission */}
          <div className="lg:col-span-6 space-y-4">
            <h4 className="font-black text-2xl text-[#111111] tracking-tight">VINODH</h4>
            <p className="text-[13px] leading-relaxed text-[#52525b] font-sans max-w-md">
              UX Designer & Product Strategist crafting high-conviction digital products, scalable design systems, and thoughtful human interfaces.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-3 space-y-3 font-mono text-[12px]">
            <span className="text-[#111111] uppercase tracking-wider block font-semibold">Menu/</span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-[#52525b] hover:text-[#111111] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('work')}
                  className="text-[#52525b] hover:text-[#111111] transition-colors cursor-pointer"
                >
                  Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-[#52525b] hover:text-[#111111] transition-colors cursor-pointer"
                >
                  About Me
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div className="lg:col-span-3 space-y-3 font-mono text-[12px]">
            <span className="text-[#111111] uppercase tracking-wider block font-semibold">Contact/</span>
            <div className="space-y-1.5">
              <a
                href="mailto:ramanayakevinodh@gmail.com"
                className="text-[#15803d] hover:underline font-medium block"
              >
                ramanayakevinodh@gmail.com
              </a>
              <a
                href="tel:+94714876367"
                className="text-[#3f3f46] hover:text-[#111111] transition-colors block"
              >
                +94 71 487 6367
              </a>
            </div>
          </div>
        </div>

        {/* Massive Display Brand Typography with Hover Transition to UX DESIGNER */}
        <div className="w-full overflow-hidden select-none text-center group cursor-pointer py-4">
          <div className="relative inline-block w-full" style={{ perspective: '800px' }}>
            <div className="transition-transform duration-700 ease-out group-hover:[transform:rotateX(180deg)] [transform-style:preserve-3d]">
              {/* Front: VINODH */}
              <div
                className="text-[14vw] sm:text-[19vw] font-black tracking-[-0.04em] leading-[0.75] text-[#e4e4e7] group-hover:text-[#111111] transition-colors duration-500 uppercase [backface-visibility:hidden]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                VINODH
              </div>
              {/* Back: UX DESIGNER */}
              <div
                className="absolute inset-0 flex items-center justify-center text-[6.5vw] sm:text-[7.5vw] md:text-[9.5vw] lg:text-[10vw] font-black tracking-[-0.02em] leading-none text-[#15803d] uppercase whitespace-nowrap px-2 [backface-visibility:hidden] [transform:rotateX(180deg)]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                UX DESIGNER
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#e5e7eb] font-mono text-[11px] text-[#71717a]">
          <div>
            © {new Date().getFullYear()} VINODH — UX DESIGNER. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6 text-[#52525b]">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#111111] transition-colors"
            >
              LINKEDIN
            </a>
            <button
              onClick={() => scrollTo(0, 1.25)}
              className="text-[#15803d] hover:underline cursor-pointer font-medium"
            >
              BACK TO TOP ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
