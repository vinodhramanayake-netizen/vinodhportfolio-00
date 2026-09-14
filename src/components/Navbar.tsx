import { useState, useEffect } from 'react';
import { ScreenId } from '../types';

interface NavbarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenContact: () => void;
  onToggleMenu?: () => void;
  isMenuOpen?: boolean;
}

export default function Navbar({
  currentScreen,
  onNavigate,
  onOpenContact,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [showNavLogo, setShowNavLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (currentScreen !== 'home') {
        setShowNavLogo(true);
        return;
      }

      const heroTitle = document.getElementById('hero-vinodh-title');
      if (!heroTitle) {
        setShowNavLogo(window.scrollY > 280);
        return;
      }

      const rect = heroTitle.getBoundingClientRect();
      // Only show the navbar name once the main VINODH hero phrase has scrolled past the navbar (64px)
      setShowNavLogo(rect.bottom <= 64);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [currentScreen]);

  return (
    <header
      id="main-navigation-bar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md border-b border-[#e5e7eb] shadow-xs' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[96vw] mx-auto h-[64px] md:h-[72px] flex items-center justify-between px-2 sm:px-4">
        {/* Brand Wordmark with 3D Flip on Hover (Only visible when main VINODH phrase has passed the navbar) */}
        <button
          id="nav-logo-btn"
          onClick={() => onNavigate('home')}
          className={`group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer transition-all duration-300 ease-out ${
            showNavLogo
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-1.5 pointer-events-none'
          }`}
          title="Vinodh — UX Designer"
          tabIndex={showNavLogo ? 0 : -1}
          aria-hidden={!showNavLogo}
        >
          <div className="relative h-7 sm:h-8 flex items-center overflow-visible" style={{ perspective: '600px' }}>
            <div className="transition-transform duration-500 ease-out group-hover:[transform:rotateX(180deg)] [transform-style:preserve-3d] flex items-center">
              {/* Front: VINODH */}
              <div className="flex items-center gap-2 [backface-visibility:hidden]">
                <span className="font-black tracking-[-0.03em] text-xl sm:text-2xl text-[#111111] group-hover:text-[#15803d] transition-colors">
                  VINODH
                </span>
              </div>
              {/* Back: UX DESIGNER */}
              <div className="absolute inset-0 flex items-center gap-1.5 [backface-visibility:hidden] [transform:rotateX(180deg)] whitespace-nowrap">
                <span className="font-black tracking-[-0.02em] text-lg sm:text-xl text-[#15803d]">
                  UX DESIGNER
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#15803d] animate-pulse" />
              </div>
            </div>
          </div>
        </button>

        {/* Right Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            id="nav-btn-works"
            onClick={() => onNavigate('work')}
            className={`font-mono text-[10px] sm:text-[12px] uppercase px-2 sm:px-4 py-1.5 sm:py-2 rounded border transition-all cursor-pointer ${
              currentScreen === 'work'
                ? 'bg-[#15803d] text-white border-[#15803d] font-semibold shadow-xs'
                : 'bg-white border-[#d4d4d8] text-[#18181b] hover:border-[#15803d] hover:text-[#15803d] shadow-xs'
            }`}
          >
            Works
          </button>

          <button
            id="nav-btn-about"
            onClick={() => onNavigate('about')}
            className={`font-mono text-[10px] sm:text-[12px] uppercase px-2 sm:px-4 py-1.5 sm:py-2 rounded border transition-all cursor-pointer ${
              currentScreen === 'about'
                ? 'bg-[#15803d] text-white border-[#15803d] font-semibold shadow-xs'
                : 'bg-white border-[#d4d4d8] text-[#18181b] hover:border-[#15803d] hover:text-[#15803d] shadow-xs'
            }`}
          >
            About
          </button>

          <button
            id="nav-cta-talk-btn"
            onClick={onOpenContact}
            className="group relative inline-flex items-center gap-1 font-mono text-[10px] sm:text-[12px] uppercase px-2 sm:px-4 py-1.5 sm:py-2 rounded border border-[#d4d4d8] hover:border-[#15803d] bg-white text-[#18181b] hover:text-[#15803d] shadow-xs transition-all cursor-pointer"
          >
            <span className="hidden sm:inline">Let's Talk</span>
            <span className="sm:hidden inline">Talk</span>
            <span className="text-[#15803d] group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        </div>
      </div>
    </header>
  );
}
