import { test, expect } from '@playwright/test'

test('Login_exitoso', async ({page}) =>{
    await  page.goto ('https://www.saucedemo.com/')

    await page.getByRole('textbox', {name:'Username'}).fill('standart_user')
    await page.getByRole('textbox', {name:'Password'}).fill('secret_sauce')
    await page.getByRole('button', {name:'login'}).click()

    await page.pause()

});