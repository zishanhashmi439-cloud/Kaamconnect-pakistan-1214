import React from 'react';
import {
  Hammer,
  Wrench,
  Zap,
  Grid,
  LayoutTemplate,
  Paintbrush,
  Axe,
  Maximize,
  ShieldAlert,
  Truck,
  Compass,
  Bath,
  Wind,
  Flame,
  Sparkles,
  Bug,
  Trees,
  ShieldCheck,
  Tv,
  PackageCheck,
  HelpCircle,
  LucideProps
} from 'lucide-react';

interface ThreeDIconProps {
  name?: string;
  code?: string;
  categoryCode?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const CATEGORY_DEFAULT_ICONS: Record<string, string> = {
  A: 'Hammer',
  B: 'Wrench',
  C: 'Zap',
  D: 'Grid',
  E: 'LayoutTemplate',
  F: 'Paintbrush',
  G: 'Axe',
  H: 'Maximize',
  I: 'ShieldAlert',
  J: 'Truck',
  K: 'Compass',
  L: 'Bath',
  M: 'Wind',
  N: 'Flame',
  O: 'Sparkles',
  P: 'Bug',
  Q: 'Trees',
  R: 'ShieldCheck',
  S: 'Tv',
  T: 'PackageCheck',
  U: 'Hammer'
};

export const ThreeDIcon: React.FC<ThreeDIconProps> = ({
  name,
  code,
  categoryCode,
  className = '',
  size = 'md'
}) => {
  const activeCode = (code || categoryCode || 'A').toUpperCase();
  const iconName = name || CATEGORY_DEFAULT_ICONS[activeCode] || 'Hammer';
  // 3D Color Presets with rich gradients, highlights, and deep shadows
  const getGradientStyle = (code: string) => {
    switch (code.toUpperCase()) {
      case 'A': // Construction & Masonry
        return 'from-amber-500 via-orange-600 to-red-600 text-white shadow-orange-500/30';
      case 'B': // Plumbing
        return 'from-cyan-400 via-blue-500 to-indigo-600 text-white shadow-blue-500/30';
      case 'C': // Electrical
        return 'from-yellow-400 via-amber-500 to-orange-500 text-white shadow-amber-500/30';
      case 'D': // Flooring & Tiles
        return 'from-emerald-400 via-teal-500 to-cyan-600 text-white shadow-teal-500/30';
      case 'E': // Ceiling & Gypsum
        return 'from-violet-400 via-purple-500 to-indigo-600 text-white shadow-purple-500/30';
      case 'F': // Painting
        return 'from-pink-500 via-rose-500 to-red-600 text-white shadow-rose-500/30';
      case 'G': // Carpentry
        return 'from-amber-600 via-yellow-700 to-stone-800 text-white shadow-amber-700/30';
      case 'H': // Aluminium & Glass
        return 'from-sky-400 via-blue-500 to-slate-700 text-white shadow-sky-500/30';
      case 'I': // Roofing & Waterproofing
        return 'from-indigo-500 via-blue-600 to-slate-800 text-white shadow-indigo-500/30';
      case 'J': // Heavy Equipment
        return 'from-amber-400 via-orange-500 to-stone-800 text-white shadow-orange-500/30';
      case 'K': // Architecture
        return 'from-blue-600 via-indigo-700 to-slate-900 text-white shadow-blue-700/30';
      case 'L': // Kitchen & Sanitary
        return 'from-teal-400 via-emerald-500 to-cyan-700 text-white shadow-teal-500/30';
      case 'M': // HVAC & AC
        return 'from-sky-300 via-cyan-500 to-blue-600 text-white shadow-cyan-500/30';
      case 'N': // Steel & Welding
        return 'from-orange-500 via-red-600 to-zinc-800 text-white shadow-red-500/30';
      case 'O': // Cleaning
        return 'from-violet-400 via-fuchsia-500 to-pink-500 text-white shadow-fuchsia-500/30';
      case 'P': // Pest Control
        return 'from-lime-500 via-emerald-600 to-teal-800 text-white shadow-emerald-500/30';
      case 'Q': // Gardening
        return 'from-emerald-400 via-green-500 to-lime-600 text-white shadow-green-500/30';
      case 'R': // Security & Smart Home
        return 'from-blue-500 via-indigo-600 to-violet-800 text-white shadow-indigo-500/30';
      case 'S': // Appliances
        return 'from-purple-500 via-indigo-600 to-blue-700 text-white shadow-purple-500/30';
      case 'T': // Shifting & Supplies
        return 'from-orange-400 via-amber-500 to-red-600 text-white shadow-orange-500/30';
      case 'U': // Household Handyman
        return 'from-emerald-500 via-teal-600 to-cyan-800 text-white shadow-teal-500/30';
      default:
        return 'from-emerald-500 via-teal-600 to-blue-700 text-white shadow-emerald-500/30';
    }
  };

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-12 h-12 rounded-2xl',
    lg: 'w-14 h-14 rounded-2xl',
    xl: 'w-16 h-16 rounded-3xl'
  }[size];

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 28,
    xl: 32
  }[size];

  const renderIcon = () => {
    const props: LucideProps = {
      size: iconSizes,
      strokeWidth: 2.2,
      className: 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-transform group-hover:scale-110'
    };

    switch (iconName) {
      case 'Hammer': return <Hammer {...props} />;
      case 'Wrench': return <Wrench {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Grid': return <Grid {...props} />;
      case 'LayoutTemplate': return <LayoutTemplate {...props} />;
      case 'Paintbrush': return <Paintbrush {...props} />;
      case 'Axe': return <Axe {...props} />;
      case 'Maximize': return <Maximize {...props} />;
      case 'ShieldAlert': return <ShieldAlert {...props} />;
      case 'Truck': return <Truck {...props} />;
      case 'Compass': return <Compass {...props} />;
      case 'Bath': return <Bath {...props} />;
      case 'Wind': return <Wind {...props} />;
      case 'Flame': return <Flame {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Bug': return <Bug {...props} />;
      case 'Trees': return <Trees {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Tv': return <Tv {...props} />;
      case 'PackageCheck': return <PackageCheck {...props} />;
      default: return <HelpCircle {...props} />;
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center bg-gradient-to-br ${getGradientStyle(
        activeCode
      )} shadow-lg border-t border-white/40 ring-1 ring-black/5 transform active:scale-95 transition-all ${sizeClasses} ${className}`}
    >
      {/* 3D Glass Light Gloss Effect on Top Half */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent rounded-t-xl pointer-events-none" />

      {/* Subtle bottom shadow bevel */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-black/15 rounded-b-xl pointer-events-none" />

      {/* Inner Icon */}
      <div className="relative z-10 flex items-center justify-center">
        {renderIcon()}
      </div>
    </div>
  );
};
