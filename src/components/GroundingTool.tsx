import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw, Heart, Sparkles } from 'lucide-react';

export const GroundingTool: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [seconds, setSeconds] = useState(4);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            // Cycle phases
            setPhase((currentPhase) => {
              if (currentPhase === 'Inhale') return 'Hold';
              if (currentPhase === 'Hold') return 'Exhale';
              if (currentPhase === 'Exhale') return 'Rest';
              return 'Inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const reset = () => {
    setIsActive(false);
    setPhase('Inhale');
    setSeconds(4);
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'Inhale':
        return 'Gently breathe in through your nose... expand your belly.';
      case 'Hold':
        return 'Softly hold without straining your throat or chest.';
      case 'Exhale':
        return 'Slow, audible sigh out through your mouth... soften your jaw.';
      case 'Rest':
        return 'Rest in the natural stillness before the next breath.';
    }
  };

  return (
    <div className="my-14 bg-gradient-to-br from-[#FAF9F6] to-[#F3EEE7] border border-[#EAE5DC] rounded-3xl p-6 sm:p-8 shadow-luxe max-w-2xl mx-auto text-center">
      <div className="inline-flex items-center space-x-1.5 bg-[#8A9A86]/15 text-[#5C6E59] text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
        <Wind className="w-3.5 h-3.5" />
        <span>Interactive Somatic Breath Reset</span>
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2D2A26] mb-2">
        Try the 60-Second Vagus Nerve Anchor
      </h3>
      <p className="text-xs sm:text-sm text-[#736E67] font-light max-w-md mx-auto mb-6">
        When your thoughts run in circles, signal safety directly to your physiology.
      </p>

      {/* Breathing Circle Indicator */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto my-5 sm:my-6 flex items-center justify-center">
        {/* Pulsing ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 transition-all duration-1000 ${
            phase === 'Inhale'
              ? 'scale-110 border-[#8A9A86] bg-[#8A9A86]/10'
              : phase === 'Hold'
              ? 'scale-110 border-[#E3A88D] bg-[#E3A88D]/15'
              : phase === 'Exhale'
              ? 'scale-90 border-[#C05746] bg-[#C05746]/10'
              : 'scale-95 border-[#DDD8CF] bg-transparent'
          }`}
        />

        {/* Center Text */}
        <div className="relative z-10 text-center">
          <span className="font-serif text-xl sm:text-2xl font-semibold text-[#2D2A26] block">
            {isActive ? phase : 'Ready'}
          </span>
          <span className="text-[11px] sm:text-xs text-[#8A9A86] font-mono font-medium block mt-0.5">
            {isActive ? `${seconds}s` : 'Box Breath (4-4-4-4)'}
          </span>
        </div>
      </div>

      <p className="text-xs sm:text-sm font-serif italic text-[#524D46] min-h-[2.5rem] flex items-center justify-center mb-5 px-2">
        {isActive ? getPhaseInstruction() : 'Click Start to begin your somatic calming cycle.'}
      </p>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-3">
        <button
          onClick={() => setIsActive(!isActive)}
          className="inline-flex items-center justify-center space-x-2 bg-[#8A9A86] hover:bg-[#778873] active:bg-[#6c7d68] text-white px-6 py-3 rounded-full text-xs font-medium shadow-sm transition-all min-h-[44px] active:scale-95"
        >
          {isActive ? (
            <>
              <Pause className="w-3.5 h-3.5 shrink-0" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 shrink-0" />
              <span>Start Breath Anchor</span>
            </>
          )}
        </button>

        {isActive && (
          <button
            onClick={reset}
            className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#736E67] hover:text-[#2D2A26] active:bg-[#EDE8E0] rounded-full border border-[#DDD8CF] hover:bg-white transition-all text-xs"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
          </button>
        )}
      </div>
    </div>
  );
};
