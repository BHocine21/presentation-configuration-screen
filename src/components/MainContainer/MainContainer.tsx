import Box from '@mui/material/Box'

import ActionsBar from '../ActionsBar/ActionsBar'
import SlidesPresentation from '../SlidesPresentation/SlidesPresentation'
import { useMainContainer } from './useMainContainer'

const MainContainer = () => {
  const { slides, currentSlide, isDirty, changeSlide, updateSpeakerNote, save, discard } =
    useMainContainer()

  return (
    <Box sx={{ flex: 1, minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <SlidesPresentation
        slides={slides}
        currentSlide={currentSlide}
        changeSlide={changeSlide}
        updateSpeakerNote={updateSpeakerNote}
      />
      <ActionsBar isDirty={isDirty} onSave={save} onDiscard={discard} />
    </Box>
  )
}

export default MainContainer
