import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

type ActionsBarProps = {
  isDirty: boolean
  onSave: () => void
  onDiscard: () => void
}

const pressFeedback = {
  transition:
    'transform 150ms ease-out, background-color 150ms ease-out, box-shadow 150ms ease-out',
  '&:active': { transform: 'scale(0.97)' },
}

const ActionsBar = ({ isDirty, onSave, onDiscard }: ActionsBarProps) => (
  <Box
    component="footer"
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 51,
      px: 2,
      borderTop: 1,
      borderColor: 'divider',
      bgcolor: 'background.default',
    }}
  >
    <Button
      variant="outlined"
      disabled={!isDirty}
      onClick={onDiscard}
      sx={{ borderRadius: 50, ...pressFeedback }}
    >
      Discard
    </Button>
    <Button
      variant="contained"
      disabled={!isDirty}
      onClick={onSave}
      sx={{ borderRadius: 50, ...pressFeedback }}
    >
      Save
    </Button>
  </Box>
)

export default ActionsBar
