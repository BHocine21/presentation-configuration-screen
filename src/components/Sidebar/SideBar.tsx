import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import { useSidebar } from './useSidebar'

const Sidebar = () => {
  const { tabs, currentTab, setCurrentTab, CurrentComponent } = useSidebar()

  return (
    <Box
      component="aside"
      sx={{
        width: { xs: '100%', md: 300 },
        height: { xs: '35vh', md: '100%' },
        flexShrink: 0,
        overflowY: 'auto',
        bgcolor: 'background.default',
        borderLeft: { xs: 0, md: 1 },
        borderTop: { xs: 1, md: 0 },
        borderColor: 'divider',
      }}
    >
      <Tabs
        value={currentTab}
        onChange={(_event, value: string) => {
          setCurrentTab(value)
        }}
        variant="fullWidth"
      >
        {tabs.map(tab => (
          <Tab key={tab.name} label={tab.title} value={tab.name} />
        ))}
      </Tabs>
      <CurrentComponent />
    </Box>
  )
}

export default Sidebar
