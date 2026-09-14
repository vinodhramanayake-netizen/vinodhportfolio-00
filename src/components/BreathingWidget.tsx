import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Activity } from 'lucide-react';

type BreathingPhase = 'idle' | 'inhale' | 'hold-in' | 'exhale' | 'hold-out';

interface Technique {
  name: string;
  desc: string;
  inhale: number;
  holdIn: number;
  exhale: number;
  holdOut: number;
}

const TECHNIQUES: Technique[] = [
  { name: 'Box Breathing (4-4-4-4)', desc: 'Used by navy seals for extreme focus and mental clarity.', inhale: 4, holdIn: 4, exhale: 4, holdOut: 4 },
  { name: 'Calm Breathing (4-2-4-2)', desc: 'Gentle, balanced pacing for general anxiety relief.', inhale: 4, holdIn: 2, exhale: 4, holdOut: 2 },
  { name: 'Deep Relaxation (4-7-8)', desc: 'The classic sleep and relaxation exercise.', inhale: 4, holdIn: 7, exhale: 8, holdOut: 0 },
];

export default function BreathingWidget() {
  const [activeTechnique, setActiveTechnique] = useState<number>(0);
  const [phase, setPhase] = useState<BreathingPhase>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [cyclesCompleted, setCyclesCompleted] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const technique = TECHNIQUES[activeTechnique];

  const handleStart = () => {
    if (phase === 'idle') {
      setPhase('inhale');
      setTimeLeft(technique.inhale);
    }
  };

  const handlePauseToggle = () => {
    if (phase === 'idle') {
      handleStart();
    } else {
      setPhase('idle');
      setCyclesCompleted(0);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleReset = () => {
    setPhase('idle');
    setTimeLeft(0);
    setCyclesCompleted(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (phase === 'idle') return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Transition to next phase
          let nextPhase: BreathingPhase = 'idle';
          let nextDuration = 0;

          if (phase === 'inhale') {
            if (technique.holdIn > 0) {
              nextPhase = 'hold-in';
              nextDuration = technique.holdIn;
            } else {
              nextPhase = 'exhale';
              nextDuration = technique.exhale;
            }
          } else if (phase === 'hold-in') {
            nextPhase = 'exhale';
            nextDuration = technique.exhale;
          } else if (phase === 'exhale') {
            if (technique.holdOut > 0) {
              nextPhase = 'hold-out';
              nextDuration = technique.holdOut;
            } else {
              nextPhase = 'inhale';
              nextDuration = technique.inhale;
              setCyclesCompleted((c) => c + 1);
            }
          } else if (phase === 'hold-out') {
            nextPhase = 'inhale';
            nextDuration = technique.inhale;
            setCyclesCompleted((c) => c + 1);
          }

          setPhase(nextPhase);
          return nextDuration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, technique]);

  // Adjust timing when switching technique
  useEffect(() => {
    handleReset();
  }, [activeTechnique]);

  // Determine size & color based on breathing phase
  const getCircleStyles = () => {
    switch (phase) {
      case 'inhale':
        return {
          scale: 1.25,
          colorClass: 'text-[#15803d]',
          borderColor: 'border-[#15803d]',
          glowOpacity: 'bg-[#15803d]/15',
          duration: technique.inhale,
        };
      case 'hold-in':
        return {
          scale: 1.25,
          colorClass: 'text-[#0ea5e9]',
          borderColor: 'border-[#0ea5e9]',
          glowOpacity: 'bg-[#0ea5e9]/15',
          duration: technique.holdIn,
        };
      case 'exhale':
        return {
          scale: 0.75,
          colorClass: 'text-[#eab308]',
          borderColor: 'border-[#eab308]',
          glowOpacity: 'bg-[#eab308]/15',
          duration: technique.exhale,
        };
      case 'hold-out':
        return {
          scale: 0.75,
          colorClass: 'text-[#64748b]',
          borderColor: 'border-[#64748b]',
          glowOpacity: 'bg-[#64748b]/15',
          duration: technique.holdOut,
        };
      default:
        return {
          scale: 0.95,
          colorClass: 'text-[#18181b]',
          borderColor: 'border-[#e4e4e7]',
          glowOpacity: 'bg-[#18181b]/5',
          duration: 0,
        };
    }
  };

  const currentStyle = getCircleStyles();

  return (
    <div className="border border-[#e4e4e7] bg-[#fafafa] p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center max-w-4xl mx-auto shadow-2xs">
      
      {/* Left Column: Technique Selector and Metadata */}
      <div className="w-full md:w-1/2 space-y-6">

        <div className="space-y-1">
          <h4 className="text-lg font-bold text-[#111111] tracking-tight">Breathing Pacing Engine</h4>
          <p className="text-[13px] text-[#52525b] leading-relaxed">
            Test the live interaction specification of the guided meditation engine. This HTML model mirrors the real-time physics and cycle pacing on mobile screens.
          </p>
        </div>

        {/* Buttons to change Technique */}
        <div className="space-y-2">
          <span className="font-mono text-[10px] uppercase text-[#a1a1aa] tracking-wider block">Pacing Presets/</span>
          <div className="space-y-1.5">
            {TECHNIQUES.map((tech, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTechnique(idx)}
                className={`w-full text-left p-3 border font-mono text-[12px] transition-all cursor-pointer flex justify-between items-center ${
                  activeTechnique === idx
                    ? 'bg-white border-[#15803d] text-[#15803d] font-semibold shadow-2xs'
                    : 'bg-white/40 border-[#e4e4e7] text-[#52525b] hover:border-[#a1a1aa] hover:text-[#111111]'
                }`}
              >
                <div className="space-y-0.5">
                  <span className="block font-sans font-bold text-[#111111] text-[13px]">{tech.name}</span>
                  <span className="block text-[11px] font-sans font-normal text-[#71717a] leading-tight">{tech.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 pt-2 font-mono text-[11px] text-[#71717a]">
          <div>
            <span>CYCLES COMPLETED:</span>{' '}
            <span className="font-bold text-[#111111]">{cyclesCompleted}</span>
          </div>
          <div>
            <span>PHASE TEMPO:</span>{' '}
            <span className="font-bold text-[#15803d]">
              {technique.inhale}s - {technique.holdIn}s - {technique.exhale}s - {technique.holdOut}s
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Visualizer Stage */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-white border border-[#e4e4e7] shadow-2xs relative min-h-[300px]">
        {/* Breathing Circle Container */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Outer Pulsing Glow */}
          <div
            className={`absolute rounded-full transition-all duration-1000 ${currentStyle.glowOpacity}`}
            style={{
              width: '100%',
              height: '100%',
              transform: `scale(${currentStyle.scale})`,
            }}
          />

          {/* Central Pacing Orb */}
          <div
            className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center text-center p-4 transition-all bg-white relative z-10 shadow-2xs ${
              currentStyle.borderColor
            }`}
            style={{
              transform: `scale(${currentStyle.scale})`,
              transition: phase === 'idle' 
                ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' 
                : `transform ${currentStyle.duration}s linear`,
            }}
          >
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#a1a1aa]">
              {phase === 'idle' ? 'STANDBY' : phase.replace('-', ' ').toUpperCase()}
            </span>
            <span className={`text-2xl font-black tracking-tight ${currentStyle.colorClass}`}>
              {phase === 'idle' ? '0' : timeLeft}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex gap-3 z-10 font-mono text-[11px] uppercase">
          <button
            onClick={handlePauseToggle}
            className={`px-4 py-2 flex items-center gap-1.5 font-bold tracking-wider transition-colors cursor-pointer border ${
              phase !== 'idle'
                ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                : 'bg-white text-[#15803d] border-[#15803d] hover:bg-green-50'
            }`}
          >
            {phase !== 'idle' ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Practice</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-[#15803d]" />
                <span>Start Practice</span>
              </>
            )}
          </button>

          {phase !== 'idle' && (
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-[#d4d4d8] hover:border-[#111111] text-[#71717a] hover:text-[#111111] bg-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
