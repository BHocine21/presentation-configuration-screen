import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SAVED_SLIDES_STORAGE_KEY } from '../../constants/constants'
import { renderWithProviders } from '../../test/renderWithProviders'
import MainContainer from './MainContainer'

describe('MainContainer', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('disables Save and Discard until a speaker note is edited', () => {
    renderWithProviders(<MainContainer />)

    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Discard' })).toBeDisabled()
  })

  it('persists the edited speaker note to localStorage on save', async () => {
    const user = userEvent.setup()
    renderWithProviders(<MainContainer />)

    await user.type(screen.getByLabelText('Speaker note'), 'A note for slide 1')
    await user.tab()
    await user.click(screen.getByRole('button', { name: 'Save' }))

    const persisted = JSON.parse(window.localStorage.getItem(SAVED_SLIDES_STORAGE_KEY) ?? '[]')
    expect(persisted[0].speakerNote).toBe('A note for slide 1')
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
  })

  it('reverts the speaker note on discard', async () => {
    const user = userEvent.setup()
    renderWithProviders(<MainContainer />)

    const noteField = screen.getByLabelText('Speaker note')
    await user.type(noteField, 'Unsaved note')
    await user.tab()
    await user.click(screen.getByRole('button', { name: 'Discard' }))

    expect(screen.getByLabelText('Speaker note')).toHaveValue('')
  })
})
