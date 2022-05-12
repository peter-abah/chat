const defaultTheme = require('tailwindcss/defaultTheme')

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

module.exports = {
  content: [
    './src/**/*.{js,ts,tsx,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: withOpacityValue('--color-primary'),
        bg: withOpacityValue('--color-bg'),
        text: withOpacityValue('--color-text'),
        icon: withOpacityValue('--color-icon'),
        'icon-on-primary': withOpacityValue('--color-icon-on-primary'),
        'msg-other': withOpacityValue('--color-msg-other'),
        'msg-user': withOpacityValue('--color-msg-user')
      },
      fontFamily: {
        'sans': ['"Open Sans"', ...defaultTheme.fontFamily.sans],
        'display': ['Macondo', '"Open Sans"', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [],
}
