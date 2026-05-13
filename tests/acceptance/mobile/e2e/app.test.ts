import { by, device, element, expect } from 'detox'

describe('App Launch', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  it('should display the welcome screen', async () => {
    await expect(element(by.text('LaReact E-Commerce'))).toBeVisible()
  })

  it('should navigate to products', async () => {
    await element(by.text('Products')).tap()
    await expect(element(by.text('Products'))).toBeVisible()
  })
})
