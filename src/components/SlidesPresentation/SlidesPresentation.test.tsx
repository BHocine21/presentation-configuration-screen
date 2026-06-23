import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { Slide } from '../../types/slide'
import { renderWithProviders } from '../../test/renderWithProviders'
import SlidesPresentation from './SlidesPresentation'

const slides: Slide[] = [
  { id: 1, content: 'slide-1.png', speakerNote: '' },
  { id: 2, content: 'slide-2.png', speakerNote: '' },
]

describe('SlidesPresentation', () => {
  it('renders the current slide and the slides list', () => {
    renderWithProviders(
      <SlidesPresentation
        slides={slides}
        currentSlide={slides[0]}
        changeSlide={jest.fn()}
        updateSpeakerNote={jest.fn()}
      />,
    )

    expect(screen.getByText('1/2')).toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(3)
  })

  it('delegates slide selection from the list to the changeSlide callback', async () => {
    const user = userEvent.setup()
    const changeSlide = jest.fn()
    renderWithProviders(
      <SlidesPresentation
        slides={slides}
        currentSlide={slides[0]}
        changeSlide={changeSlide}
        updateSpeakerNote={jest.fn()}
      />,
    )

    await user.click(screen.getByRole('img', { name: 'Slide 2 thumbnail' }))

    expect(changeSlide).toHaveBeenCalledWith(2)
  })
})
