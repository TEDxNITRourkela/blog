import React from 'react'
import Button from './Button'
import styled from '@emotion/styled'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '../Theming'

const DarkMode = styled(FiMoon)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0',
})

const DefaultMode = styled(FiSun)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0',
})

const ThemeToggler = ({ toggleTheme, themeName }) => {
  const theme = useTheme()
  return (
    <Button
      css={{
        borderRadius: '50%',
        width: '2.375rem',
        height: '2.375rem',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        borderStyle: 'solid',
        borderWidth: '1px',
        color: theme.colors.white,
        background: theme.colors.headerBg,
        transition: 'all 500ms ease',
        '@media (hover: hover)': {
          ':hover': {
            background:
              theme.themeName === 'default'
                ? theme.colors.text
                : theme.colors.gray,
            color: theme.colors.headerBg,
          },
        },
      }}
      aria-label={
        themeName === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
      }
      onClick={() => toggleTheme(themeName === 'light' ? 'default' : 'light')}
    >
      {themeName === 'light' ? (
        <DefaultMode title="Switch to light mode" />
      ) : (
        <DarkMode title="Switch to dark mode" />
      )}
    </Button>
  )
}
export default ThemeToggler
