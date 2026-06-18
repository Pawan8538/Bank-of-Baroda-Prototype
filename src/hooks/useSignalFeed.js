import { useState, useEffect } from 'react';

/**
 * Progressively populates signals array at 300ms intervals.
 * @param {Array} scenarioSignals - array of signal objects from scenarios.json
 * @returns {{ signals: Array, isComplete: boolean }}
 */
export function useSignalFeed(scenarioSignals = []) {
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    setSignals([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i >= scenarioSignals.length) {
        clearInterval(interval);
        return;
      }
      setSignals((prev) => [...prev, scenarioSignals[i++]]);
    }, 350);

    return () => clearInterval(interval);
  }, [JSON.stringify(scenarioSignals)]);

  return {
    signals,
    isComplete: signals.length === scenarioSignals.length && scenarioSignals.length > 0,
  };
}
