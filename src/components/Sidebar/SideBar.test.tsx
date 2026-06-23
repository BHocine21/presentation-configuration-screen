import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '../../test/renderWithProviders'
import Sidebar from './SideBar'

describe('Sidebar', () => {
  it('shows the questions tab content by default', () => {
    renderWithProviders(<Sidebar />)

    expect(screen.getByText('Question 1')).toBeInTheDocument()
  })

  it('switches to the presentations tab content on click', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Sidebar />)

    await user.click(screen.getByRole('tab', { name: 'Update presentation' }))

    expect(screen.getByText('Presentation 1')).toBeInTheDocument()
    expect(screen.queryByText('Question 1')).not.toBeInTheDocument()
  })
})
