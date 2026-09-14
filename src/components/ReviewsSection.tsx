import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data';

interface ReviewsSectionProps {
  onOpenContact?: () => void;
}

export default function ReviewsSection({ onOpenContact }: ReviewsSectionProps) {
  return (
    <section id="reviews-section" className="py-20 sm:py-28 px-4 sm:px-8 md:px-14 lg:px-20 border-b border-[#e5e7eb]">
      <div className="max-w-[1500px] mx-auto">
        <div className="pb-12 border-b border-[#e5e7eb]">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111111]">
            Words from the people I’ve worked with
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-12">
          {TESTIMONIALS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-7 sm:p-8 bg-white border border-[#e4e4e7] rounded-2xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-5">
                  {review.image ? (
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#e4e4e7]"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-full bg-[#f4f4f5] border border-[#e4e4e7] flex items-center justify-center text-[#71717a] font-mono text-sm font-medium"
                      aria-label={review.name}
                    >
                      {review.name
                        .split(' ')
                        .filter(Boolean)
                        .map((n) => n[0]?.toUpperCase())
                        .slice(0, 2)
                        .join('')}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-[#111111] text-[16px] leading-snug">
                      {review.name}
                    </h3>
                    <p className="text-[13px] text-[#71717a] font-normal">
                      {review.role}
                    </p>
                  </div>
                </div>

                <p className="text-[14px] sm:text-[15px] text-[#3f3f46] leading-relaxed">
                  "{review.quote}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

