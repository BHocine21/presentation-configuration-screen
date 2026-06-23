import React, { useEffect, useState } from 'react'

import type { Slide } from '../../../types/slide'

type CurrentSlideProps = {
  slide: Slide
  slidesNumber: number
  changeSlide: (slideId: number) => void
  setSlides: (newSlide: Slide) => void
}

const CurrentSlide = ({ slide, slidesNumber, changeSlide, setSlides }: CurrentSlideProps) => {
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
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        placeholder='Click here to add speaker note'
        value={note}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  )
}

export default CurrentSlide
