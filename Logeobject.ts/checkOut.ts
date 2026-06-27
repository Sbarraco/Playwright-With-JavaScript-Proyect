import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;

  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;

  readonly pageTitle: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postalCode = page.getByPlaceholder('Zip/Postal Code');

    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });

    this.errorMessage = page.locator('[data-test="error"]');

    this.pageTitle = page.locator('.title');
    this.completeHeader = page.locator('.complete-header');
  }

  // Completar datos 
  async fillBuyerInformation(first: string, last: string, zip: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
  }

  // Validar errores 
  async validateRequiredFieldError(message: string) {
    await expect(this.errorMessage).toHaveText(message);
  }

  // Continuar compra
  async continueCheckout() {
    await this.continueButton.click();
  }

  // Validar producto 
  async validateProduct(productName: string) {
    await expect(
      this.page.locator('.inventory_item_name').filter({ hasText: productName })
    ).toBeVisible();
  }

  // Finalizar compra
  async finishPurchase() {
    await this.finishButton.click();
  }

  // Validar mensaje de compra
  async validateSuccessfulPurchase() {
    await expect(this.completeHeader).toHaveText(
      'Thank you for your order!'
    );
  }
}