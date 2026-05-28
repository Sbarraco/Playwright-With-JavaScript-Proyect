import { test, expect } from '@playwright/test'

    test('usuario_Invalido', async ({page}) =>{
        await page.goto('https://www,saucedemo.com/')

        await page.getByRole('textbox', {name:'Username'}).fill('Invalid_user')
        await page.getByRole('textbox', {name:'Password'}).fill('Invalid_Password')

        await page.getByRole('button', {name:'login'}).click()
        
    })