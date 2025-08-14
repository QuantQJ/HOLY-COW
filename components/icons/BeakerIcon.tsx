import React from 'react';

export const BeakerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M4.5 3h15"></path>
    <path d="M6 3v16a2 2 0 002 2h8a2 2 0 002-2V3"></path>
    <path d="M6 14h12"></path>
  </svg>
);
