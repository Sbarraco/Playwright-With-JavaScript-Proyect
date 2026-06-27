import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  readonly title: Locator;
  readonly cartItems: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByText('Your Cart');
    this.cartItems = page.locator('.cart_item');
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  // Validar que el carrito cargo correctamente
  async validateCartPage() {
    await expect(this.title).toBeVisible();
  }

  // Validar producto agregado
  async validateProduct(productName: string) {
    await expect(
      this.page.locator('.inventory_item_name').filter({ hasText: productName })
    ).toBeVisible();
  }

  // Remover producto desde el carrito
  async removeProduct(productName: string) {
    await this.page
      .locator('.cart_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  // Continuar comprando
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  // Ir al checkout
  async goToCheckout() {
    await this.checkoutButton.click();
  }
}