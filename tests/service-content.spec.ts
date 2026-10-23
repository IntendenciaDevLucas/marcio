import { expect, test } from '@playwright/test'

test('Fotos, detalhes, orçamento e galeria de antes/depois', async ({ page }) => {
  await page.goto('/#/servicos')
  await page.getByRole('link', { name: 'Ver detalhes e fotos: Reparos automotivos' }).click()
  await expect(page).toHaveURL(/#\/servicos\/reparos/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Reparos automotivos')
  await expect(page.getByText('Programação de transponder', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Ver foto 2: Depois · conjunto de ignição' }).click()
  await expect(page.locator('.service-gallery figcaption')).toContainText('Depois')
  await page.getByRole('button', { name: 'Ampliar foto: Depois · conjunto de ignição' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('button', { name: 'Próxima foto' }).click()
  await expect(page.getByRole('dialog')).toContainText('Punto 2010')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(page.getByRole('link', { name: 'Solicitar orçamento', exact: true })).toHaveAttribute('href', /wa.me\/5531986510530\?text=.*Reparos/)
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Reparos automotivos')
})

test('Serviços confirmados e todas as imagens disponíveis', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  for (const id of ['canivete', 'presenca', 'residencial', 'reparos', 'centrais', 'paineis']) {
    await page.goto(`/#/servicos/${id}`)
    await expect(page.locator('.service-gallery__open img')).toBeVisible()
    await page.locator('.service-gallery__open img').evaluate((image: HTMLImageElement) => image.decode())
    for (const button of await page.locator('.service-gallery__thumbnails button').all()) {
      await button.click()
      await page.locator('.service-gallery__open img').evaluate((image: HTMLImageElement) => image.decode())
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  await expect(page.getByText('Troca de cabo flat', { exact: true })).toBeVisible()
  await page.goto('/#/servicos/residencial')
  await expect(page.getByText('Instalação de fechaduras digitais e tetra', { exact: true })).toBeVisible()
  await expect(page.getByText('Programação de controles de portão', { exact: true })).toBeVisible()
})
