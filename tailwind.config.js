/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink:      '#0C1218',
        panel:    '#141C24',
        panel2:   '#1B252F',
        edge:     '#26333F',
        edge2:    '#33444F',
        chalk:    '#C9D6E2',
        mute:     '#7089A0',
        cad:      '#6FD3FF',
        plot:     '#FF6B3D',
        lime:     '#3DDC84',
        amber:    '#FFC94A',
        violet:   '#B98BFF',
        paper:    '#F2EFE7'
      },
      fontFamily: {
        cond: ['"Barlow Condensed"', 'Arial Narrow', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace']
      }
    }
  },
  plugins: []
}
