
import React, { useState } from 'react';

export const LOGO_URL = "/logo.svg";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
}

const SafeImage: React.FC<SafeImageProps> = ({ src, alt, className }) => {
  const [error, setError] = useState(false);

  return (
    <img 
      src={error ? LOGO_URL : src} 
      alt={alt} 
      className={`${className} ${error ? 'object-contain p-4 bg-gray-50' : 'object-cover'}`}
      onError={() => setError(true)}
    />
  );
};

export default SafeImage;
