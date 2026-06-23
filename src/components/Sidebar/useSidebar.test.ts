import { act, renderHook } from '@testing-library/react'

import { tabs } from '../../constants/constants'
import { useSidebar } from './useSidebar'

describe('useSidebar', () => {
  it('starts on the first tab', () => {
    const { result } = renderHook(() => useSidebar())

    expect(result.current.currentTab).toBe(tabs[0].name)
    expect(result.current.CurrentComponent).toBe(tabs[0].Component)
  })

  it('switches the current component when the tab changes', () => {
    const { result } = renderHook(() => useSidebar())

    act(() => {
      result.current.setCurrentTab(tabs[1].name)
    })

    expect(result.current.currentTab).toBe(tabs[1].name)
    expect(result.current.CurrentComponent).toBe(tabs[1].Component)
  })
})
