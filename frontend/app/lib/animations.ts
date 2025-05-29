// Common animation variants for consistent page animations
export const easeCurve = [0.25, 0.1, 0.25, 1]; // Smooth, elegant easing

// Base animation for all main content sections
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
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
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// For child items in staggered sections
export const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

// Container variant for page sections
export const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Hook creation helper for scroll animations (can be used if preferred)
// export const createScrollAnimationProps = (inView: boolean) => ({
//   initial: "hidden",
//   animate: inView ? "visible" : "hidden",
//   variants: fadeUp
// }); 