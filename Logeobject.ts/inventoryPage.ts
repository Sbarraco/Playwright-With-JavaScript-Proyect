import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByText('Products');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('.product_sort_container');
  }

  // Validar que la página cargo correctamente
  async validateInventoryPage() {
    await expect(this.title).toBeVisible();
  }

  // Validar título "Products"
  async validateTitle() {
    await expect(this.title).toHaveText('Products');
  }

  // Agregar producto al carrito
  async addProductToCart(productName: string) {
    await this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  // Remover producto del carrito
  async removeProductFromCart(productName: string) {
    await this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  // Abrir carrito
  async openCart() {
    await this.cartLink.click();
  }

  // Ordenar productos
  async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  // Validar cantidad de productos
  async validateProductsCount(expectedCount: number) {
    await expect(this.inventoryItems).toHaveCount(expectedCount);
  }

  // Validar badge del carrito
  async validateCartBadge(expectedCount: number) {
    await expect(this.cartBadge).toHaveText(expectedCount.toString());
  }
}