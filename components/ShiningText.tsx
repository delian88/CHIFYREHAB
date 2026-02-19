
import React from 'react';

interface ShiningTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span';
}

const ShiningText: React.FC<ShiningTextProps> = ({ text, className = "", as = "span" }) => {
  const Component = as;
  return (
    <Component className={`shining-text font-extrabold ${className}`}>
      {text}
    </Component>
  );
};

export default ShiningText;
