import type { ComponentType } from 'react'

import * as images from './images'
import type { Slide } from '../types/slide'

import Questions from '../components/Sidebar/Questions/Questions'
import Presentations from '../components/Sidebar/Presentations/Presentations'

type Tab = {
  name: string
  title: string
  Component: ComponentType
}

// Tabs displayed on sidebar.
export const tabs: Tab[] = [
  {
    name: 'questions',
    title: 'Insert questions',
    Component: Questions
  },
  {
    name: 'presentations',
    title: 'Update presentation',
    Component: Presentations
  }
]

const imagesByName: Record<string, string> = images

/**
 * Init slides with for each slide : content corresponding to an image, id & speaker note (empty by default).
 *
 * @returns Slide[]
 *   Slides.
 */
const getSlides = (): Slide[] => {
  const slides: Slide[] = []
  for (let index = 1; index <= 21; index++) {
    slides.push({
      id: index,
      content: imagesByName['image' + index],
      speakerNote: ''
    })
  }

  return slides
}

export const slides = getSlides()
