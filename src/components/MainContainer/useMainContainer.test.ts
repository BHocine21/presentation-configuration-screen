import { act, renderHook } from '@testing-library/react'

import { SAVED_SLIDES_STORAGE_KEY, slides } from '../../constants/constants'
import { useMainContainer } from './useMainContainer'

describe('useMainContainer', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('starts on the first slide with no unsaved changes', () => {
    const { result } = renderHook(() => useMainContainer())

    expect(result.current.currentSlide.id).toBe(slides[0].id)
    expect(result.current.isDirty).toBe(false)
  })

  it('restores previously saved slides from localStorage', () => {
    const savedSlides = slides.map(slide =>
      slide.id === 1 ? { ...slide, speakerNote: 'Persisted note' } : slide,
    )
    window.localStorage.setItem(SAVED_SLIDES_STORAGE_KEY, JSON.stringify(savedSlides))

    const { result } = renderHook(() => useMainContainer())

    expect(result.current.currentSlide.speakerNote).toBe('Persisted note')
  })

  it('changes the current slide', () => {
    const { result } = renderHook(() => useMainContainer())

    act(() => {
      result.current.changeSlide(2)
    })

    expect(result.current.currentSlide.id).toBe(2)
  })

  it('ignores a changeSlide call for an unknown slide id', () => {
    const { result } = renderHook(() => useMainContainer())

    act(() => {
      result.current.changeSlide(999)
    })

    expect(result.current.currentSlide.id).toBe(slides[0].id)
  })

  it('marks the state as dirty when a speaker note is updated', () => {
    const { result } = renderHook(() => useMainContainer())

    act(() => {
      result.current.updateSpeakerNote(1, 'New note')
    })

    expect(result.current.isDirty).toBe(true)
    expect(result.current.currentSlide.speakerNote).toBe('New note')
  })

  it('persists the draft and clears the dirty flag on save', () => {
    const { result } = renderHook(() => useMainContainer())

    act(() => {
      result.current.updateSpeakerNote(1, 'New note')
    })
    act(() => {
      result.current.save()
    })

    expect(result.current.isDirty).toBe(false)
    const persisted = JSON.parse(window.localStorage.getItem(SAVED_SLIDES_STORAGE_KEY) ?? '[]')
    expect(persisted[0].speakerNote).toBe('New note')
  })

  it('reverts unsaved changes on discard', () => {
    const { result } = renderHook(() => useMainContainer())

    act(() => {
      result.current.updateSpeakerNote(1, 'Unsaved note')
    })
    act(() => {
      result.current.discard()
    })

    expect(result.current.isDirty).toBe(false)
    expect(result.current.currentSlide.speakerNote).toBe('')
  })
})
