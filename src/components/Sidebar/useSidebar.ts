import { useMemo, useState } from 'react'

import { tabs } from '../../constants/constants'

export const useSidebar = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0].name)

  const CurrentComponent = useMemo(
    () => tabs.find(tab => tab.name === currentTab)?.Component ?? tabs[0].Component,
    [currentTab],
  )

  return { tabs, currentTab, setCurrentTab, CurrentComponent }
}
