/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
  safelist: [
    // Dynamic classes that might not be detected
    'bg-blue-500',
    'bg-green-500', 
    'border-l-blue-500',
    'border-l-green-500',
    'text-blue-600',
    'text-green-600',
    // Standard classes being used
    'bg-gray-50',
    'bg-white',
    'border-gray-200',
    'text-gray-900',
  ],
}
