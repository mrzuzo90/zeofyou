
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

export type IconName = keyof typeof LucideIcons;

// Add common Lucide props explicitly, even if they should be inherited.
// This is a targeted fix for the properties mentioned in errors or commonly used.
interface IconProps extends LucideProps {
  name: IconName;
  // FIX: Explicitly define size to address TS error, ensuring Icon component accepts 'size' prop.
  size?: number | string; 
}

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const LucideIcon = LucideIcons[name] as React.FC<LucideProps>;
  if (!LucideIcon) {
    // Fallback icon or null
    const FallbackIcon = LucideIcons['HelpCircle'];
    return <FallbackIcon {...props} />;
  }
  return <LucideIcon {...props} />;
};

export default Icon;