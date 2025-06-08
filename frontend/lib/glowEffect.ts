// Glow effect utility functions for UI elements

export const applyGlow = (element: HTMLElement | null, options?: {
  color?: string;
  intensity?: number;
  duration?: number;
}) => {
  if (!element) return;

  const {
    color = '#3b82f6', // Default blue color
    intensity = 0.5,
    duration = 300
  } = options || {};

  // Apply glow effect using CSS box-shadow
  element.style.transition = `box-shadow ${duration}ms ease-in-out`;
  element.style.boxShadow = `0 0 ${20 * intensity}px ${color}${Math.round(intensity * 255).toString(16).padStart(2, '0')}`;
};

export const revokeGlow = (element: HTMLElement | null, options?: {
  duration?: number;
}) => {
  if (!element) return;

  const { duration = 300 } = options || {};

  // Remove glow effect
  element.style.transition = `box-shadow ${duration}ms ease-in-out`;
  element.style.boxShadow = 'none';
  
  // Clean up transition after animation completes
  setTimeout(() => {
    element.style.transition = '';
  }, duration);
};

// Utility function to apply glow on hover
export const setupHoverGlow = (element: HTMLElement | null, options?: {
  color?: string;
  intensity?: number;
  duration?: number;
}) => {
  if (!element) return;

  const handleMouseEnter = () => applyGlow(element, options);
  const handleMouseLeave = () => revokeGlow(element, options);

  element.addEventListener('mouseenter', handleMouseEnter);
  element.addEventListener('mouseleave', handleMouseLeave);

  // Return cleanup function
  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
}; 