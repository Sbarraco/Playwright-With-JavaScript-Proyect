import { test, expect } from '@playwright/test'


test('loginBloqueado', async ({page}) =>{
    await  page.goto ('https://www.saucedemo.com/')
    
    await page.getByRole('textbox', {name:'Username'}).fill('locked_out_user')
    await page.getByRole('textbox', {name:'Password'}).fill('secret_sauce')
    await page.getByRole('button', {name:'login'}).click()
    
    await page.pause()    
    });