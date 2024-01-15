import { test, expect, type Page } from '@playwright/test';

test.describe('missing baggage page', () => {
  test('should load default route', async ({page}) => {
    await page.goto('http://localhost:4200');

    await expect(page).toHaveTitle('MissingBaggages');
  });

  test('should has the missing baggage form', async ({page}) => {
    await page.goto('http://localhost:4200');

    expect(page.locator('form')).toBeDefined();
  });

  test('should view form error messages with invalid form', async ({page}) => {
    await page.goto('http://localhost:4200');

    await page.locator('[data-test="submit"]').click();

    const confirmation = page.getByTestId('confirmation-message');
    console.log(confirmation)
    await expect(page.locator('mat-error')).toHaveCount(4);
    await expect(confirmation).toBeHidden();
    await expect(page).toHaveURL('http://localhost:4200');
  });

  test('should view confirmation message with valid data', async ({page}) => {
    await page.goto('http://localhost:4200');

    await page.locator('input').first().fill('01/11/2023');
    await page.locator('input').nth(1).fill('Airport1');
    await page.locator('input').nth(2).fill('Airport2');
    await page.locator('input').nth(4).fill('2');

    await page.locator('[data-test="submit"]').click();

    await expect(page.getByTestId('confirmation-message')).toBeVisible();
  });

});