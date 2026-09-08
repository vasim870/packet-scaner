import React, { useState } from 'react';
import { Scale } from 'lucide-react';

interface AppLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  rounded?: 'md' | 'lg' | 'xl' | '2xl' | 'full';
  showBadge?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 'md',
  className = '',
  rounded = 'xl',
  showBadge = false
}) => {
  const [imgError, setImgError] = useState(false);

  // Size mapping for container
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const roundedMap = {
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full'
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden shadow-xs border border-emerald-600/30 ${sizeMap[size]} ${roundedMap[rounded]} ${className}`}
    >
      {!imgError ? (
        <img
          src="/app-logo.jpg"
          alt="Packet Scanner Official Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover select-none"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-tr from-emerald-900 via-emerald-800 to-teal-700 text-white flex items-center justify-center">
          <Scale className="w-1/2 h-1/2 text-amber-300 drop-shadow-sm" />
        </div>
      )}

      {showBadge && (
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full" />
      )}
    </div>
  );
};
