import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '../../test/renderWithProviders'
import ActionsBar from './ActionsBar'

describe('ActionsBar', () => {
  it('disables both buttons when there are no unsaved changes', () => {
    renderWithProviders(<ActionsBar isDirty={false} onSave={jest.fn()} onDiscard={jest.fn()} />)

    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Discard' })).toBeDisabled()
  })

  it('enables both buttons and triggers callbacks when there are unsaved changes', async () => {
    const user = userEvent.setup()
    const onSave = jest.fn()
    const onDiscard = jest.fn()
    renderWithProviders(<ActionsBar isDirty onSave={onSave} onDiscard={onDiscard} />)

    await user.click(screen.getByRole('button', { name: 'Save' }))
    await user.click(screen.getByRole('button', { name: 'Discard' }))

    expect(onSave).toHaveBeenCalledTimes(1)
    expect(onDiscard).toHaveBeenCalledTimes(1)
  })
})
