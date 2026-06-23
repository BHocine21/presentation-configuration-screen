import { act, renderHook } from '@testing-library/react'
import type { ChangeEvent } from 'react'

import type { Slide } from '../../../types/slide'
import { useCurrentSlide } from './useCurrentSlide'

const buildSlide = (overrides: Partial<Slide> = {}): Slide => ({
  id: 1,
  content: 'slide-1.png',
  speakerNote: 'Initial note',
  ...overrides,
})

const buildChangeEvent = (value: string) =>
  ({ currentTarget: { value } }) as ChangeEvent<HTMLTextAreaElement>

describe('useCurrentSlide', () => {
  it('initializes the local note from the slide speaker note', () => {
    const { result } = renderHook(() =>
      useCurrentSlide({ slide: buildSlide(), updateSpeakerNote: jest.fn() }),
    )

    expect(result.current.note).toBe('Initial note')
  })

  it('updates the local note on change without committing it', () => {
    const updateSpeakerNote = jest.fn()
    const { result } = renderHook(() => useCurrentSlide({ slide: buildSlide(), updateSpeakerNote }))

    act(() => {
      result.current.handleChange(buildChangeEvent('Draft note'))
    })

    expect(result.current.note).toBe('Draft note')
    expect(updateSpeakerNote).not.toHaveBeenCalled()
  })

  it('commits the note on blur only when it changed', () => {
    const updateSpeakerNote = jest.fn()
    const { result } = renderHook(() => useCurrentSlide({ slide: buildSlide(), updateSpeakerNote }))

    act(() => {
      result.current.handleBlur()
    })
    expect(updateSpeakerNote).not.toHaveBeenCalled()

    act(() => {
      result.current.handleChange(buildChangeEvent('Updated note'))
    })
    act(() => {
      result.current.handleBlur()
    })

    expect(updateSpeakerNote).toHaveBeenCalledWith(1, 'Updated note')
  })

  it('resyncs the local note when the slide changes', () => {
    const { result, rerender } = renderHook(
      ({ slide }) => useCurrentSlide({ slide, updateSpeakerNote: jest.fn() }),
      { initialProps: { slide: buildSlide() } },
    )

    rerender({ slide: buildSlide({ id: 2, speakerNote: 'Second slide note' }) })

    expect(result.current.note).toBe('Second slide note')
  })
})
