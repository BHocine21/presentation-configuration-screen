import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'

import type { Slide } from '../../../types/slide'

type UseCurrentSlideParams = {
  slide: Slide
  updateSpeakerNote: (slideId: number, speakerNote: string) => void
}

export const useCurrentSlide = ({ slide, updateSpeakerNote }: UseCurrentSlideParams) => {
  // Local buffer for the textarea, committed to the shared state on blur.
  const [note, setNote] = useState(slide.speakerNote)

  // Resync the local buffer when navigating to another slide, or when the
  // speaker note changes from outside (e.g. discard reverting an edit).
  // Keyed on primitive values rather than the `slide` reference, which can
  // change identity across renders without its content changing.
  useEffect(() => {
    setNote(slide.speakerNote)
  }, [slide.id, slide.speakerNote])

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setNote(event.currentTarget.value)
  }

  const handleBlur = () => {
    if (note !== slide.speakerNote) {
      updateSpeakerNote(slide.id, note)
    }
  }

  return { note, handleChange, handleBlur }
}
