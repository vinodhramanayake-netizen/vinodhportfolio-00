import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import Lenis from 'lenis';

export type ScrollPace = 'brisk' | 'balanced' | 'smooth' | 'slow';

export interface ScrollPaceConfig {
  id: ScrollPace;
  name: string;
  shortLabel: string;
  duration: number;
  wheelMultiplier: number;
  programmaticDuration: number;
}

export const SCROLL_PACES: Record<ScrollPace, ScrollPaceConfig> = {
  'brisk': {
    id: 'brisk',
    name: 'Brisk & Responsive',
    shortLabel: '1.25x',
    duration: 0.85,
    wheelMultiplier: 1.15,
    programmaticDuration: 0.95,
  },
  'balanced': {
    id: 'balanced',
    name: 'Balanced (Optimal)',
    shortLabel: '1.0x',
    duration: 1.15,
    wheelMultiplier: 0.95,
    programmaticDuration: 1.25,
  },
  'smooth': {
    id: 'smooth',
    name: 'Smooth Drift',
    shortLabel: '0.8x',
    duration: 1.5,
    wheelMultiplier: 0.75,
    programmaticDuration: 1.5,
  },
  'slow': {
    id: 'slow',
    name: 'Slow Luxury',
    shortLabel: '0.6x',
    duration: 2.0,
    wheelMultiplier: 0.55,
    programmaticDuration: 1.8,
  },
};

interface ScrollContextType {
  lenis: Lenis | null;
  pace: ScrollPace;
  setPace: (pace: ScrollPace) => void;
  scrollTo: (target: string | number | HTMLElement, customDuration?: number) => void;
  scrollProgress: number;
  setModalOpen: (open: boolean) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  lenis: null,
  pace: 'slow',
  setPace: () => {},
  scrollTo: () => {},
  scrollProgress: 0,
  setModalOpen: () => {},
});

export function ScrollProvider({
  children,
  isModalOpen: externalModalOpen = false,
}: {
  children: ReactNode;
  isModalOpen?: boolean;
}) {
  const [pace, setPace] = useState<ScrollPace>('slow');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [internalModalOpen, setInternalModalOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisReady, setLenisReady] = useState(false);

  const isModalOpen = externalModalOpen || internalModalOpen;

  const currentConfig = SCROLL_PACES[pace];

  useEffect(() => {
    // Initialize Lenis with balanced fluid configuration
    const lenisInstance = new Lenis({
      duration: currentConfig.duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out: responsive start, silky deceleration
      wheelMultiplier: currentConfig.wheelMultiplier,
      touchMultiplier: 1.0,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
    });

    lenisRef.current = lenisInstance;
    setLenisReady(true);

    lenisInstance.on('scroll', (e: { progress: number }) => {
      setScrollProgress(e.progress);
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenisInstance.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenisInstance.destroy();
      lenisRef.current = null;
      setLenisReady(false);
    };
  }, [pace]);

  // Pause / resume Lenis when full modals are open so modal content scrolls naturally
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isModalOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isModalOpen, lenisReady]);

  const scrollTo = (target: string | number | HTMLElement, customDuration?: number) => {
    if (!lenisRef.current) {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const duration = customDuration ?? currentConfig.programmaticDuration;
    lenisRef.current.scrollTo(target, {
      duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    <ScrollContext.Provider
      value={{
        lenis: lenisRef.current,
        pace,
        setPace,
        scrollTo,
        scrollProgress,
        setModalOpen: setInternalModalOpen,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  return useContext(ScrollContext);
}
