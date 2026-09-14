import { motion, AnimatePresence } from 'motion/react';
import { ScreenId } from '../types';

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenId) => void;
  onOpenContact: () => void;
}

export default function NavigationOverlay({
  isOpen,
  onClose,
  onNavigate,
  onOpenContact,
}: NavigationOverlayProps) {
  if (!isOpen) return null;

  const handleSelect = (screen: ScreenId) => {
    onNavigate(screen);
    onClose();
  };

  const navItems: { label: string; number: string; screen?: ScreenId; isAction?: boolean }[] = [
    { label: 'Index / Hero', number: '01', screen: 'home' },
    { label: 'Selected Works', number: '02', screen: 'work' },
    { label: 'About Vinodh', number: '03', screen: 'about' },
    { label: "Let's Talk (Inquire)", number: '04', isAction: true },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-[#fafafa] flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-y-auto"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-6">
          <div className="group relative h-8 flex items-center cursor-pointer" style={{ perspective: '500px' }}>
            <div className="transition-transform duration-500 ease-out group-hover:[transform:rotateX(180deg)] [transform-style:preserve-3d]">
              <span className="font-black text-2xl text-[#111111] tracking-tight block [backface-visibility:hidden]">
                VINODH
              </span>
              <span className="font-black text-xl text-[#15803d] tracking-tight absolute inset-0 flex items-center [backface-visibility:hidden] [transform:rotateX(180deg)] whitespace-nowrap">
                UX DESIGNER
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-[12px] uppercase px-3 py-1.5 border border-[#d4d4d8] hover:border-[#111111] text-[#18181b] bg-white transition-colors cursor-pointer"
          >
            Close [✕]
          </button>
        </div>

        {/* Large Navigation Links */}
        <nav className="my-auto py-12 space-y-4 sm:space-y-6">
          {navItems.map((item) => (
            <div key={item.label} className="overflow-hidden">
              <button
                onClick={() => {
                  if (item.isAction) {
                    onClose();
                    onOpenContact();
                  } else if (item.screen) {
                    handleSelect(item.screen);
                  }
                }}
                className="group flex items-baseline gap-4 sm:gap-6 text-left cursor-pointer focus:outline-none"
              >
                <span className="font-mono text-sm sm:text-base text-[#a1a1aa] group-hover:text-[#15803d] transition-colors">
                  {item.number}
                </span>
                <span className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#3f3f46] group-hover:text-[#111111] group-hover:translate-x-2 transition-all duration-300">
                  {item.label}
                </span>
                <span className="text-xl text-[#15803d] opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </button>
            </div>
          ))}
        </nav>

        {/* Footer info inside overlay */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#e5e7eb] font-mono text-[12px] text-[#71717a]">
          <div>
            <span className="block text-[#71717a] uppercase mb-1">Contact Email</span>
            <a href="mailto:ramanayakevinodh@gmail.com" className="text-[#18181b] hover:text-[#15803d] transition-colors font-medium">
              ramanayakevinodh@gmail.com
            </a>
          </div>

          <div>
            <span className="block text-[#71717a] uppercase mb-1">Phone / WhatsApp</span>
            <a href="tel:+94714876367" className="text-[#18181b] hover:text-[#15803d] transition-colors font-medium">
              +94 71 487 6367
            </a>
          </div>

          <div>
            <span className="block text-[#71717a] uppercase mb-1">Availability</span>
            <span className="text-[#15803d] font-medium">Open for select projects</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
