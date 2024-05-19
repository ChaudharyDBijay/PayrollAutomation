import { expect, test } from "../page-object-models/base.ts";

test.describe("This is to verify active Employee", () => {
  test.use({ baseURL: "https://reqres.in/api" });

  test.only("API testing demo", async ({ request }) => {
    const response = await request.get("/users?page=2");
try {
    const responseBody = JSON.parse(await response.text());
    console.log(responseBody);
} catch (error) {
    // Handle parsing error here, log or throw as needed
    console.error("Error parsing response body:", error);
}
  });

  test("GET Request", async ({ request }) => {
    const response = await request.get("/users/1");
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.data.id).toBe(1);
    expect(responseBody.data.first_name).toContain("ge");
    console.log(responseBody.data.first_name);
  });

  test.skip("POST request", async ({ request }) => {
    const response = await request.post("/users", {
      data: { name: "breazy", job: "brodin" },
    });
    const body = await response.text()
    var responseBody = JSON.parse(body);
    console.log(responseBody);
  });

  test.skip("this is before method", async ({ loginPage }) => {
    await loginPage.login("payroll@grr.la", "Admin@123");
  });

  test.skip("Verifying Active Employee", async ({
    page,
    activeEmployeePage,
  }) => {
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
