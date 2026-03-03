/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        'primary-light': '#333333',
        secondary: '#666666',
        'secondary-light': '#999999',
        bg: '#ffffff',
        'bg-alt': '#fafafa',
        'bg-subtle': '#f5f5f5',
        border: '#e5e5e5',
        'border-light': '#f0f0f0',
        'accent': '#000080',
        'accent-glow': 'rgba(0, 0, 128, 0.5)',
      },
      spacing: {
        '2xs': '4px',
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '48px',
        '2xl': '64px',
        '3xl': '96px',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
