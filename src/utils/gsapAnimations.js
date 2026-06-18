import gsap from 'gsap';

/**
 * Animate SVG arc stroke-dashoffset from full circumference to filled length
 * @param {React.RefObject} arcRef - ref to the foreground SVG circle element
 * @param {number} score - 0-100
 * @param {string} hex - stroke colour hex
 */
export function gaugeAnim(arcRef, score, hex) {
  const circumference = 2 * Math.PI * 80; // radius = 80
  const filledLength = (score / 100) * circumference;
  const startOffset = circumference;
  const endOffset = circumference - filledLength;

  if (arcRef.current) {
    gsap.fromTo(
      arcRef.current,
      { strokeDashoffset: startOffset },
      {
        strokeDashoffset: endOffset,
        duration: 1.5,
        ease: 'power2.out',
      }
    );
    if (hex) {
      gsap.set(arcRef.current, { stroke: hex });
    }
  }
}

/**
 * Animate a number count-up
 * @param {React.RefObject} ref - ref to the DOM element
 * @param {number} target - the final number value
 * @param {number} duration - animation duration in seconds
 * @param {string} suffix - optional suffix (%, etc.)
 */
export function counterAnim(ref, target, duration = 1.2, suffix = '') {
  if (!ref.current) return;
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      if (ref.current) {
        ref.current.textContent = Math.round(obj.val).toLocaleString('en-IN') + suffix;
      }
    },
  });
}

/**
 * Animate timeline vertical line drawing down
 * @param {React.RefObject} lineRef
 * @param {number} duration
 */
export function timelineDraw(lineRef, duration = 2) {
  if (!lineRef.current) return;
  gsap.fromTo(
    lineRef.current,
    { scaleY: 0, transformOrigin: 'top center' },
    { scaleY: 1, duration, ease: 'none' }
  );
}

/**
 * Animate a progress ring (SVG circle) for blink verification
 * @param {React.RefObject} ringRef
 * @param {Function} onComplete
 */
export function blinkRingAnim(ringRef, onComplete) {
  if (!ringRef.current) return;
  const circumference = 2 * Math.PI * 54;
  gsap.fromTo(
    ringRef.current,
    { strokeDashoffset: circumference },
    {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power1.inOut',
      onComplete,
    }
  );
}

/**
 * Animate border pulsing (ProtectionMode)
 * @param {React.RefObject} ref
 */
export function borderPulseAnim(ref) {
  if (!ref.current) return;
  gsap.to(ref.current, {
    opacity: 0.3,
    duration: 0.8,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  });
}

/**
 * Stagger fade-in for signal feed items
 * @param {string} selector - CSS selector
 */
export function signalStaggerAnim(selector) {
  gsap.fromTo(
    selector,
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
  );
}

/**
 * Animate map connection line stroke-dashoffset
 * @param {React.RefObject} lineRef
 */
export function mapLineAnim(lineRef) {
  if (!lineRef.current) return;
  const len = lineRef.current.getTotalLength?.() || 300;
  gsap.set(lineRef.current, { strokeDasharray: len, strokeDashoffset: len });
  gsap.to(lineRef.current, {
    strokeDashoffset: 0,
    duration: 0.8,
    delay: 0.5,
    ease: 'power2.out',
  });
}
