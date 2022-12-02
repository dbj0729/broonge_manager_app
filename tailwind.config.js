module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        hero: {
          DEFAULT: '#FF9685',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFDCD7',
          400: '#FFB9AE',
          500: '#FF9685',
          600: '#FF664D',
          700: '#FF3515',
          800: '#DC1F00',
          900: '#A41700',
        },
        tomato: '#FF8571',
        // default colors
        //  Slate, Gray, Zinc, Neutral, Stone, Red, Orange, Amber, Yellow,
        //  Lime, Green, Emerald, Teal, Cyan, Sky, Blue, Indigo, Violet,
        //  Purple, Fuchsia, Pink, Rose
        // google: { DEFAULT: '#ffffff', text: '#757575' },
        naver: {DEFAULT: '#18CE5F', text: '#ffffff'},
        kakao: {DEFAULT: '#FFEA33', text: '#423630'},
        pink: {
          // from https://tailwindcolorgenerator.com/
          DEFAULT: '#ff71c2',
          50: '#ffa3f4',
          100: '#ff99ea',
          200: '#ff8fe0',
          300: '#ff85d6',
          400: '#ff7bcc',
          500: '#ff71c2',
          600: '#f567b8',
          700: '#eb5dae',
          800: '#e153a4',
          900: '#d7499a',
        },
        brand: {
          DEFAULT: '#26CB83',
          50: '#58fdb5',
          100: '#4ef3ab',
          200: '#44e9a1',
          300: '#3adf97',
          400: '#30d58d',
          500: '#26cb83',
          600: '#1cc179',
          700: '#12b76f',
          800: '#08ad65',
          900: '#00a35b',
        },
        'gray-dark': '#273444',
        'gray-light': '#d3dce6',
      },
      fontSize: {
        md: ['1rem', '1.5rem'],
      },
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
};
