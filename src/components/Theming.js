import { createTheming } from '@callstack/react-theme-provider'
import { darken } from 'polished'
import colors from '../lib/colors'

const themes = {
  default: {
    themeName: 'default',
    colors: {
      primary: darken(0.06, colors.red),
      text: colors.white,
      bodyBg: colors.black,
      headerBg: darken(0.06, colors.red),
      link: darken(0.06, colors.red),
      ...colors,
    },
  },
  light: {
    themeName: 'light',
    colors: {
      primary: colors.red,
      text: colors.black,
      bodyBg: colors.gray,
      headerBg: colors.red,
      link: darken(0.06, colors.red),
      ...colors,
    },
  },
}

const { ThemeProvider, withTheme, useTheme } = createTheming(themes.default)

export { ThemeProvider, withTheme, useTheme, themes, colors }
