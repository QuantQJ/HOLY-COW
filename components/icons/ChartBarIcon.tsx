import React from 'react';

export const ChartBarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M3 3v18h18"></path>
    <path d="M9 17V9"></path>
    <path d="M14 17V5"></path>
    <path d="M19 17v-3"></path>
  </svg>
);
