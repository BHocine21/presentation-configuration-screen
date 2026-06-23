import type { ComponentType } from 'react'

import * as images from './images'
import type { Slide } from '../types/slide'
import type { Question } from '../types/question'
import type { Presentation } from '../types/presentation'

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
    Component: Questions,
  },
  {
    name: 'presentations',
    title: 'Update presentation',
    Component: Presentations,
  },
]

// Key used to persist edited slides (speaker notes) in localStorage.
export const SAVED_SLIDES_STORAGE_KEY = 'presentation-configuration-screen:saved-slides'

// Mock questions displayed on the sidebar "Questions" tab.
export const mockQuestions: Question[] = [
  { id: 1, label: 'Question 1' },
  { id: 2, label: 'Question 2' },
  { id: 3, label: 'Question 3' },
  { id: 4, label: 'Question 4' },
  { id: 5, label: 'Question 5' },
  { id: 6, label: 'Question 6' },
]

// Mock presentations displayed on the sidebar "Presentations" tab.
export const mockPresentations: Presentation[] = [
  { id: 1, label: 'Presentation 1' },
  { id: 2, label: 'Presentation 2' },
  { id: 3, label: 'Presentation 3' },
  { id: 4, label: 'Presentation 4' },
  { id: 5, label: 'Presentation 5' },
  { id: 6, label: 'Presentation 6' },
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
      speakerNote: '',
    })
  }

  return slides
}

export const slides = getSlides()
