import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { Slide } from '../../../types/slide'
import { renderWithProviders } from '../../../test/renderWithProviders'
import CurrentSlide from './CurrentSlide'

const buildSlide = (overrides: Partial<Slide> = {}): Slide => ({
  id: 1,
  content: 'slide-1.png',
  speakerNote: '',
  ...overrides,
})

describe('CurrentSlide', () => {
  it('renders the slide image and the pagination label', () => {
    renderWithProviders(
      <CurrentSlide
        slide={buildSlide()}
        slidesNumber={21}
        changeSlide={jest.fn()}
        updateSpeakerNote={jest.fn()}
      />,
    )

    expect(screen.getByRole('img', { name: 'Slide 1' })).toHaveAttribute('src', 'slide-1.png')
    expect(screen.getByText('1/21')).toBeInTheDocument()
  })

  it('disables the previous button on the first slide', () => {
    renderWithProviders(
      <CurrentSlide
        slide={buildSlide({ id: 1 })}
        slidesNumber={21}
        changeSlide={jest.fn()}
        updateSpeakerNote={jest.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeEnabled()
  })

  it('disables the next button on the last slide', () => {
    renderWithProviders(
      <CurrentSlide
        slide={buildSlide({ id: 21 })}
        slidesNumber={21}
        changeSlide={jest.fn()}
        updateSpeakerNote={jest.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: 'Next slide' })).toBeDisabled()
  })

  it('navigates to the next slide on click', async () => {
    const user = userEvent.setup()
    const changeSlide = jest.fn()
    renderWithProviders(
      <CurrentSlide
        slide={buildSlide({ id: 1 })}
        slidesNumber={21}
        changeSlide={changeSlide}
        updateSpeakerNote={jest.fn()}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Next slide' }))

    expect(changeSlide).toHaveBeenCalledWith(2)
  })

  it('navigates to the previous slide on click', async () => {
    const user = userEvent.setup()
    const changeSlide = jest.fn()
    renderWithProviders(
      <CurrentSlide
        slide={buildSlide({ id: 2 })}
        slidesNumber={21}
        changeSlide={changeSlide}
        updateSpeakerNote={jest.fn()}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Previous slide' }))

    expect(changeSlide).toHaveBeenCalledWith(1)
  })

  it('commits the speaker note when the textarea loses focus', async () => {
    const user = userEvent.setup()
    const updateSpeakerNote = jest.fn()
    renderWithProviders(
      <CurrentSlide
        slide={buildSlide({ id: 1 })}
        slidesNumber={21}
        changeSlide={jest.fn()}
        updateSpeakerNote={updateSpeakerNote}
      />,
    )

    const noteField = screen.getByLabelText('Speaker note')
    await user.type(noteField, 'My note')
    await user.tab()

    expect(updateSpeakerNote).toHaveBeenCalledWith(1, 'My note')
  })
})
