import * as images from './images'

import Questions from '../components/Sidebar/Questions/Questions.jsx'
import Presentations from '../components/Sidebar/Presentations/Presentations.jsx'

// Tabs displayed on sidebar.
export const tabs = [
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

/**
 * Init slides with for each slide : content corresponding to an image, id & speaker note (empty by default).
 *
 * @returns array
 *   Slides.

 */
const getSlides = () => {
  const slides = []
  for (let index = 1; index <= 21; index++) {
    slides.push({
      id: index,
      content: images['image' + index],
      speakerNote: ''
    })
  }

  return slides
}

export const slides = getSlides()
