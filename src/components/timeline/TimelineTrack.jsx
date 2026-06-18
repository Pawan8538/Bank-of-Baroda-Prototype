import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { timelineDraw } from '@/utils/gsapAnimations';
import TimelineEvent from './TimelineEvent';

export default function TimelineTrack({ events = [], selectedId, onSelect }) {
  const lineRef = useRef(null);

  useEffect(() => {
    timelineDraw(lineRef, 2);
  }, []);

  return (
    <div className="relative flex flex-col gap-0 pl-8">
      {/* Vertical line */}
      <div
        ref={lineRef}
        className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-navy-600 to-transparent"
        style={{ transformOrigin: 'top center' }}
      />

      {events.map((event, i) => (
        <TimelineEvent
          key={event.t + i}
          event={event}
          index={i}
          isSelected={selectedId === event.t}
          onSelect={() => onSelect(event.t)}
        />
      ))}
    </div>
  );
}
