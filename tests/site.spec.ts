import { expect, test } from '@playwright/test'

for(const width of [375,430,768,1024,1440,1920]){
  test(`Home sem overflow em ${width}px`,async({page})=>{
    await page.setViewportSize({width,height:900})
    await page.goto('/')
    await expect(page.getByRole('heading',{name:'PERDEU A CHAVE? PODE CHAMAR O CHAVES.'})).toBeVisible()
    await expect(page.locator('.service-card')).toHaveCount(6)
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true)
    if(width<600) await expect(page.locator('.mobile-cta')).toBeVisible()
    // Visitar as seções para disparar as entradas suaves antes da captura completa.
    for(const section of ['#servicos','.automotive','#sobre','#avaliacoes','#contato']){
      await page.locator(section).scrollIntoViewIfNeeded()
      await page.waitForTimeout(550)
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true)
    }
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}))
    await page.screenshot({path:`test-results/home-${width}.png`,fullPage:true})
  })
}
test('Rotas, filtros e contatos funcionam no subcaminho',async({page})=>{
  await page.goto('/prototipo/#/servicos?categoria=automotivo')
  await expect(page.locator('.service-card')).toHaveCount(4)
  await page.getByRole('button',{name:'Residenciais',exact:true}).click()
  await expect(page.locator('.service-card')).toHaveCount(2)
  await expect(page.locator('.service-card').first()).toHaveAttribute('href',/wa.me\/5531986510530\?text=.*Residencial/)
  await page.reload()
  await expect(page.locator('.service-card')).toHaveCount(4)
  for(const route of ['sobre','contato','avaliacoes']){
    await page.goto(`/prototipo/#/${route}`)
    await expect(page.locator('main h2').first()).toBeVisible()
  }
  await expect(page.getByRole('link',{name:'Ligar agora',exact:true}).first()).toHaveAttribute('href','tel:+5531986510530')
})
test('Menu mobile e acessibilidade por teclado',async({page})=>{
  await page.setViewportSize({width:375,height:812})
  await page.goto('/')
  await page.getByRole('button',{name:'Abrir menu'}).click()
  await page.getByRole('navigation').getByRole('link',{name:'Contato'}).click()
  await expect(page).toHaveURL(/#\/contato/)
  await expect(page.getByRole('button',{name:'Abrir menu'})).toHaveAttribute('aria-expanded','false')
  await page.getByRole('button',{name:'Abrir menu'}).click()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button',{name:'Abrir menu'})).toBeFocused()
  await expect(page.locator('iframe')).toHaveAttribute('title',/Localização/)
})
