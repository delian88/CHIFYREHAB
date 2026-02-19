
import React, { useState, useEffect } from 'react';
import { useInView, animate } from 'framer-motion';

interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ target, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (value) => setCount(Math.floor(value)),
      });
      return () => controls.stop();
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export default Counter;
