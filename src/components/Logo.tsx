/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: { icon: 'h-8 w-8', text: 'text-sm' },
    md: { icon: 'h-10 w-10', text: 'text-lg' },
    lg: { icon: 'h-14 w-14', text: 'text-2xl' }
  };

  const selectedSize = sizeClasses[size];

  return (
    <div className={`flex items-center gap-3 font-sans ${className}`} id="logo-container">
      <svg
        className={`${selectedSize.icon} text-[#C9A227] transition-transform duration-500 hover:rotate-180`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="logo-svg"
      >
        {/* Outer Hexagon/Octagon or Luxury Frame */}
        <path
          d="M50 5 L90 28.1 V71.9 L50 95 L10 71.9 V28.1 L50 5 Z"
          stroke="#C9A227"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Architectural Arch Lines inside */}
        <path
          d="M30 70 V45 C30 34 39 25 50 25 C61 25 70 34 70 45 V70"
          stroke="#C9A227"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Inner Chevron/Monogram Lines */}
        <path
          d="M38 52 L50 40 L62 52"
          stroke="#FAF9F6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M50 40 V75"
          stroke="#C9A227"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Small Elegant Dots */}
        <circle cx="50" cy="15" r="2.5" fill="#C9A227" />
        <circle cx="30" cy="70" r="2" fill="#C9A227" />
        <circle cx="70" cy="70" r="2" fill="#C9A227" />
      </svg>
      
      {showText && (
        <div className="flex flex-col leading-tight" id="logo-text-group">
          <span className={`${selectedSize.text} tracking-[0.25em] font-medium text-white uppercase font-sans`}>
            CHOUDHARY
          </span>
          <span className="text-[9px] tracking-[0.4em] text-[#C9A227] font-medium uppercase">
            INTERIOR STUDIO
          </span>
        </div>
      )}
    </div>
  );
}
