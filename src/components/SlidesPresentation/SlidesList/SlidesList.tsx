import React from 'react'

import type { Slide } from '../../../types/slide'

type SlidesListProps = {
  slides: Slide[]
  currentSlideId: number
  changeSlide: (slideId: number) => void
}

const SlidesList = ({ slides, currentSlideId, changeSlide }: SlidesListProps) => (
  <div className='slides-list'>
    <ul>
      {slides.map((slide, index) => (
        <li key={index} className={`slides-item ${slide.id === currentSlideId ? 'active' : ''}`}>
          <button onClick={() => { changeSlide(slide.id) }}>
            <label>{slide.id}</label>
            <img src={slide.content} />
          </button>
        </li>
      ))}
    </ul>
  </div>
)

export default SlidesList
