// Common animation variants for consistent page animations
export const easeCurve = [0.25, 0.1, 0.25, 1]; // Smooth, elegant easing

// Animation variants for general page and component animations
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1
    }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

// Stagger effect for lists and grids
export const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

// Individual item animation for staggered lists
export const itemVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

// Card/Container animations
export const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 30px -10px rgba(16, 185, 129, 0.2)",
    borderColor: "rgba(16, 185, 129, 0.5)",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15
    }
  }
};

// Container variant for page sections and main content areas
export const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1
    }
  }
};

// Network animations for the intelligent network metaphor
export const networkLines = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { 
      duration: 1.5, 
      ease: "easeInOut" 
    }
  }
};

export const networkNode = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 500,
      damping: 30,
      delay: 0.5
    }
  },
  pulse: {
    scale: [1, 1.1, 1],
    boxShadow: [
      "0 0 0 0 rgba(16, 185, 129, 0)",
      "0 0 0 10px rgba(16, 185, 129, 0.3)",
      "0 0 0 0 rgba(16, 185, 129, 0)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Notification and alert animations
export const notificationBell = {
  initial: { rotate: 0 },
  ring: {
    rotate: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

export const notificationBadge = {
  initial: { scale: 0 },
  visible: { 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 20
    }
  },
  pulse: {
    scale: [1, 1.2, 1],
    boxShadow: [
      "0 0 0 0 rgba(16, 185, 129, 0.7)",
      "0 0 0 5px rgba(16, 185, 129, 0)",
      "0 0 0 0 rgba(16, 185, 129, 0)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Loader/progress animations
export const circularProgress = {
  initial: { rotate: 0, pathLength: 0 },
  animate: { 
    rotate: 360, 
    pathLength: 1,
    transition: {
      rotate: {
        duration: 2,
        ease: "linear",
        repeat: Infinity
      },
      pathLength: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  }
};

export const linearProgress = {
  initial: { width: "0%" },
  animate: { 
    width: "100%",
    transition: {
      duration: 1.5,
      ease: "easeInOut"
    }
  }
};

// Form input animations
export const formInputFocus = {
  initial: { 
    boxShadow: "0 0 0 0 rgba(16, 185, 129, 0)" 
  },
  focus: { 
    boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.3)",
    borderColor: "rgba(16, 185, 129, 0.5)",
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

// Button animations
export const buttonVariant = {
  initial: { 
    boxShadow: "0 0 0 0 rgba(16, 185, 129, 0)" 
  },
  hover: { 
    y: -2,
    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15
    }
  },
  tap: {
    scale: 0.98,
    y: 0,
    boxShadow: "0 0 0 0 rgba(16, 185, 129, 0)",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15
    }
  }
};

// Emerald pulse animation
export const emeraldPulse = {
  initial: { 
    boxShadow: "0 0 0 0 rgba(16, 185, 129, 0)" 
  },
  pulse: {
    boxShadow: [
      "0 0 0 0 rgba(16, 185, 129, 0)",
      "0 0 0 10px rgba(16, 185, 129, 0.2)",
      "0 0 0 0 rgba(16, 185, 129, 0)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Chart and data visualization animations
export const chartBar = {
  initial: { height: 0, opacity: 0 },
  animate: (custom: number) => ({
    height: "100%",
    opacity: 1,
    transition: {
      height: {
        duration: 0.8,
        delay: custom * 0.1,
        ease: "easeOut"
      },
      opacity: {
        duration: 0.3,
        delay: custom * 0.1
      }
    }
  })
};

export const chartLine = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 1.5,
        ease: "easeInOut"
      },
      opacity: {
        duration: 0.5
      }
    }
  }
};

// Loading states and transitions
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

export const contentLoader = {
  initial: { opacity: 0.6 },
  animate: { 
    opacity: [0.6, 0.8, 0.6],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Tooltip and popup animations
export const tooltipVariant = {
  initial: { opacity: 0, y: 5, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  },
  exit: { 
    opacity: 0, 
    y: 5, 
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: "easeOut"
    }
  }
};

// Sidebar/navigation animations
export const sidebarVariant = {
  closed: { x: "-100%" },
  open: { 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.05
    }
  }
};

export const sidebarItemVariant = {
  closed: { x: -20, opacity: 0 },
  open: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

// Document/content processing animations
export const documentScanAnimation = {
  initial: { y: 0, opacity: 0.3 },
  animate: { 
    y: ["0%", "100%", "0%"], 
    opacity: [0.3, 1, 0.3],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      },
      opacity: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    }
  }
};

// Hook creation helper for scroll animations (can be used if preferred)
// export const createScrollAnimationProps = (inView: boolean) => ({
//   initial: "hidden",
//   animate: inView ? "visible" : "hidden",
//   variants: fadeUp
// }); 