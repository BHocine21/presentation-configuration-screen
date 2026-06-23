import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('renders the presentation editor with the slides and the sidebar', () => {
    render(<App />)

    expect(screen.getByText('1/21')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Insert questions' })).toBeInTheDocument()
  })
})
