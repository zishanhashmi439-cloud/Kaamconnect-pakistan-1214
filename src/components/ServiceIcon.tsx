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

interface ServiceIconProps extends LucideProps {
  name: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'Hammer':
      return <Hammer {...props} />;
    case 'Wrench':
      return <Wrench {...props} />;
    case 'Zap':
      return <Zap {...props} />;
    case 'Grid':
      return <Grid {...props} />;
    case 'LayoutTemplate':
      return <LayoutTemplate {...props} />;
    case 'Paintbrush':
      return <Paintbrush {...props} />;
    case 'Axe':
      return <Axe {...props} />;
    case 'Maximize':
      return <Maximize {...props} />;
    case 'ShieldAlert':
      return <ShieldAlert {...props} />;
    case 'Truck':
      return <Truck {...props} />;
    case 'Compass':
      return <Compass {...props} />;
    case 'Bath':
      return <Bath {...props} />;
    case 'Wind':
      return <Wind {...props} />;
    case 'Flame':
      return <Flame {...props} />;
    case 'Sparkles':
      return <Sparkles {...props} />;
    case 'Bug':
      return <Bug {...props} />;
    case 'Trees':
      return <Trees {...props} />;
    case 'ShieldCheck':
      return <ShieldCheck {...props} />;
    case 'Tv':
      return <Tv {...props} />;
    case 'PackageCheck':
      return <PackageCheck {...props} />;
    default:
      return <HelpCircle {...props} />;
  }
};
