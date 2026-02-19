
import React, { useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ target, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = target;
      if (start === end) return;

      let totalMiliseconds = duration;
      let incrementTime = (totalMiliseconds / end);

      let timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

export default Counter;
