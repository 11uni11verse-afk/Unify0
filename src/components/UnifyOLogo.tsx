import type { SVGProps } from 'react';

interface UnifyOLogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
  animated?: boolean;
}

const UnifyOLogo = ({ size = 48, animated = false, className = "", ...props }: UnifyOLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Gradient Definitions */}
      <defs>
        {/* Primary Gradient - Coral to Teal */}
        <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(16, 100%, 66%)" />
          <stop offset="50%" stopColor="hsl(16, 90%, 60%)" />
          <stop offset="100%" stopColor="hsl(195, 100%, 39%)" />
        </linearGradient>
        
        {/* Secondary Gradient - Teal to Coral */}
        <linearGradient id="secondaryGradient" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(195, 100%, 39%)" />
          <stop offset="50%" stopColor="hsl(180, 80%, 50%)" />
          <stop offset="100%" stopColor="hsl(16, 100%, 66%)" />
        </linearGradient>
        
        {/* Accent Gradient - Sunray */}
        <linearGradient id="accentGradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="hsl(48, 100%, 67%)" />
          <stop offset="100%" stopColor="hsl(43, 100%, 60%)" />
        </linearGradient>

        {/* Radial Gradient for Glow */}
        <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(16, 100%, 66%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(16, 100%, 66%)" stopOpacity="0" />
        </radialGradient>

        {/* Filter for shadow */}
        <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Animated Glow Background */}
      {animated && (
        <circle cx="60" cy="60" r="50" fill="url(#glowGradient)">
          <animate attributeName="r" values="45;52;45" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
      )}
      
      {/* Outer Ring - World Connection */}
      <circle 
        cx="60" 
        cy="60" 
        r="45" 
        stroke="url(#primaryGradient)" 
        strokeWidth="2.5" 
        fill="none"
        strokeDasharray="8 6"
        opacity="0.4"
        filter="url(#softShadow)"
      >
        {animated && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 60 60"
            to="360 60 60"
            dur="40s"
            repeatCount="indefinite"
          />
        )}
      </circle>

      {/* Background Shape - Soft Circle */}
      <circle 
        cx="60" 
        cy="60" 
        r="38" 
        fill="white"
        filter="url(#softShadow)"
      />

      {/* Letter "U" - Left Side */}
      <path
        d="M 32 35 L 32 55 Q 32 68 42 68 L 48 68"
        stroke="url(#primaryGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Letter "U" - Right Side */}
      <path
        d="M 72 68 L 78 68 Q 88 68 88 55 L 88 35"
        stroke="url(#primaryGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Center "O" - Unity Symbol */}
      <circle 
        cx="60" 
        cy="60" 
        r="16" 
        stroke="url(#secondaryGradient)" 
        strokeWidth="5" 
        fill="white"
      />

      {/* Inner Core - Connection Point */}
      <circle 
        cx="60" 
        cy="60" 
        r="7" 
        fill="url(#accentGradient)"
      >
        {animated && (
          <>
            <animate attributeName="r" values="7;8;7" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.8;1" dur="2s" repeatCount="indefinite" />
          </>
        )}
      </circle>

      {/* Connection Nodes - 6 points (representing global diversity) */}
      <g opacity="0.9">
        {/* Top */}
        <circle cx="60" cy="20" r="4" fill="hsl(16, 100%, 66%)">
          {animated && <animate attributeName="r" values="4;5;4" dur="2s" begin="0s" repeatCount="indefinite" />}
        </circle>
        {/* Top Right */}
        <circle cx="85" cy="35" r="4" fill="hsl(195, 100%, 39%)">
          {animated && <animate attributeName="r" values="4;5;4" dur="2s" begin="0.3s" repeatCount="indefinite" />}
        </circle>
        {/* Bottom Right */}
        <circle cx="85" cy="85" r="4" fill="hsl(48, 100%, 67%)">
          {animated && <animate attributeName="r" values="4;5;4" dur="2s" begin="0.6s" repeatCount="indefinite" />}
        </circle>
        {/* Bottom */}
        <circle cx="60" cy="100" r="4" fill="hsl(16, 100%, 66%)">
          {animated && <animate attributeName="r" values="4;5;4" dur="2s" begin="0.9s" repeatCount="indefinite" />}
        </circle>
        {/* Bottom Left */}
        <circle cx="35" cy="85" r="4" fill="hsl(195, 100%, 39%)">
          {animated && <animate attributeName="r" values="4;5;4" dur="2s" begin="1.2s" repeatCount="indefinite" />}
        </circle>
        {/* Top Left */}
        <circle cx="35" cy="35" r="4" fill="hsl(48, 100%, 67%)">
          {animated && <animate attributeName="r" values="4;5;4" dur="2s" begin="1.5s" repeatCount="indefinite" />}
        </circle>
      </g>

      {/* Connecting Lines to Center */}
      <g opacity="0.3" stroke="url(#primaryGradient)" strokeWidth="1.5">
        <line x1="60" y1="20" x2="60" y2="44" />
        <line x1="85" y1="35" x2="72" y2="48" />
        <line x1="85" y1="85" x2="72" y2="72" />
        <line x1="60" y1="100" x2="60" y2="76" />
        <line x1="35" y1="85" x2="48" y2="72" />
        <line x1="35" y1="35" x2="48" y2="48" />
      </g>
    </svg>
  );
};

export default UnifyOLogo;