// src/components/ui/button.jsx
import React from 'react';

export const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
