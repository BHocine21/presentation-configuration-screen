import { screen } from '@testing-library/react'

import { mockPresentations } from '../../../constants/constants'
import { renderWithProviders } from '../../../test/renderWithProviders'
import Presentations from './Presentations'

describe('Presentations', () => {
  it('renders every mock presentation', () => {
    renderWithProviders(<Presentations />)

    mockPresentations.forEach(presentation => {
      expect(screen.getByText(presentation.label)).toBeInTheDocument()
    })
  })
})
