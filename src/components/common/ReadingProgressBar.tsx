import React, { useState, useEffect } from 'react';

interface ReadingProgressBarProps {
  /** Optional title or section label to display alongside progress indicator */
  label?: string;
  /** Whether to show a compact percentage indicator pill */
  showPercentage?: boolean;
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  label,
  showPercentage = false,
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const currentProgress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
            setProgress(currentProgress);
            setIsVisible(window.scrollY > 40);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Top Fixed Gradient Reading Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 h-1 sm:h-[3.5px] bg-slate-200/40 dark:bg-slate-800/40 backdrop-blur-sm pointer-events-none transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        id="reading-progress-track"
      >
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(37,99,235,0.75)] transition-all duration-75 ease-out"
          style={{ width: `${progress}%` }}
          id="reading-progress-bar"
        />
      </div>

      {/* Floating Micro-Badge on bottom or side when reading */}
      {showPercentage && isVisible && (
        <div
          className="fixed bottom-6 right-6 z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/85 dark:bg-slate-900/90 text-white backdrop-blur-md border border-slate-700/60 shadow-xl text-[11px] font-mono font-bold tracking-wider animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none select-none"
          id="reading-percentage-badge"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          {label && <span className="text-slate-400 border-r border-slate-700 pr-2 max-w-[140px] truncate">{label}</span>}
          <span className="text-sky-400">{Math.round(progress)}% READ</span>
        </div>
      )}
    </>
  );
};
