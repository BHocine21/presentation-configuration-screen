import React from 'react'
import { func, number, array } from 'prop-types'

const SlidesList = ({ slides, currentSlideId, changeSlide }) => (
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

SlidesList.propTypes = {
  slides: array.isRequired,
  currentSlideId: number.isRequired,
  changeSlide: func.isRequired
}

export default SlidesList
