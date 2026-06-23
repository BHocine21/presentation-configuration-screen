import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#146aff',
      dark: '#0d54d1',
    },
    background: {
      default: '#f8f9fa',
    },
    divider: '#e7e7e7',
  },
  typography: {
    fontFamily: 'Nunito, sans-serif',
    h1: { fontFamily: 'Outfit, sans-serif' },
    h2: { fontFamily: 'Outfit, sans-serif' },
    h3: { fontFamily: 'Outfit, sans-serif' },
    h4: { fontFamily: 'Outfit, sans-serif' },
    h5: { fontFamily: 'Outfit, sans-serif' },
    h6: { fontFamily: 'Outfit, sans-serif' },
  },
  custom: {
    hoverBackground: '#dce8fb',
    headingFontFamily: 'Outfit, sans-serif',
    cardShadow: '0 1px 2px rgba(20,106,255,0.06), 0 4px 12px rgba(20,106,255,0.10)',
    cardShadowHover: '0 2px 4px rgba(20,106,255,0.10), 0 8px 20px rgba(20,106,255,0.16)',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `,
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 600,
        },
      },
    },
  },
})
