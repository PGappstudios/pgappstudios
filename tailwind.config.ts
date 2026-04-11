import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
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
				// Custom colors
				'pg-dark': '#0A0118',
				'pg-purple': '#B829F7',
				'pg-pink': '#F72AA7',
				'pg-cyan': '#29F7EA',
				'pg-blue': '#2972F7',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				'glow': {
					'0%, 100%': { 
						textShadow: '0 0 10px rgba(184, 41, 247, 0.7), 0 0 20px rgba(184, 41, 247, 0.5), 0 0 30px rgba(184, 41, 247, 0.3)'
					},
					'50%': { 
						textShadow: '0 0 20px rgba(184, 41, 247, 0.9), 0 0 30px rgba(184, 41, 247, 0.7), 0 0 40px rgba(184, 41, 247, 0.5)' 
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 15px rgba(184, 41, 247, 0.7), 0 0 30px rgba(184, 41, 247, 0.4)' 
					},
					'50%': { 
						boxShadow: '0 0 30px rgba(184, 41, 247, 0.9), 0 0 50px rgba(184, 41, 247, 0.6)' 
					}
				},
				'slide-up': {
					'0%': { 
						opacity: '0', 
						transform: 'translateY(30px)' 
					},
					'100%': { 
						opacity: '1', 
						transform: 'translateY(0)' 
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow': 'glow 2s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'slide-up': 'slide-up 0.8s ease-out forwards',
				'slide-up-delay-1': 'slide-up 0.8s ease-out 0.1s forwards',
				'slide-up-delay-2': 'slide-up 0.8s ease-out 0.2s forwards',
				'slide-up-delay-3': 'slide-up 0.8s ease-out 0.3s forwards',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'fade-in-delay-1': 'fade-in 0.5s ease-out 0.1s forwards',
				'fade-in-delay-2': 'fade-in 0.5s ease-out 0.2s forwards',
				'fade-in-delay-3': 'fade-in 0.5s ease-out 0.3s forwards',
			},
			backgroundImage: {
				'hero-pattern': 'radial-gradient(circle at center, rgba(184, 41, 247, 0.2) 0%, rgba(10, 1, 24, 0) 70%)',
				'glow-line': 'linear-gradient(90deg, rgba(184, 41, 247, 0) 0%, rgba(184, 41, 247, 0.8) 50%, rgba(184, 41, 247, 0) 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
