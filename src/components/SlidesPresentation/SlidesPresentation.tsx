import React, { useState } from 'react'

import { slides } from '../../constants/constants'
import type { Slide } from '../../types/slide'

import SlidesList from './SlidesList/SlidesList'
import CurrentSlide from './CurrentSlide/CurrentSlide'

const SlidesPresentation = () => {
  // List of all slides.
  const [slidesList, setSlidesList] = useState<Slide[]>(slides)
  // Data of current slide. By default, the first slide is displayed.
  const [currentSlide, setCurrentSlide] = useState<Slide>(slides[0])

  /**
   * Used to set speaker note of specific slide.
   *
   * @param newSlide
   *   Slide with a new speaker note.
   *
   * @returns void
   *   Update slides state.
   */
  const setSlides = (newSlide: Slide): void => {
    const newSlidesList = slidesList.map(slide => {
      if (slide.id === newSlide.id) {
        slide = newSlide
      }
      return slide
    })
    // Update slides.
    setSlidesList(newSlidesList)
  }

  /**
   * Change current slide displayed.
   *
   * @param slideId
   *   Target slide id.
   *
   * @returns void
   *   Update current slide state.
   */
  const changeSlide = (slideId: number): void => {
    const newCurrentSlide = slidesList.find(slide => slide.id === slideId)
    if (newCurrentSlide) {
      setCurrentSlide(newCurrentSlide)
    }
  }

  return (
    <div className='slides-presentation'>
      <CurrentSlide
        slide={currentSlide}
        slidesNumber={slidesList.length}
        changeSlide={changeSlide}
        setSlides={setSlides}
      />
      <SlidesList
        slides={slidesList}
        currentSlideId={currentSlide.id}
        changeSlide={changeSlide}
      />
    </div>
  )
}

export default SlidesPresentation
