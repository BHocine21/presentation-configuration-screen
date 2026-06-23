import { useRef } from 'react'
import { keyframes } from '@emotion/react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import type { Slide } from '../../../types/slide'
import { useCurrentSlide } from './useCurrentSlide'

type CurrentSlideProps = {
  slide: Slide
  slidesNumber: number
  changeSlide: (slideId: number) => void
  updateSpeakerNote: (slideId: number, speakerNote: string) => void
}

const slideInForward = keyframes`
  from { opacity: 0; transform: translateX(16px); }
  to { opacity: 1; transform: translateX(0); }
`

const slideInBackward = keyframes`
  from { opacity: 0; transform: translateX(-16px); }
  to { opacity: 1; transform: translateX(0); }
`

const pressFeedback = {
  transition: 'transform 150ms ease-out, background-color 150ms ease-out',
  '&:active': { transform: 'scale(0.97)' },
}

const CurrentSlide = ({
  slide,
  slidesNumber,
  changeSlide,
  updateSpeakerNote,
}: CurrentSlideProps) => {
  const { note, handleChange, handleBlur } = useCurrentSlide({ slide, updateSpeakerNote })

  // Tracks whether the user moved forward or backward, to animate the new
  // slide in from the matching direction. Mutating a ref during render is
  // safe here since nothing else reads it.
  const previousSlideIdRef = useRef(slide.id)
  const direction = slide.id >= previousSlideIdRef.current ? 'forward' : 'backward'
  previousSlideIdRef.current = slide.id

  const isFirstSlide = slide.id - 1 === 0
  const isLastSlide = slide.id + 1 > slidesNumber

  return (
    <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
      <Box
        key={slide.id}
        sx={{
          flex: 1,
          minHeight: 0,
          textAlign: 'center',
          bgcolor: 'common.white',
          m: 1,
          borderRadius: 1,
          boxShadow: theme => theme.custom.cardShadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 200ms ease-out, box-shadow 200ms ease-out',
          animation: `${direction === 'backward' ? slideInBackward : slideInForward} 220ms ease-out`,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme => theme.custom.cardShadowHover,
          },
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      >
        <img src={slide.content} alt={`Slide ${slide.id}`} style={{ width: '60%' }} />
      </Box>
      <Stack direction="row" spacing={3} justifyContent="center" alignItems="center" sx={{ py: 1 }}>
        <IconButton
          aria-label="Previous slide"
          disabled={isFirstSlide}
          onClick={() => {
            changeSlide(slide.id - 1)
          }}
          sx={{
            bgcolor: 'primary.main',
            color: 'common.white',
            '&:hover': { bgcolor: 'primary.dark' },
            ...pressFeedback,
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography
          component="p"
          sx={{ fontFamily: theme => theme.custom.headingFontFamily, fontWeight: 600 }}
        >
          {slide.id}/{slidesNumber}
        </Typography>
        <IconButton
          aria-label="Next slide"
          disabled={isLastSlide}
          onClick={() => {
            changeSlide(slide.id + 1)
          }}
          sx={{
            bgcolor: 'primary.main',
            color: 'common.white',
            '&:hover': { bgcolor: 'primary.dark' },
            ...pressFeedback,
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Stack>
      <TextField
        multiline
        fullWidth
        minRows={4}
        maxRows={4}
        placeholder="Click here to add speaker note"
        value={note}
        onChange={handleChange}
        onBlur={handleBlur}
        inputProps={{ 'aria-label': 'Speaker note' }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            borderTop: 1,
            borderColor: 'divider',
            transition: 'border-top-width 150ms ease-out, box-shadow 150ms ease-out',
          },
          '& .MuiOutlinedInput-notchedOutline': { border: 0 },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
          '& .MuiOutlinedInput-root.Mui-focused': {
            borderTopWidth: 2,
            borderTopColor: 'primary.main',
          },
        }}
      />
    </Box>
  )
}

export default CurrentSlide
