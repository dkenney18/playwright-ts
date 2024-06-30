const { test, expect } = require('@playwright/test');

const testCases = [
  {
    "id": 1,
    "name": "Test Case 1",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Draft project brief",
  },
  {
    "id": 2,
    "name": "Test Case 2",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Schedule kickoff meeting",
  },
  {
    "id": 3,
    "name": "Test Case 3",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Share timeline with teammates",
  },
  {
    "id": 4,
    "name": "Test Case 4",
    "leftNav": "Work Requests",
    "column": "New Requests",
    "card_title": "[Example] Laptop setup for new hire",
  },
  {
    "id": 5,
    "name": "Test Case 5",
    "leftNav": "Work Requests",
    "column": "In Progress",
    "card_title": "[Example] Password not working",
  },
  {
    "id": 6,
    "name": "Test Case 6",
    "leftNav": "Work Requests",
    "column": "Completed",
    "card_title": "[Example] New keycard for Daniela V",
  }
];

test.describe('Asana Data-Driven Tests', () => {
  testCases.forEach((data) => {
    test(`name: ${data.name}, id: ${data.id}`, async ({ page }) => {
      await test.step('Login to Asana', async () => {
        const emailInput = page.locator("//html/body/div[1]/div/div[2]/div/div/form/div[1]/div[2]/div/input");
        const passwordInput = page.locator("//html/body/div[1]/div/div[2]/div[2]/form/div[1]/div[2]/div/input");
        const continueButton = page.locator("//html/body/div[1]/div/div[2]/div/div/form/div[2]")
        const loginButton = page.locator("//html/body/div[1]/div/div[2]/div[2]/form/div[2]")

        const email = "ben+pose@workwithloop.com";
        const password = "Password123";

        await page.goto('https://app.asana.com/');

        await emailInput.fill(email);
        await continueButton.click();

        await passwordInput.fill(password);
        await loginButton.click();
      });

      await test.step('Navigate to the project page', async () => {
        // Navigate to the project page

        const sidebar = page.locator("#asana_sidebar");
        const leftNav = sidebar.getByText(data.leftNav);
        await leftNav.click();
      
      });

      await test.step('Verify the card is within the right column', async () => {
        // Verify the card is within the right column
        const column = page.locator(".BoardBody-columns", {hasText: data.column});
        const card = column.locator(".SortableItem").getByText(data.card_title);
        const columTitle = column.locator(".BoardColumnHeader-headerTitle").filter({ hasText: data.column });

        await expect(card).toHaveText(data.card_title);
        await expect(columTitle).toHaveText(data.column);
      });
    });
  });
});
