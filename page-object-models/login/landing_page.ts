import { expect, type Locator, type Page } from "@playwright/test";
const dashboardLayoutText = [
  "Dashboard",
  "Payroll Pending List",
  "Pre Onboarding and Boarding Today: List",
];
const dashboardTableTexts = [
  "Date",
  "Total Onboarded Today",
  "Total PreOnboarding Today",
  "Prefund Account Balance",
  "Is Prefund Company?",
  "Company Name",
];
const navigationBarMenuText = [
  "Dashboard",
  "User Management",
  "Setup",
  "Top Up Management",
  "Employee Management",
  "Payroll Refund",
  "Reports",
];
const topupManagementMenuText = [
  "Multi Approval Setup",
  "Topup Add",
  "Topup Approve",
  "Prefund List",
  "Prefund Add",
  "Prefund Pre-Approve",
  "Prefund Approve",
  "Prefund Debit",
  "Prefund Debit Approve",
];
const reportsMenuText = [
  "Onboarding Report",
  "Prefund Reconciliation Report",
  "Topup Reconciliation Report",
  "Transaction History Report",
  "Payroll Transaction Summary Report",
  "Payroll Transaction Detail Report",
];
const payrollRefundMenuText = ["Refund Add", "Refund Approve"];
const employeeManagementMenuText = [
  "Onboarding Payroll",
  "Active Employee",
  "Deleted Employee",
];
const usermanagementMenuText = ["Role", "User"];
const setupMenuText = ["Company", "Hash Setting"];

export class LandingPage {
  private readonly page: Page;

  private readonly pageHeader1: Locator;
  private readonly pageHeader2: Locator;
  private readonly pageTopbar: Locator;
  private readonly dashboardLayout: Locator;
  private readonly dashboardTable: Locator;
  private readonly navigationbarMenu: Locator;
  private readonly usermanagementButton: Locator;
  private readonly usermanagementMenu: Locator;
  private readonly setupButton: Locator;
  private readonly setupMenu: Locator;
  private readonly topupManagementButton: Locator;
  private readonly topupManagementMenu: Locator;
  private readonly employeeManagementButton: Locator;
  private readonly employeeManagementMenu: Locator;
  private readonly payrollRefundButton: Locator;
  private readonly payrollRefundMenu: Locator;
  private readonly reportsButton: Locator;
  private readonly reportsMenu: Locator;
  private readonly onbboardingMeanu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeader1 = page.locator(".user-name-text");
    this.pageHeader2 = page.locator(".user-name-sub-text");
    this.pageTopbar = page.locator("#page-topbar").getByRole("link");
    this.dashboardLayout = page.locator("#layout-wrapper");
    this.dashboardTable = page.locator("thead");
    this.navigationbarMenu = page.locator("#navbar-nav");
    this.usermanagementButton = page.getByRole("button", {
      name: " User Management 󰅂",
    });
    this.usermanagementMenu = page.locator("#id-UserManagement");
    this.setupButton = page.getByRole("button", { name: " Setup 󰅂" });
    this.setupMenu = page.locator("#id-Setup");
    this.topupManagementButton = page.getByRole("button", {
      name: " Top Up Management 󰅂",
    });
    this.topupManagementMenu = page.locator("#id-TopUpManagement");
    this.employeeManagementButton = page.getByRole("button", {
      name: " Employee Management 󰅂",
    });
    this.employeeManagementMenu = page.locator("#id-EmployeeManagement");
    this.payrollRefundButton = page.getByRole("button", {
      name: " Payroll Refund 󰅂",
    });
    this.payrollRefundMenu = page.locator("#id-PayrollRefund");
    this.reportsButton = page.getByRole("button", { name: " Reports 󰅂" });
    this.reportsMenu = page.locator("#id-Reports");
    this.onbboardingMeanu = page.locator("locator");
  }

  async verifyLandingPage(roleName: string, roleState: string) {
    await expect(this.pageHeader1).toContainText(roleName);
    await expect(this.pageHeader2).toContainText(roleState);
    await expect(this.pageTopbar).toBeVisible();
    await verifyTextsInLocator(this.dashboardLayout, dashboardLayoutText);
    await verifyTextsInLocator(this.dashboardTable, dashboardTableTexts);
  }

  async verifyNavigationMenu() {
    await verifyTextsInLocator(this.navigationbarMenu, navigationBarMenuText);
  }
  async verifyUserManagementMenu() {
    await this.usermanagementButton.click();
    await verifyTextsInLocator(this.usermanagementMenu, usermanagementMenuText);
  }
  async verifySetupMenu() {
    await this.setupButton.click();
    await verifyTextsInLocator(this.setupMenu, setupMenuText);
  }
  async verifyTopupManagementMenu() {
    await this.topupManagementButton.click();
    await verifyTextsInLocator(
      this.topupManagementMenu,
      topupManagementMenuText
    );
  }
  async verifyEmployeeManagementMenu() {
    await this.employeeManagementButton.click();
    await verifyTextsInLocator(
      this.employeeManagementMenu,
      employeeManagementMenuText
    );
  }
  async verifyPayrollRefundMenu() {
    await this.payrollRefundButton.click();
    await verifyTextsInLocator(this.payrollRefundMenu, payrollRefundMenuText);
  }
  async verifyReportsMenu() {
    await this.reportsButton.click();
    await verifyTextsInLocator(this.reportsMenu, reportsMenuText);
  }
}

async function verifyTextsInLocator(locator: Locator, texts: string[]) {
  for (const text of texts) {
    await expect(locator).toContainText(text);
  }
}
