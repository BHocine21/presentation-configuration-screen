import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { Slide } from '../../../types/slide'
import { renderWithProviders } from '../../../test/renderWithProviders'
import SlidesList from './SlidesList'

const slides: Slide[] = [
  { id: 1, content: 'slide-1.png', speakerNote: '' },
  { id: 2, content: 'slide-2.png', speakerNote: '' },
  { id: 3, content: 'slide-3.png', speakerNote: '' },
]

describe('SlidesList', () => {
  it('renders one entry per slide', () => {
    renderWithProviders(<SlidesList slides={slides} currentSlideId={1} changeSlide={jest.fn()} />)

    expect(screen.getAllByRole('button')).toHaveLength(slides.length)
  })

  it('calls changeSlide with the clicked slide id', async () => {
    const user = userEvent.setup()
    const changeSlide = jest.fn()
    renderWithProviders(<SlidesList slides={slides} currentSlideId={1} changeSlide={changeSlide} />)

    await user.click(screen.getByRole('img', { name: 'Slide 3 thumbnail' }))

    expect(changeSlide).toHaveBeenCalledWith(3)
  })

  it('marks the current slide as selected', () => {
    renderWithProviders(<SlidesList slides={slides} currentSlideId={2} changeSlide={jest.fn()} />)

    expect(screen.getAllByRole('button')[1]).toHaveClass('Mui-selected')
  })
})
