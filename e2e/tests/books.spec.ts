import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const booksTitle = page.getByText('Books');

  // Expect a title "to contain" a substring.
  expect(booksTitle).toBeDefined;
});

test('can add book', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const bookName = await page.getByTestId('bookName');
  const bookAuthor = await page.getByTestId('bookAuthor');

  expect(bookName).toBeDefined;
  expect(bookAuthor).toBeDefined;

  await bookName.fill('test book');
  await bookAuthor.fill('test author');

  const bookSubmit = await page.getByTestId('bookSubmit');

  expect(bookSubmit).toBeDefined;

  await bookSubmit.click();

  const newBook = await page.getByText('test book');
  expect(newBook).toBeDefined;
});
