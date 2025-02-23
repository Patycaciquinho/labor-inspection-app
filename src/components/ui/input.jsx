// src/components/ui/input.jsx
import React from 'react';

export const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full px-3 py-2 border rounded-md ${className}`}
      {...props}
    />
  );
};
