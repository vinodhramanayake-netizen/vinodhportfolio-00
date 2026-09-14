import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';

interface ServicesSectionProps {
  onOpenContact: () => void;
}

export default function ServicesSection({ onOpenContact }: ServicesSectionProps) {
  const [activeService, setActiveService] = useState<string>(SERVICES[0].id);

  return (
    <section id="services-section" className="py-20 sm:py-28 px-4 sm:px-8 md:px-14 lg:px-20 border-b border-[#e5e7eb]">
      <div className="max-w-[1500px] mx-auto">
        {/* Top Headline Banner */}
        <div className="max-w-4xl space-y-4">
          <span className="font-mono text-[12px] text-[#15803d] tracking-widest uppercase block">
            [ CAPABILITIES & PROCESS ]
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111] leading-[1.08]">
            In 14 days, we shape a complete brand identity that moves with confidence.
          </h2>
          <p className="font-mono text-[13px] sm:text-[14px] text-[#52525b] leading-relaxed pt-2">
            No endless committee workshops. No fluffy brand decks. A concentrated strategic sprint bridging the gap
            between positioning and raw aesthetic execution.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16 border-y border-[#e5e7eb] py-10 font-mono text-[13px]">
          <div className="space-y-2">
            <span className="text-[#15803d] text-[11px] uppercase tracking-wider block">[ 01 ]</span>
            <h3 className="text-[#111111] text-base font-medium">Brand Identity in just 14 days</h3>
            <p className="text-[#52525b] leading-relaxed">
              Rapid, high-conviction sprint delivering an entire identity system ready for deployment.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[#15803d] text-[11px] uppercase tracking-wider block">[ 02 ]</span>
            <h3 className="text-[#111111] text-base font-medium">Stand out and earn trust</h3>
            <p className="text-[#52525b] leading-relaxed">
              We design identities that evoke visceral feeling and establish immediate institutional authority.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[#15803d] text-[11px] uppercase tracking-wider block">[ 03 ]</span>
            <h3 className="text-[#111111] text-base font-medium">Launch faster & save capital</h3>
            <p className="text-[#52525b] leading-relaxed">
              Eliminate months of iteration. Receive production-ready design tokens, code, and launch assets.
            </p>
          </div>
        </div>

        {/* Interactive Services List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#e5e7eb] font-mono text-[11px] text-[#71717a] uppercase">
            <span>Service Matrix</span>
            <span>Sprint Scope</span>
          </div>

          {SERVICES.map((service) => {
            const isOpen = activeService === service.id;
            return (
              <div
                key={service.id}
                className="border border-[#e4e4e7] bg-white hover:border-[#a1a1aa] transition-colors shadow-xs"
              >
                <button
                  onClick={() => setActiveService(isOpen ? '' : service.id)}
                  className="w-full p-6 sm:p-8 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-4 sm:gap-8">
                    <span className="font-mono text-[13px] text-[#15803d]">{service.number}</span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#111111] tracking-tight">
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 font-mono text-[12px]">
                    <span className="hidden sm:inline-block text-[#71717a]">{service.duration}</span>
                    <span className="text-lg text-[#15803d]">{isOpen ? '−' : '+'}</span>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-[#e5e7eb] space-y-6">
                        <p className="text-[14px] sm:text-[15px] text-[#52525b] leading-relaxed max-w-3xl">
                          {service.summary}
                        </p>

                        <div className="space-y-3">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[#71717a] block">
                            Key Deliverables:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-mono text-[12px] text-[#3f3f46]">
                            {service.deliverables.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <span className="text-[#15803d]">✓</span>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2">
                          <button
                            onClick={onOpenContact}
                            className="font-mono text-[11px] sm:text-[12px] uppercase text-white bg-[#18181b] hover:bg-[#15803d] px-4 py-2 font-medium transition-colors cursor-pointer shadow-xs"
                          >
                            Inquire for {service.title} →
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
