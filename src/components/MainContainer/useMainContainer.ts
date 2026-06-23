import { useMemo, useState } from 'react'

import { SAVED_SLIDES_STORAGE_KEY, slides as initialSlides } from '../../constants/constants'
import type { Slide } from '../../types/slide'
import { getStorageItem, setStorageItem } from '../../utils/storage'

export const useMainContainer = () => {
  const [savedSlides, setSavedSlides] = useState<Slide[]>(() =>
    getStorageItem(SAVED_SLIDES_STORAGE_KEY, initialSlides),
  )
  const [draftSlides, setDraftSlides] = useState<Slide[]>(savedSlides)
  const [currentSlideId, setCurrentSlideId] = useState(savedSlides[0].id)

  const isDirty = useMemo(() => draftSlides !== savedSlides, [draftSlides, savedSlides])

  const currentSlide = useMemo(
    () => draftSlides.find(slide => slide.id === currentSlideId) ?? draftSlides[0],
    [draftSlides, currentSlideId],
  )

  const changeSlide = (slideId: number): void => {
    const targetSlide = draftSlides.find(slide => slide.id === slideId)
    if (targetSlide) {
      setCurrentSlideId(targetSlide.id)
    }
  }

  const updateSpeakerNote = (slideId: number, speakerNote: string): void => {
    setDraftSlides(previousSlides =>
      previousSlides.map(slide => (slide.id === slideId ? { ...slide, speakerNote } : slide)),
    )
  }

  const save = (): void => {
    setStorageItem(SAVED_SLIDES_STORAGE_KEY, draftSlides)
    setSavedSlides(draftSlides)
  }

  const discard = (): void => {
    setDraftSlides(savedSlides)
  }

  return {
    slides: draftSlides,
    currentSlide,
    isDirty,
    changeSlide,
    updateSpeakerNote,
    save,
    discard,
  }
}
