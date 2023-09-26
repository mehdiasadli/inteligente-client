import { useInterval } from '@mantine/hooks';
import { useState } from 'react';

export const useTimer = (): [
  number,
  {
    interval: {
      start: () => void;
      stop: () => void;
      toggle: () => void;
      active: boolean;
    };
    reset: () => void;
  },
  React.Dispatch<React.SetStateAction<number>>
] => {
  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(() => setSeconds((s) => s + 0.1), 100);

  function reset() {
    setSeconds(0);
  }

  return [seconds, { interval, reset }, setSeconds];
};
