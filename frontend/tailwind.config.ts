import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			primary: {
  				'50': '#ebf7f5',
  				'100': '#d7efec',
  				'200': '#afdfd9',
  				'300': '#86cfc5',
  				'400': '#5ebfb2',
  				'500': '#35af9e',
  				'600': '#2a8c7f',
  				'700': '#20695f',
  				'800': '#15463f',
  				'900': '#0b2320',
  				DEFAULT: '#35af9e',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#f0f7f7',
  				'100': '#e1efef',
  				'200': '#c3dfdf',
  				'300': '#a6cfcf',
  				'400': '#88bfbf',
  				'500': '#6aafaf',
  				'600': '#558c8c',
  				'700': '#406969',
  				'800': '#2b4646',
  				'900': '#152323',
  				DEFAULT: '#6aafaf',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			'islamic-blue': 'hsl(var(--islamic-blue-hsl))',
  			'islamic-green': 'hsl(var(--islamic-green-hsl))',
  			'islamic-gold': 'hsl(var(--islamic-gold-hsl))',
  			'islamic-purple': 'hsl(var(--islamic-purple-hsl))',
  			'islamic-teal': 'hsl(var(--islamic-teal-hsl))',
  			'islamic-earth': 'hsl(var(--islamic-earth-hsl))',
  			'islamic-dark': 'hsl(var(--islamic-dark-hsl))',
  			'islamic-maroon': 'hsl(var(--islamic-maroon-hsl))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-inter)',
                    ...fontFamily.sans
                ],
  			serif: [
  				'var(--font-playfair-display)',
                    ...fontFamily.serif
                ],
  			arabic: [
  				'var(--font-amiri)',
                    ...fontFamily.serif
                ],
  			jakarta: [
  				'Plus Jakarta Sans',
                    ...fontFamily.sans
                ]
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'ping-slow': {
  				'0%, 100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				},
  				'50%': {
  					transform: 'scale(1.1)',
  					opacity: '0.5'
  				}
  			},
  			'dash': {
  				'0%': {
  					strokeDasharray: '1, 150',
  					strokeDashoffset: '0'
  				},
  				'50%': {
  					strokeDasharray: '90, 150',
  					strokeDashoffset: '-35'
  				},
  				'100%': {
  					strokeDasharray: '90, 150',
  					strokeDashoffset: '-124'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			'gradient-x': {
  				'0%, 100%': {
  					'background-size': '200% 200%',
  					'background-position': 'left center'
  				},
  				'50%': {
  					'background-size': '200% 200%',
  					'background-position': 'right center'
  				}
  			},
  			'gradient-y': {
  				'0%, 100%': {
  					'background-size': '200% 200%',
  					'background-position': 'top center'
  				},
  				'50%': {
  					'background-size': '200% 200%',
  					'background-position': 'bottom center'
  				}
  			},
  			'gradient-xy': {
  				'0%, 100%': {
  					'background-size': '400% 400%',
  					'background-position': 'left center'
  				},
  				'50%': {
  					'background-size': '200% 200%',
  					'background-position': 'right center'
  				}
  						}
		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'ping-slow': 'ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite',
  			'dash': 'dash 1.5s ease-in-out infinite',
  			float: 'float 3s ease-in-out infinite',
  			'gradient-x': 'gradient-x 15s ease infinite',
  			'gradient-y': 'gradient-y 15s ease infinite',
  			'gradient-xy': 'gradient-xy 15s ease infinite',
  						'subtle-pan': 'subtlePan 25s ease-in-out infinite',
			'text-shimmer': 'textShimmer 3s linear infinite'
  		},
  		transitionDuration: {
  			DEFAULT: 'var(--transition-duration)'
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
