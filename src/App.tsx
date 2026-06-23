import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { theme } from './theme/theme'
import PresentationEditorPage from './pages/PresentationEditorPage/PresentationEditorPage'

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<PresentationEditorPage />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
)

export default App
