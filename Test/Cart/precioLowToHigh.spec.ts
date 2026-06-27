import { test, expect } from '@playwright/test'

test('precio low to high', async ({page}) =>{

    await  page.goto ('https://www.saucedemo.com/')
//login
    await page.getByRole('textbox', {name:'Username'}).fill('standard_user')
    await page.getByRole('textbox', {name:'Password'}).fill('secret_sauce')
    await page.getByRole('button', {name:'Login'}).click()

    // Seleccion de low to high
    
    await page.getByRole('combobox').selectOption('lohi')

    // 
    const firstProduct =  await page.locator('.inventory_item_name').first().textContent()
    const firstPrice =  await page.locator('.inventory_item_price').first().textContent()
    const lastProduct =  await page.locator('.inventory_item_name').last().textContent()
    const lastPrice =   await page.locator('.inventory_item_price').last().textContent()

    console.log('Primer produco',firstProduct, '$',firstPrice )
    console.log('Ultimo product',lastProduct, '$',lastPrice )

     await page.pause()

    });
