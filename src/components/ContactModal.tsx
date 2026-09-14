import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    inquiry: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', company: '', email: '', inquiry: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-[560px] bg-white rounded-2xl sm:rounded-3xl border border-[#e4e4e7] my-auto overflow-hidden text-left p-7 sm:p-10 shadow-2xl"
        >
          {/* Close button */}
          <button
            id="close-contact-modal-btn"
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-6 right-6 p-2 text-[#71717a] hover:text-[#18181b] hover:bg-[#f4f4f5] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              {/* Header */}
              <div className="pr-8 mb-6">
                <h2 className="text-2xl sm:text-[32px] font-bold text-[#18181b] tracking-tight leading-tight">
                  Let's start a conversation.
                </h2>
                <p className="text-[#71717a] text-[14px] sm:text-[15px] leading-relaxed mt-2.5">
                  Interested in working together? Leave your details and I'll get back to you soon.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Name and Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-1 font-mono text-[11px] font-bold tracking-wider text-[#52525b] uppercase mb-1.5">
                      <span>NAME</span>
                      <span className="text-[#15803d] font-bold text-sm leading-none">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-[#fbfbfb] border border-[#e4e4e7] rounded-xl px-4 py-3 text-[14px] text-[#18181b] placeholder-[#a1a1aa] focus:bg-white focus:border-[#18181b] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] font-bold tracking-wider text-[#52525b] uppercase mb-1.5">
                      COMPANY
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="ABC Company"
                      className="w-full bg-[#fbfbfb] border border-[#e4e4e7] rounded-xl px-4 py-3 text-[14px] text-[#18181b] placeholder-[#a1a1aa] focus:bg-white focus:border-[#18181b] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Work Email */}
                <div>
                  <label className="flex items-center gap-1 font-mono text-[11px] font-bold tracking-wider text-[#52525b] uppercase mb-1.5">
                    <span>WORK EMAIL</span>
                    <span className="text-[#15803d] font-bold text-sm leading-none">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full bg-[#fbfbfb] border border-[#e4e4e7] rounded-xl px-4 py-3 text-[14px] text-[#18181b] placeholder-[#a1a1aa] focus:bg-white focus:border-[#18181b] focus:outline-none transition-colors"
                  />
                </div>

                {/* Row 3: Inquiry */}
                <div>
                  <label className="flex items-center gap-1 font-mono text-[11px] font-bold tracking-wider text-[#52525b] uppercase mb-1.5">
                    <span>INQUIRY</span>
                    <span className="text-[#15803d] font-bold text-sm leading-none">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.inquiry}
                    onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                    className="w-full bg-[#fbfbfb] border border-[#e4e4e7] rounded-xl px-4 py-3 text-[14px] text-[#18181b] placeholder-[#a1a1aa] focus:bg-white focus:border-[#18181b] focus:outline-none transition-colors min-h-[130px]"
                  />
                </div>

                {/* Row 4: Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    id="submit-message-btn"
                    className="w-full py-3.5 sm:py-4 bg-[#111111] hover:bg-[#27272a] text-white font-mono text-[13px] uppercase font-bold tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99]"
                  >
                    <span>SEND MESSAGE</span>
                    <span>→</span>
                  </button>
                </div>
              </form>

              {/* Row 5: Footer direct email */}
              <div className="mt-8 pt-6 border-t border-[#f4f4f5] flex items-center justify-center">
                <a
                  href="mailto:ramanayakevinodh@gmail.com"
                  className="inline-flex items-center gap-2 text-[#15803d] font-mono text-[13px] sm:text-[14px] font-semibold hover:underline transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#15803d]" />
                  <span>ramanayakevinodh@gmail.com</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-[#f0fdf4] border border-[#15803d] text-[#15803d] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7 text-[#15803d]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#18181b]">Message Sent</h3>
                <p className="font-mono text-[13px] text-[#15803d] font-semibold">
                  Thank you, {formData.name || 'friend'}.
                </p>
                <p className="text-[14px] text-[#52525b] max-w-sm mx-auto leading-relaxed">
                  Your inquiry has been received. I will get back to you shortly at{' '}
                  <span className="text-[#18181b] font-medium">{formData.email}</span>.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="font-mono text-[12px] uppercase font-semibold px-6 py-2.5 rounded-xl border border-[#d4d4d8] text-[#18181b] hover:bg-[#f4f4f5] transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
