import { keyframes } from '@emotion/react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Typography from '@mui/material/Typography'

import type { Slide } from '../../../types/slide'

type SlidesListProps = {
  slides: Slide[]
  currentSlideId: number
  changeSlide: (slideId: number) => void
}

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`

const STAGGER_DELAY_MS = 40

const SlidesList = ({ slides, currentSlideId, changeSlide }: SlidesListProps) => (
  <List
    sx={{
      width: 230,
      flexShrink: 0,
      overflowY: 'auto',
      borderLeft: 1,
      borderColor: 'divider',
      py: 0,
    }}
  >
    {slides.map((slide, index) => {
      const isActive = slide.id === currentSlideId
      return (
        <ListItemButton
          key={slide.id}
          selected={isActive}
          onClick={() => {
            changeSlide(slide.id)
          }}
          sx={{
            gap: 1,
            animation: `${fadeInUp} 300ms ease-out both`,
            animationDelay: `${index * STAGGER_DELAY_MS}ms`,
            transition: 'background-color 150ms ease-out',
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
            '&.Mui-selected': { bgcolor: theme => theme.custom.hoverBackground },
            '&.Mui-selected img': { border: '0.1rem solid', borderColor: 'primary.main' },
            '&:hover img': { transform: 'scale(1.04)' },
            '& img': { transition: 'transform 200ms ease-out' },
          }}
        >
          <Typography
            component="label"
            sx={{ width: '10%', color: isActive ? 'primary.main' : 'text.primary' }}
          >
            {slide.id}
          </Typography>
          <img src={slide.content} alt={`Slide ${slide.id} thumbnail`} style={{ width: '80%' }} />
        </ListItemButton>
      )
    })}
  </List>
)

export default SlidesList
