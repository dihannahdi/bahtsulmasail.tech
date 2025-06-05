import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and resolves Tailwind conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates an emerald gradient background with customizable opacity
 */
export function emeraldGradient(opacity: number = 0.1, direction: string = 'to-r') {
  return `bg-gradient-${direction} from-emerald-500/${opacity} to-emerald-600/${opacity}`;
}

/**
 * Generates an emerald outline glow effect with customizable intensity
 */
export function emeraldGlow(intensity: number = 10) {
  return `shadow-[0_0_${intensity}px_rgba(16,185,129,0.6)]`;
}

/**
 * Formats a number with thousands separators
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

/**
 * Truncates text to a certain length with ellipsis
 */
export function truncateText(text: string, length: number = 100): string {
  return text.length > length ? text.substring(0, length) + '...' : text;
}

/**
 * Formats a date into a human-readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(d);
}

/**
 * Formats a date into a relative time string (e.g., "2 hours ago")
 */
export function timeAgo(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval === 1 ? '1 year ago' : `${interval} years ago`;
  }
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? '1 month ago' : `${interval} months ago`;
  }
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? '1 day ago' : `${interval} days ago`;
  }
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
  }
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
  }
  
  return seconds < 10 ? 'just now' : `${Math.floor(seconds)} seconds ago`;
}

/**
 * Generates a random ID for keys, etc.
 */
export function generateId(length: number = 8): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Debounces a function call
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Create color variations for the emerald theme
 */
export const emeraldTheme = {
  light: {
    background: '#f8fafb',
    card: '#ffffff',
    border: 'rgba(16, 185, 129, 0.2)',
    text: '#1e293b',
    muted: '#64748b',
    primary: '#10b981',
    highlight: 'rgba(16, 185, 129, 0.1)'
  },
  dark: {
    background: '#0f172a',
    card: '#1e293b',
    border: 'rgba(16, 185, 129, 0.3)',
    text: '#f1f5f9',
    muted: '#94a3b8',
    primary: '#10b981',
    highlight: 'rgba(16, 185, 129, 0.15)'
  }
}; 