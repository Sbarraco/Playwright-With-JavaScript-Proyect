import { test, expect } from '@playwright/test'

test('producto_validado', async ({page}) =>{

    await  page.goto ('https://www.saucedemo.com/')
//login
    await page.getByRole('textbox', {name:'Username'}).fill('standard_user')
    await page.getByRole('textbox', {name:'Password'}).fill('secret_sauce')
    await page.getByRole('button', {name:'Login'}).click()

    const productName = 'Sauce Labs Backpack';
    const productPrice = '29.99';
       
// Seleccion de producto
    const item = page.locator('#inventory_container .inventory_item').filter({
  hasText: 'Sauce Labs Backpack'})

    await item.getByRole('button', { name: 'Add to cart' }).click()

// Verificacion de producto en el carrito de compras
        await page.locator('a.shopping_cart_link').click()
    
// Verificacion del producto 
        await expect(
            page.locator('.inventory_item_name')).toHaveText(productName)

        await expect
        (page.locator('.inventory_item_price')).toHaveText(productPrice)

    await expect
        (page.getByRole('button', { name: 'Checkout' })).toBeVisible()


});