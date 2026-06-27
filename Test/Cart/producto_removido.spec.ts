import { test, expect } from '@playwright/test'

test('producto_removido', async ({page}) =>{

    await  page.goto ('https://www.saucedemo.com/')
//login
    await page.getByRole('textbox', {name:'Username'}).fill('standard_user')
    await page.getByRole('textbox', {name:'Password'}).fill('secret_sauce')
    await page.getByRole('button', {name:'Login'}).click()
       
// Seleccion de producto
    const item = page.locator('#inventory_container .inventory_item').filter({
  hasText: 'Sauce Labs Backpack'})

    await item.getByRole('button', { name: 'Add to cart' }).click()

// Verificacion de producto en el carrito de compras
        await page.locator('a.shopping_cart_link').click()

      await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible()

// Remover producto
        await page.getByRole('button', {name:'remove'}).click()

    await page.pause()

});