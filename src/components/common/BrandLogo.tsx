import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'mark-only' | 'light' | 'white';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  className = '',
  size = 'md',
}) => {
  const sizeMap = {
    sm: { height: 28, markSize: 28, textScale: 'text-sm' },
    md: { height: 40, markSize: 40, textScale: 'text-base' },
    lg: { height: 56, markSize: 56, textScale: 'text-xl' },
    xl: { height: 72, markSize: 72, textScale: 'text-2xl' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const isLight = variant === 'light' || variant === 'white';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`} id="swanaya-brand-logo">
      {/* Official Swanaya Winged Monogram SVG */}
      <svg
        width={currentSize.markSize * 1.5}
        height={currentSize.markSize}
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="swanayaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient id="swanayaLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        {/* Left Wing Geometric Accent */}
        <path
          d="M 5 20 L 22 20 L 32 46 L 22 46 L 15 28 L 5 28 Z"
          fill={isLight ? 'url(#swanayaLightGrad)' : 'url(#swanayaGrad)'}
        />
        <path
          d="M 18 20 L 32 20 L 40 40 L 34 40 L 28 26 L 18 26 Z"
          fill={isLight ? 'url(#swanayaLightGrad)' : 'url(#swanayaGrad)'}
        />

        {/* Right Wing Geometric Accent */}
        <path
          d="M 115 20 L 98 20 L 88 46 L 98 46 L 105 28 L 115 28 Z"
          fill={isLight ? 'url(#swanayaLightGrad)' : 'url(#swanayaGrad)'}
        />
        <path
          d="M 102 20 L 88 20 L 80 40 L 86 40 L 92 26 L 102 26 Z"
          fill={isLight ? 'url(#swanayaLightGrad)' : 'url(#swanayaGrad)'}
        />

        {/* Central Monogram Ring Outer */}
        <circle
          cx="60"
          cy="38"
          r="26"
          stroke={isLight ? 'url(#swanayaLightGrad)' : 'url(#swanayaGrad)'}
          strokeWidth="3.5"
          fill="none"
        />

        {/* Central Monogram Ring Inner */}
        <circle
          cx="60"
          cy="38"
          r="20"
          stroke={isLight ? 'url(#swanayaLightGrad)' : 'url(#swanayaGrad)'}
          strokeWidth="1.8"
          strokeDasharray="2 1"
          fill="none"
          opacity="0.6"
        />

        {/* Stylized Interwoven 'S' Monogram Bar */}
        <path
          d="M 45 32 C 45 25, 75 25, 75 32 L 60 32 L 60 38 L 75 38 C 75 48, 45 48, 45 40 L 58 40 L 58 35 L 45 35 Z"
          fill={isLight ? 'url(#swanayaLightGrad)' : 'url(#swanayaGrad)'}
        />
        <line
          x1="52"
          y1="38"
          x2="68"
          y2="38"
          stroke={isLight ? '#ffffff' : '#1e3a8a'}
          strokeWidth="2"
        />
      </svg>

      {/* Typography Section */}
      {variant !== 'mark-only' && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-black tracking-[0.18em] uppercase ${
              isLight ? 'text-white' : 'text-slate-900 dark:text-white'
            } ${currentSize.textScale}`}
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            SWANAYA
          </span>
          <span
            className={`font-semibold tracking-[0.24em] text-[0.62em] uppercase mt-0.5 ${
              isLight ? 'text-blue-200' : 'text-blue-600 dark:text-blue-400'
            }`}
          >
            MEDIA ENTERPRISES
          </span>
        </div>
      )}
    </div>
  );
};
