import React, { useState, useEffect, useRef } from 'react';

const CountingAnimation = ({ start, separator, currency, end, duration }) => {
  const endRef = useRef(end);
  const [count, setCount] = useState(start);
  const stepValue = (end - start) / (duration / 50); // Adjust the duration by dividing with 50

  useEffect(() => {
    endRef.current = end; // Update the endRef whenever end prop changes
  }, [end]);

  useEffect(() => {
    let animationFrameId = null;
    let nextCount = start;

    const animateCount = () => {
      nextCount += stepValue;

      if (
        (stepValue > 0 && nextCount >= endRef.current) ||
        (stepValue < 0 && nextCount <= endRef.current)
      ) {
        setCount(endRef.current); // Set count to the exact end value
      } else {
        setCount(nextCount);
        animationFrameId = requestAnimationFrame(animateCount);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => cancelAnimationFrame(animationFrameId);
  }, [start, stepValue]);

  const formatValueWithSuffix = (value) => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      return value; // Return the original value if it's not a number
    }

    if (numericValue >= 1000 && numericValue < 1000000) {
      // Format values in the thousands range
      return (numericValue / 1000).toFixed(1) + ' K';
    } else if (numericValue >= 1000000) {
      // Format values in the millions range and beyond
      return (numericValue / 1000000).toFixed(1) + ' M';
    }

    return numericValue.toFixed(0);
  };

  return (
    <div>
      <span>
        {currency}
        {formatValueWithSuffix(count).replace('.', separator)}
      </span>
    </div>
  );
};

export default CountingAnimation;
