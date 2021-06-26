import React from 'react'

import { useTheme } from '../Theming'
import ThemeToggler from './ThemeToggler'

export default () => {
  const theme = useTheme()
  return (
    <React.Fragment>
      {/* <Link to="#" activeClassName="active" aria-label="View blog page">
        Blog
      </Link> */}
      <a
        href="https://tedxnitrourkela.com/"
        activeclassname="active"
        aria-label="View about page"
      >
        Home
      </a>
      <a
        href="https://tedxnitrourkela.com/about"
        activeclassname="active"
        aria-label="View about page"
      >
        About
      </a>
      <a
        href="https://tedxnitrourkela.com/merchandise"
        activeclassname="active"
        aria-label="View merchandise page"
      >
        Merchandise
      </a>

      <ThemeToggler
        css={{}}
        toggleTheme={theme.toggleTheme}
        themeName={theme.themeName}
      />
    </React.Fragment>
  )
}
