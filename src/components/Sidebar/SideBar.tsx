import React, { useMemo, useState } from 'react'

import { tabs } from '../../constants/constants.js'

const Sidebar = () => {
  // Tabs present on sidebar.
  const [currentTab, setCurrentTab] = useState('questions')
  // Current component displayed.
  const CurrentComponent = useMemo(() => tabs.find(tab => tab.name === currentTab).Component)

  return (
    <div className='sidebar'>
        <ul className='menu'>
        {tabs.map((tab, index) => (
          <li className={`menu-item ${tab.name === currentTab ? 'active' : ''}`} key={index}>
            <button type='button' onClick={() => setCurrentTab(tab.name)}>{tab.title}</button>
          </li>
        ))}
        </ul>
        <CurrentComponent />
    </div>
  )
}

export default Sidebar
