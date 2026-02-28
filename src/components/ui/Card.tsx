import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClass = hover
    ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer'
    : 'transition-shadow duration-200 hover:shadow-md';

  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm ${paddingClasses[padding]} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};
