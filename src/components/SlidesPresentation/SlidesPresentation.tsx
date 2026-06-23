import Box from '@mui/material/Box'

import type { Slide } from '../../types/slide'
import CurrentSlide from './CurrentSlide/CurrentSlide'
import SlidesList from './SlidesList/SlidesList'

type SlidesPresentationProps = {
  slides: Slide[]
  currentSlide: Slide
  changeSlide: (slideId: number) => void
  updateSpeakerNote: (slideId: number, speakerNote: string) => void
}

const SlidesPresentation = ({
  slides,
  currentSlide,
  changeSlide,
  updateSpeakerNote,
}: SlidesPresentationProps) => (
  <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
    <CurrentSlide
      slide={currentSlide}
      slidesNumber={slides.length}
      changeSlide={changeSlide}
      updateSpeakerNote={updateSpeakerNote}
    />
    <SlidesList slides={slides} currentSlideId={currentSlide.id} changeSlide={changeSlide} />
  </Box>
)

export default SlidesPresentation
