import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

import { mockQuestions } from '../../../constants/constants'

const Questions = () => (
  <List sx={{ py: 0 }}>
    {mockQuestions.map(question => (
      <ListItem key={question.id} sx={{ borderTop: 1, borderColor: 'divider' }}>
        <ListItemText primary={question.label} />
      </ListItem>
    ))}
  </List>
)

export default Questions
