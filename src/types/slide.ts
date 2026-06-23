import { shape, string, number } from 'prop-types'

const slideType = shape({
  id: number,
  content: string,
  speakerNote: string
})

export default slideType
