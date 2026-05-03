import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className, size = 48 }: LogoProps) {
  return (
    <div 
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
      >
        {/* Metallic Hexagon Frame */}
        <path
          d="M50 5L89 27.5V72.5L50 95L11 72.5V27.5L50 5Z"
          fill="#0B132B"
          stroke="url(#goldGradient)"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        
        {/* Inner Shadow/Depth for Hexagon */}
        <path
          d="M50 10L84.5 30V70L50 90L15.5 70V30L50 10Z"
          fill="#050a17"
        />

        {/* Bar Chart (Subtle Gold/Navy) */}
        <rect x="35" y="55" width="8" height="15" rx="1" fill="#1C2541" />
        <rect x="47" y="48" width="8" height="22" rx="1" fill="#2d3b55" />
        <rect x="59" y="40" width="8" height="30" rx="1" fill="#7a8b99" />

        {/* Rising Arrow (Gold) */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          d="M30 65 L45 50 L55 58 L75 35"
          stroke="url(#goldGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.path
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.3 }}
          d="M68 35 H75 V42"
          stroke="url(#goldGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>
      </svg>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full -z-10 animate-pulse"></div>
    </div>
  );
}
