import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

import { mockPresentations } from '../../../constants/constants'

const Presentations = () => (
  <List sx={{ py: 0 }}>
    {mockPresentations.map(presentation => (
      <ListItem key={presentation.id} sx={{ borderTop: 1, borderColor: 'divider' }}>
        <ListItemText primary={presentation.label} />
      </ListItem>
    ))}
  </List>
)

export default Presentations
