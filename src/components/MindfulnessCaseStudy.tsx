import { 
  ArrowDown, 
  User, 
  Eye, 
  TrendingUp, 
  Layout, 
  RefreshCw, 
  Sparkles, 
  Users, 
  HelpCircle,
  FileText,
  Calendar,
  Layers,
  Heart
} from 'lucide-react';

export default function MindfulnessCaseStudy() {
  return (
    <div className="space-y-16">
      
      {/* 01. The Challenge */}
      <div className="space-y-8 w-full">
        <div className="border-b border-[#e5e7eb] pb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
            01. The Challenge
          </h2>
        </div>

        <p className="text-base sm:text-lg text-[#3f3f46] leading-relaxed font-sans font-light">
          Mindfulness Meditation is a meditation and wellbeing service run by a monk based in the UK, offering meditation, counselling, mindfulness programs, retreats, webinars, and corporate wellbeing sessions.
        </p>

        <p className="text-base sm:text-lg text-[#3f3f46] leading-relaxed font-sans font-light">
          Before the MVP, the entire booking process was managed manually through phone calls, conversations, and Excel spreadsheets. This created friction for both sides:
        </p>

        {/* User / Stakeholder Friction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* For Users */}
          <div className="bg-[#fcfdfa] border border-[#e2e8f0] p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-wider text-[#15803d] font-bold">
              <User className="w-4 h-4" />
              For Users
            </div>
            <ul className="space-y-3.5">
              {[
                "Booking required manual communication",
                "It was difficult to track bookings",
                "There was no central place for upcoming and previous sessions",
                "Meditation resources were distributed separately"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-[#52525b] leading-relaxed">
                  <span className="text-[#15803d] font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* For Stakeholder */}
          <div className="bg-[#fcfdf9] border border-[#e2e8f0] p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-wider text-[#854d0e] font-bold">
              <Users className="w-4 h-4" />
              For The Stakeholder
            </div>
            <ul className="space-y-3.5">
              {[
                "Customer and booking information had to be maintained manually",
                "Confirmations required additional communication",
                "Managing bookings through spreadsheets was time-consuming",
                "The process would become increasingly difficult to scale"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-[#52525b] leading-relaxed">
                  <span className="text-[#854d0e] font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The Goal Banner */}
        <div className="bg-[#18181b] text-white p-6 sm:p-8 space-y-3">
          <div className="font-mono text-[11px] uppercase tracking-widest text-[#22c55e] font-bold">
            The Goal
          </div>
          <p className="text-base sm:text-[17px] text-[#e4e4e7] leading-relaxed font-sans font-light">
            Transform this fragmented process into a centralized digital experience where users could discover programs, purchase memberships, book sessions, manage bookings, and access mindfulness resources.
          </p>
        </div>
      </div>

      {/* 02. Understanding the Existing Experience */}
      <div className="space-y-6 w-full pt-10 border-t border-[#e5e7eb]">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
            02. Understanding the Existing Experience
          </h2>
        </div>

        <p className="text-base sm:text-lg text-[#52525b] leading-relaxed font-sans font-light">
          Before designing the solution, I mapped how the existing booking process worked.
        </p>

        {/* Existing Flow Diagram */}
        <div className="bg-[#fafafa] border border-[#e5e7eb] p-6 sm:p-8 space-y-4">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#71717a] font-bold text-center">
            The Existing Flow
          </div>
          <div className="flex flex-col items-center justify-center space-y-3 font-mono text-[12px] py-4 max-w-md mx-auto">
            {[
              "User interested in a session",
              "Phone / manual communication",
              "Course & availability discussion",
              "Booking confirmation",
              "Manual entry into Excel",
              "Further communication",
              "Session"
            ].map((node, idx) => (
              <div key={idx} className="flex flex-col items-center w-full">
                <div className={`px-4 py-2 border text-center w-full shadow-3xs ${idx === 6 ? 'bg-[#f0fdf4] text-[#15803d] border-[#bbf7d0]' : 'bg-white text-[#18181b] border-[#e2e8f0]'}`}>
                  {node}
                </div>
                {idx < 6 && <ArrowDown className="w-4 h-4 text-[#94a3b8] my-1" />}
              </div>
            ))}
          </div>
        </div>

        {/* Problem & Challenge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
              The Problem
            </h3>
            <p className="text-sm sm:text-[15px] leading-relaxed text-[#52525b] font-sans">
              The experience was fragmented, manual, and difficult to track. Both users and the stakeholder had to spend unnecessary time communicating and maintaining information that could instead be handled through a digital platform.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#15803d]" />
              Core Challenge
            </h3>
            <p className="text-sm sm:text-[15px] leading-relaxed text-[#52525b] font-sans">
              How might we transform a manual, fragmented booking process into a simple digital experience that makes meditation programs easier to discover, purchase, book, and manage?
            </p>
          </div>
        </div>
      </div>

      {/* 03. Research & Insights */}
      <div className="space-y-6 w-full pt-10 border-t border-[#e5e7eb]">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
            03. Research & Insights
          </h2>
        </div>

        <p className="text-base sm:text-lg text-[#52525b] leading-relaxed font-sans font-light">
          I gathered insights from both sides of the experience rather than designing purely from assumptions.
        </p>

        {/* Inputs & Insights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          {/* Research Inputs Column */}
          <div className="bg-[#fbfbfb] border border-[#e5e7eb] p-6 lg:col-span-1 space-y-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#71717a] font-bold">
              Research Inputs
            </div>
            <ul className="space-y-3 font-sans text-sm sm:text-[15px] text-[#52525b]">
              {[
                "Stakeholder meetings",
                "User feedback",
                "Feedback forms",
                "Existing booking workflow",
                "Business requirements",
                "Discussions around current pain points"
              ].map((input, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-[#15803d] font-bold">•</span>
                  <span>{input}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Insights Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#71717a] font-bold">
              Key Insights
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  num: "01",
                  title: "Self-Service Booking",
                  desc: "Users should be able to discover a program, select a session, and complete their booking without relying on phone calls."
                },
                {
                  num: "02",
                  title: "Central Booking Home",
                  desc: "Users needed a simple way to see upcoming and previous sessions."
                },
                {
                  num: "03",
                  title: "Connected Membership",
                  desc: "Membership could combine course benefits, discounts, and exclusive mindfulness resources into one offering."
                },
                {
                  num: "04",
                  title: "Resources In Platform",
                  desc: "Guides, PDFs, and audio meditations could become part of the user's ongoing mindfulness journey."
                }
              ].map((insight) => (
                <div key={insight.num} className="border border-[#e2e8f0] p-5 space-y-2 bg-white">
                  <span className="font-mono text-sm font-bold text-[#15803d] block">{insight.num} // {insight.title}</span>
                  <p className="text-xs sm:text-sm text-[#52525b] leading-relaxed font-sans">{insight.desc}</p>
                </div>
              ))}
            </div>

            {/* Extra Row */}
            <div className="border border-[#e2e8f0] p-5 bg-white space-y-2">
              <span className="font-mono text-sm font-bold text-[#15803d] block">05 // Diverse Experiences</span>
              <p className="text-xs sm:text-sm text-[#52525b] leading-relaxed font-sans">
                The system needed to accommodate online and on-site sessions across meditation, counselling, retreats, webinars, open days, and corporate wellbeing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 04. Defining the MVP */}
      <div className="space-y-6 w-full pt-10 border-t border-[#e5e7eb]">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
            04. Defining the MVP
          </h2>
        </div>

        <p className="text-base sm:text-lg text-[#52525b] leading-relaxed font-sans font-light">
          Based on the research and business requirements, I narrowed the experience around four core areas:
        </p>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          {["Discover", "Membership", "Book", "Manage"].map((pillar) => (
            <div key={pillar} className="border border-[#e2e8f0] py-6 px-4 text-center bg-[#fafafa]">
              <span className="text-base font-bold text-[#111111]">{pillar}</span>
            </div>
          ))}
        </div>

        <p className="text-sm sm:text-base text-[#52525b] leading-relaxed font-sans font-light">
          The MVP allowed users to complete the following critical actions:
        </p>

        {/* MVP Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "Create an account & Complete profile",
            "Add meditation preferences and experience",
            "Browse programs and sessions",
            "Purchase a membership & Receive member pricing",
            "Book online or on-site sessions",
            "Manage upcoming bookings & View previous ones",
            "Access exclusive resources (Guides, Audio, PDFs)",
            "Manage personal monk-guided preferences"
          ].map((action, idx) => (
            <div key={idx} className="border border-[#e5e7eb] p-4 bg-white flex items-start gap-3">
              <span className="font-mono text-[11px] text-[#15803d] font-bold mt-0.5">[{idx + 1}]</span>
              <span className="text-xs sm:text-sm text-[#3f3f46] leading-snug">{action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 05. Prototyping & Testing */}
      <div className="space-y-6 w-full pt-10 border-t border-[#e5e7eb]">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
            05. Prototyping & Testing
          </h2>
        </div>

        <p className="text-base sm:text-lg text-[#3f3f46] leading-relaxed font-sans font-light">
          Once I identified the key pain points and requirements, I moved directly into prototyping to turn the ideas into something tangible that could be reviewed and tested quickly.
        </p>

        <p className="text-base sm:text-lg text-[#3f3f46] leading-relaxed font-sans font-light">
          Rather than working in isolation and presenting a complete solution at the end, I worked closely with the stakeholder throughout the process. I shared early prototypes, gathered quick feedback, identified gaps, and iterated continuously.
        </p>

        {/* Rapid Feedback Loop Diagram */}
        <div className="bg-[#fafafa] border border-[#e5e7eb] p-6 sm:p-8 space-y-4">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#71717a] font-bold text-center">
            Rapid Feedback Loop
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-4 font-mono text-[11px] sm:text-xs text-[#15803d] font-bold py-2 text-center flex-wrap">
            <span>Prototype</span>
            <span>→</span>
            <span>Stakeholder Feedback</span>
            <span>→</span>
            <span>Iterate</span>
            <span>→</span>
            <span>Review</span>
            <span>→</span>
            <span>Refine</span>
          </div>
        </div>

        <p className="text-base text-[#3f3f46] leading-relaxed font-sans font-light">
          This allowed me to validate decisions early and avoid spending time developing ideas that didn't align with the stakeholder's expectations or business requirements.
        </p>
      </div>

      {/* 06. Final Design to Development */}
      <div className="space-y-6 w-full pt-10 border-t border-[#e5e7eb]">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
            06 Final Design to Development
          </h2>
        </div>

        <p className="text-base sm:text-lg text-[#3f3f46] leading-relaxed font-sans font-light">
          One of the unique aspects of this project was that I didn't stop at designing the interface. I also took the MVP into development using Claude, turning my design decisions into a functional product.
        </p>

        <p className="text-base sm:text-lg text-[#3f3f46] leading-relaxed font-sans font-light">
          Instead of treating design and development as two separate stages, I used development as another part of the design process.
        </p>

        {/* Prototype to Product */}

        <p className="text-base text-[#3f3f46] leading-relaxed font-sans font-light">
          I translated the final UI and interaction decisions into a working MVP, using Claude to help generate and refine the implementation.
        </p>

        <div className="space-y-3 pt-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#71717a] font-bold">
            This allowed me to:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Build the core product experience",
              "Translate UI decisions directly into code",
              "Test interactions in a functional environment",
              "Identify issues that weren't obvious in static designs",
              "Iterate on both UX and implementation",
              "Validate the feasibility of design decisions"
            ].map((benefit, idx) => (
              <div key={idx} className="border border-[#e5e7eb] p-4 bg-white flex items-start gap-3">
                <span className="text-[#15803d] font-bold mt-0.5">✓</span>
                <span className="text-xs sm:text-sm text-[#3f3f46] leading-snug">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>



    </div>
  );
}
