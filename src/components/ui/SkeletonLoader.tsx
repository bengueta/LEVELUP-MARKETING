'use client';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'card' | 'circle' | 'rect';
  width?: string;
  height?: string;
}

export default function SkeletonLoader({ 
  className = '', 
  variant = 'rect',
  width,
  height 
}: SkeletonLoaderProps) {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-[#1a1a1e] via-[#242428] to-[#1a1a1e] bg-[length:200%_100%]';
  
  const variantClasses = {
    text: 'h-4 rounded',
    card: 'h-48 rounded-2xl',
    circle: 'rounded-full',
    rect: 'rounded',
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        width: width || (variant === 'circle' ? '48px' : '100%'),
        height: height || (variant === 'circle' ? '48px' : undefined),
        animation: 'shimmer 2s infinite',
      }}
    />
  );
}

