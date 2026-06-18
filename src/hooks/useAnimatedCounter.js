import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Animates a number from 0 to target inside the referenced element.
 * @param {number} target - final value
 * @param {object} options
 * @param {number} options.duration - animation duration in seconds
 * @param {string} options.suffix - text appended after number
 * @param {string} options.prefix - text prepended before number
 * @param {boolean} options.localize - use Indian locale formatting
 * @returns {{ ref: React.RefObject }}
 */
export function useAnimatedCounter(target, options = {}) {
  const ref = useRef(null);
  const { duration = 1.4, suffix = '', prefix = '', localize = true } = options;

  useEffect(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) {
          const formatted = localize
            ? Math.round(obj.val).toLocaleString('en-IN')
            : Math.round(obj.val).toString();
          ref.current.textContent = prefix + formatted + suffix;
        }
      },
    });
  }, [target, duration, suffix, prefix, localize]);

  return { ref };
}
