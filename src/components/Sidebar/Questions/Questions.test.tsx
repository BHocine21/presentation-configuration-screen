import { screen } from '@testing-library/react'

import { mockQuestions } from '../../../constants/constants'
import { renderWithProviders } from '../../../test/renderWithProviders'
import Questions from './Questions'

describe('Questions', () => {
  it('renders every mock question', () => {
    renderWithProviders(<Questions />)

    mockQuestions.forEach(question => {
      expect(screen.getByText(question.label)).toBeInTheDocument()
    })
  })
})
