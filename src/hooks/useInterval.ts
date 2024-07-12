import { useEffect, useRef } from 'react';

// Custom hook to manage intervals
const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>();

  // Save the latest callback function in the ref
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) savedCallback.current(); // Call the saved callback
    };

    if (delay !== null) { // If delay is set
      const id = setInterval(tick, delay); // Start the interval
      return () => clearInterval(id); // Clean up the interval on unmount
    }
  }, [delay]);
};

export default useInterval;
