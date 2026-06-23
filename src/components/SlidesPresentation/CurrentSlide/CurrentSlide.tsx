import { func, number } from 'prop-types'
import React, { useEffect, useState } from 'react'

import slideType from '../../../types/slide'

const CurrentSlide = ({ slide, slidesNumber, changeSlide, setSlides }) => {
  // speaker note of current slide.
  const [note, setNote] = useState('')

  // Init text area with speaker note if already filled in the current slide.
  useEffect(() => {
    setNote(slide.speakerNote)
  }, [])

  // Update speaker note if it changed.
  useEffect(() => {
    setNote(slide.speakerNote)
  }, [slide])

  // Handle change function for text area field.
  const handleChange = (event) => {
    setNote(event.currentTarget.value)
  }

  // Update speaker note when the focus is out from text area field.
  const handleBlur = () => {
    setSlides({
      ...slide,
      speakerNote: note
    })
  }

  const paginationLabel = `${slide.id}/${slidesNumber}`

  return (
    <div className='current-slide'>
      <div className='slide-with-buttons'>
        <div className='slide-content'>
          <img src={slide.content} />
        </div>
        <div className='navigation-tab'>
          <button
            disabled={slide.id - 1 === 0}
            onClick={() => { changeSlide(slide.id - 1) }}
          >
            {'<'}
          </button>
          <p>{paginationLabel}</p>
          <button
            disabled={slide.id + 1 > slidesNumber}
            onClick={() => { changeSlide(slide.id + 1) }}
          >
            {'>'}
          </button>
        </div>
      </div>
      <textarea
        className='speaker-note'
        type='text'
        placeholder='Click here to add speaker note'
        value={note}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  )
}

CurrentSlide.propTypes = {
  slide: slideType.isRequired,
  slidesNumber: number.isRequired,
  changeSlide: func.isRequired,
  setSlides: func.isRequired
}

export default CurrentSlide
