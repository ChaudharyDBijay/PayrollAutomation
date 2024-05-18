import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../page-object-models/login/login_page.ts";
import { LandingPage } from "../page-object-models/login/landing_page.ts";
import { ActiveEmployeePage } from "../page-object-models/employee-management/active_employee_page.ts";

type MyFixtures = {
  //page: Page;
  loginPage: LoginPage;
  landingPage: LandingPage;
  activeEmployeePage: ActiveEmployeePage;
};

export const test = base.extend<MyFixtures>({
  // page: async ({ browser }, use) => { // Implement page fixture
  //   const page = await browser.newPage();
  //   await use(page);
  // },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));
  },
  activeEmployeePage: async({ page }, use) => {
    await use(new ActiveEmployeePage(page));
  },

  //other pages.
});

export { expect } from "@playwright/test";
