import { test } from "../page-object-models/base.ts";

test.describe("Test Case related to Login and Dashboard check", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto("/login");
  });

  test("Verify login page", async ({}) => {

  });

  test("Verify Valid Login", async ({ loginPage, landingPage }) => {
    await loginPage.fillEmail("initiator@mail7.io");
    await loginPage.fillPassword("Payroll@0987");
    await loginPage.clickLoginButton();
    await landingPage.verifyLandingPage(
      "Initiator - OP",
      "Payroll Initiator - OP"
    );
  });

  test("Verify the landing page and all the available setting", async ({
    loginPage,
    landingPage,
  }) => {
    await loginPage.login("payroll@grr.la", "Admin@123");
    await landingPage.verifyLandingPage(
      "Payroll",
      "Admin-istrator"
    );
    await landingPage.verifyNavigationMenu();
    await landingPage.verifyUserManagementMenu();
    await landingPage.verifySetupMenu();
    await landingPage.verifyTopupManagementMenu();
    await landingPage.verifyEmployeeManagementMenu();
    await landingPage.verifyPayrollRefundMenu();
    await landingPage.verifyReportsMenu();
  });

  test("Verify login button with empty credentials", async ({ loginPage }) => {
    await loginPage.clickLoginButton();
    await loginPage.verifyEmptyEmailField();
    await loginPage.verifyEmptyPasswordField();
  });

  test("Verify Login with invalid Credentials", async ({ loginPage }) => {
    await loginPage.fillEmail("initiator@mail7.io");
    await loginPage.fillPassword("Password");
    await loginPage.clickLoginButton();
    await loginPage.verifyInvalidUsernameOrPasswordAlert();
    await loginPage.popupButtonVerification();
  });

  test("Verify Login with Invalid Password", async ({ loginPage }) => {
    await loginPage.fillEmail("initiator@mail7.io");
    await loginPage.fillPassword("Password");
    await loginPage.clickLoginButton();
    await loginPage.popupButtonVerification();
    await loginPage.clickLoginButton();
    await loginPage.verifyUserLockedOutForInvalidAttemptsAlert();
  });

  test.afterEach(async () => {
  });
});
