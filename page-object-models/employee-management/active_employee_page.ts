import { expect, type Locator, type Page } from "@playwright/test";

const addActiveEmployeeText = [
  "Active Employee",
  "Active Employee: Add",
  "List",
  "Company*",
  "Full Name*",
  "Mobile Number*",
  "PAN Number*",
  "Staff Id*",
  "Identification Number*",
];

export class ActiveEmployeePage {
  private readonly page: Page;
  private readonly employeeManagementButton: Locator;
  private readonly activeEmployeeButton: Locator;
  private readonly addActiveEmployeePage: Locator;
  private readonly addActiveEmployeeButton: Locator;
  private readonly addCompanyDropdown: Locator;
  private readonly addFullName: Locator;
  private readonly addMobileNumber: Locator;
  private readonly addPanNumber: Locator;
  private readonly addIdentificationNumber: Locator;
  private readonly addStaffId: Locator;
  private readonly addButton: Locator;
  private readonly popupMessage: Locator;
  private readonly popupOkButton: Locator;

  private readonly filterCompany: Locator;
  private readonly filterFullName: Locator;
  private readonly filterButton: Locator;
  private readonly resetFilterButton: Locator;
  private readonly filteredDetailsRow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.employeeManagementButton = page.getByRole("button", {
      name: " Employee Management 󰅂",
    });
    this.activeEmployeeButton = page.getByRole("link", {
      name: " Active Employee",
    });
    this.addActiveEmployeeButton = page.getByRole("button", {
      name: " Add Active Employee",
    });
    this.addActiveEmployeePage = page.locator("#layout-wrapper");
    this.addCompanyDropdown = page.locator("#payroll_active_employee");
    this.addFullName = page
      .locator("div")
      .filter({ hasText: /^Full Name\*$/ })
      .locator("#chooseUser");
    this.addMobileNumber = page
      .locator("div")
      .filter({ hasText: /^Mobile Number\*$/ })
      .locator("#chooseUser");
    this.addPanNumber = page
      .locator("div")
      .filter({ hasText: /^PAN Number\*$/ })
      .locator("#chooseUser");
    this.addIdentificationNumber = page
      .locator("div")
      .filter({ hasText: /^Identification Number\*$/ })
      .locator("#chooseUser");
    this.addStaffId = page.locator("#staffid");
    this.addButton = page.getByRole("button", { name: "Add" });
    this.popupMessage = page.locator("#swal2-title");
    this.popupOkButton = page.getByRole("button", { name: "OK" });

    this.filterCompany = page.locator("#companyIdFilter");
    this.filterFullName = page.getByLabel("Full Name");
    this.filterButton = page.getByRole("button", { name: " Filter" });
    this.resetFilterButton = page.getByRole("button", { name: " Reset" });
    this.filteredDetailsRow = page.locator("tbody");
  }

  async navigateToActiveEmployeePage(){
    await this.employeeManagementButton.click();
    await this.activeEmployeeButton.click();
  }
  async verifyAddActiveEmployeePage() {
    await verifyTextsInLocator(
      this.addActiveEmployeePage,
      addActiveEmployeeText
    );
  }

  async clickAddActiveEmployeeButton(){
    await this.addActiveEmployeeButton.click();
  }

  async selectCompany(companyname: string) {
    await this.addCompanyDropdown.click();
    await this.page.getByLabel(companyname).click();
  }

  async fillFullName(fullname: string) {
    await this.addFullName.fill(fullname);
  }
  async fillMobileNumber(mobilenum: string) {
    await this.addMobileNumber.fill(mobilenum);
  }
  async fillPanNumber(pannum: string) {
    await this.addPanNumber.fill(pannum);
  }
  async fillIdentificationNumber(identificationnum: string) {
    await this.addIdentificationNumber.fill(identificationnum);
  }
  async fillStaffId(staffid: string) {
    await this.addStaffId.fill(staffid);
  }
  async clickAddButton() {
    await this.addButton.click();
  }
  async addActiveEmployee(
    companyname: string,
    fullname: string,
    mobilenum: string,
    pannum: string,
    identificationnum: string,
    staffid: string
  ) {
    await this.selectCompany(companyname);
    await this.fillFullName(fullname);
    await this.fillMobileNumber(mobilenum);
    await this.fillPanNumber(pannum);
    await this.fillIdentificationNumber(identificationnum);
    await this.fillStaffId(staffid);
    await this.clickAddButton();
  }
  async verifyEmployeeDoesntExistAlert() {
    let message = "Employee doesn't exists.";
    await expect(this.popupMessage).toContainText(message);
    await expect(this.page.getByLabel(message)).toBeVisible();
    await this.popupOkButton.click();
  }

  async verifyEmployeeAlreadyOnboardedAlert() {
    let message = "Employee already onboarded";
    await expect(this.popupMessage).toContainText(message);
    await expect(this.page.getByLabel(message)).toBeVisible();
    await this.popupOkButton.click();
  }

  async selectCountryToFilter(country: string) {
    await this.filterCompany.click();
    await this.page.getByLabel(country).click();
  }
  async enterFullnameToFilter(fullname: string) {
    await this.filterFullName.fill(fullname);
  }
  async clickFilterButton() {
    await this.filterButton.click();
  }
  async filterByName(country: string, fullname: string) {
    await this.selectCountryToFilter(country);
    await this.enterFullnameToFilter(fullname);
    await this.clickFilterButton();
  }
  async clickResetFilterButton() {
    await this.resetFilterButton.click();
  }
  async verifyFilteredDetails(filteredData: string[]) {
    await verifyTextsInLocator(this.filteredDetailsRow, filteredData);
  }
}

async function verifyTextsInLocator(locator: Locator, texts: string[]) {
  for (const text of texts) {
    await expect(locator).toContainText(text);
  }
}
