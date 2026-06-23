import React, { useState } from 'react'

import { slides } from '../../constants/constants'

import SlidesList from './SlidesList/SlidesList'
import CurrentSlide from './CurrentSlide/CurrentSlide'

const SlidesPresentation = () => {
  // List of all slides.
  const [slidesList, setSlidesList] = useState(slides)
  // Data of current slide. By default, the first slide is displayed.
  const [currentSlide, setCurrentSlide] = useState(slides[0])

  /**
   * Used to set speaker note of specific slide.
   *
   * @param object newSlide
   *   Slide with a new speaker note.
   *
   * @returns void
   *   Update slides state.
   */
  const setSlides = (newSlide) => {
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
   * @param number slideId
   *   Target slide id.
   *
   * @returns void
   *   Update current slide state.
   */
  const changeSlide = (slideId) => {
    setCurrentSlide(slidesList.find(slide => slide.id === slideId))
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
