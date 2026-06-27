import { test, expect } from '@playwright/test'
    
test('Checkout de compra', async ({page}) =>{

    await  page.goto ('https://www.saucedemo.com/')


    await page.getByRole('textbox', {name:'Username'}).fill('standard_user')
    await page.getByRole('textbox', {name:'Password'}).fill('secret_sauce')
    await page.getByRole('button', {name:'login'}).click()

    await page.pause()
  const productName = 'Sauce Labs Backpack';
    const productPrice = '$29.99';
       

    const item = page.locator('#inventory_container .inventory_item').filter({
  hasText: 'Sauce Labs Backpack'})

    await item.getByRole('button', { name: 'Add to cart' }).click()


    await page.locator('a.shopping_cart_link').click()
    
        await expect(
            page.locator('.inventory_item_name')).toHaveText(productName)

        await expect
        (page.locator('.inventory_item_price')).toHaveText(productPrice)

    await page.getByRole('button', { name: 'Checkout' }).click()
// Completar datos 
    await page.getByPlaceholder('First Name').fill('Rodrigo')
    await page.getByPlaceholder('Last Name').fill('Santone')
    await page.getByPlaceholder('Zip/Postal Code').fill('1000')

    await page.getByRole('button', { name: 'Continue' }).click()    

// Validar que estamos en el resumen
    await expect(
    page.getByText('Checkout: Overview')
).toBeVisible()

// Validar producto en el resumen
    await expect(
    page.locator('.inventory_item_name')
).toHaveText(productName)

    await expect(
    page.locator('.inventory_item_price')
).toHaveText(productPrice)

// Finalizar compra
    await page.getByRole('button', { name: 'Finish' }).click()

// Validar compra completada
    await expect(
    page.getByText('Checkout: Complete!')
).toBeVisible()

// Validar mensaje principal
    await expect(
    page.locator('.complete-header')
).toHaveText('Thank you for your order!')

// Validar mensaje 
    await expect(
    page.locator('.complete-text')
).toContainText(
    'Your order has been dispatched'
)

    
});