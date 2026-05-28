import { test, expect } from '@playwright/test'

test('standart_User', async ({page}) =>{

    await  page.goto ('https://www.saucedemo.com/')

    await page.getByRole('textbox', {name:'Username'}).fill('standard_user')
    await page.getByRole('textbox', {name:'Password'}).fill('secret_sauce')
    await page.getByRole('button', {name:'Login'}).click()
                
    const item = page.locator('#inventory_container .inventory_item').filter({
  hasText: 'Sauce Labs Backpack'})

    await item.getByRole('button', { name: 'Add to cart' }).click()

        await page.locator('a.shopping_cart_link').click()
    await page.pause()

});