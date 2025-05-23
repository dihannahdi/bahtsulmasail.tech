// Common animation variants for consistent page animations
export const easeCurve = [0.25, 0.1, 0.25, 1]; // Smooth, elegant easing

// Base animation for all main content sections
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: easeCurve }
  }
};

// For highlighted elements, cards, and quotes
export const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.7, ease: easeCurve }
  }
};

// For staggered container elements
export const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      ease: easeCurve
    }
  }
};

// For child items in staggered sections
export const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: easeCurve }
  }
};

// Container variant for page sections
export const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
      duration: 0.5,
      ease: easeCurve
    }
  }
};

// Hook creation helper for scroll animations
export const createScrollAnimationProps = (inView: boolean) => ({
  initial: "hidden",
  animate: inView ? "visible" : "hidden",
  variants: fadeUp
}); 