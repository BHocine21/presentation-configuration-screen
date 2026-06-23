import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      hoverBackground: string
      headingFontFamily: string
      cardShadow: string
      cardShadowHover: string
    }
  }
  interface ThemeOptions {
    custom?: {
      hoverBackground?: string
      headingFontFamily?: string
      cardShadow?: string
      cardShadowHover?: string
    }
  }
}
