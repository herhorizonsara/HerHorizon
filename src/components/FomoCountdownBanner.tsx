import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, ShieldCheck } from 'lucide-react';

export const FomoCountdownBanner: React.FC = () => {
  // 14 minutes, 59 seconds gentle countdown
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 59);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#FAF6F2] border-b border-[#E8DCD5] py-2.5 px-4 text-center relative z-30">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-medium text-[#2D2A26]">
        
        <div className="flex items-center space-x-1.5 text-[#BD7469]">
          <Sparkles className="w-3.5 h-3.5 text-[#E2B072]" />
          <span className="font-semibold uppercase tracking-wider text-[11px]">Sisterhood 50% Launch Special</span>
        </div>

        <span className="text-[#D4C5BC] hidden sm:inline">•</span>

        <span className="text-[#736E67]">
          Code <strong className="text-[#2D2A26] font-mono bg-white px-1.5 py-0.5 rounded border border-[#E8DCD5]">REBUILD50</strong> reserves your $13 rate:
        </span>

        <div className="inline-flex items-center space-x-1 text-[#BD7469] font-mono font-bold bg-white px-2.5 py-0.5 rounded-full border border-[#E8DCD5] shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-[#D4A373]" />
          <span>{formatTime(timeLeft)}</span>
        </div>

      </div>
    </div>
  );
};
