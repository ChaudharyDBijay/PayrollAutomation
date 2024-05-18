import { url } from "inspector";
import { test } from "../page-object-models/base.ts";

test.describe("This is to verify active Employee", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login("payroll@grr.la", "Admin@123");
  });

  test("Verifying Active Employee", async ({ page, activeEmployeePage }) => {
    await activeEmployeePage.navigateToActiveEmployeePage();
    const adduserapireqpromise = page.waitForResponse((request) => {
      return (
        request.url() ===
          "https://payrolldev.vanillatech.asia/api/OnBoardingPayroll/activeemployee/init" 
      );
    });
    await console.log("==>" + adduserapireqpromise);
    await activeEmployeePage.clickAddActiveEmployeeButton();
    await activeEmployeePage.addActiveEmployee(
      "One Piece",
      "full name",
      "mobile",
      "pan",
      "idnum",
      "staffId"
    );
    await activeEmployeePage.verifyEmployeeDoesntExistAlert();
  });
});
