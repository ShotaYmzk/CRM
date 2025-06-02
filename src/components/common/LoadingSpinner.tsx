import React from 'react';
import { Spinner } from '@heroui/react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', fullPage = false, message }) => {
  if (fullPage) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
        <Spinner size={size} color="primary" />
        {message && <p className="mt-4 text-foreground-500">{message}</p>}
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Spinner size={size} color="primary" />
      {message && <p className="mt-2 text-foreground-500">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
