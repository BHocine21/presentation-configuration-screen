import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => window.localStorage.clear())
  await page.reload()
})

test('navigates between slides', async ({ page }) => {
  await expect(page.getByText('1/21')).toBeVisible()

  await page.getByRole('button', { name: 'Next slide' }).click()
  await expect(page.getByText('2/21')).toBeVisible()

  await page.getByRole('button', { name: 'Previous slide' }).click()
  await expect(page.getByText('1/21')).toBeVisible()
})

test('edits a speaker note, saves it, and the note survives a reload', async ({ page }) => {
  const noteField = page.getByLabel('Speaker note')
  const saveButton = page.getByRole('button', { name: 'Save' })

  await expect(saveButton).toBeDisabled()

  await noteField.fill('Remember to slow down on this slide')
  await noteField.blur()
  await expect(saveButton).toBeEnabled()

  await saveButton.click()
  await expect(saveButton).toBeDisabled()

  await page.reload()
  await expect(page.getByLabel('Speaker note')).toHaveValue('Remember to slow down on this slide')
})

test('discards an unsaved speaker note edit', async ({ page }) => {
  const noteField = page.getByLabel('Speaker note')
  const discardButton = page.getByRole('button', { name: 'Discard' })

  await noteField.fill('A note that will be discarded')
  await noteField.blur()
  await expect(discardButton).toBeEnabled()

  await discardButton.click()

  await expect(noteField).toHaveValue('')
  await expect(discardButton).toBeDisabled()
})

test('switches between the sidebar tabs', async ({ page }) => {
  await expect(page.getByText('Question 1')).toBeVisible()

  await page.getByRole('tab', { name: 'Update presentation' }).click()

  await expect(page.getByText('Presentation 1')).toBeVisible()
  await expect(page.getByText('Question 1')).not.toBeVisible()
})
