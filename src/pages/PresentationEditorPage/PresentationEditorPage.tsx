import Box from '@mui/material/Box'

import Sidebar from '../../components/Sidebar/SideBar'
import MainContainer from '../../components/MainContainer/MainContainer'

const PresentationEditorPage = () => (
  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100vh' }}>
    <MainContainer />
    <Sidebar />
  </Box>
)

export default PresentationEditorPage
