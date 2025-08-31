import type { FC } from 'react';

const LoadingFallback: FC = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="spinner"></div>
  </div>
);

export default LoadingFallback;
