import { type Locator, type Page, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  private readonly emailField: Locator;
  private readonly passwordField: Locator;
  private readonly loginButton: Locator;
  private readonly emptyString: Locator;
  private readonly alertMessage: Locator;
  private readonly forgetPasscodeField: Locator;
  private readonly forgetPasscodeFieldVisibility: Locator;
  private readonly popupOkButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.getByPlaceholder("Enter email");
    this.passwordField = page.getByPlaceholder("Enter password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.forgetPasscodeField = page.locator('form');
    this.forgetPasscodeFieldVisibility = page.getByRole('link', { name: 'Forgot password?' });
    this.emptyString = page.locator('form');
    this.alertMessage =  page.locator('#swal2-title');
    this.popupOkButton = page.getByRole('button', { name: 'OK' });
  }

  async goto(navPath: string) {
    await this.page.goto(navPath); 
  }

  async fillEmail(email: string) {
    await this.emailField.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async verifyEmptyEmailField(){
    await expect(this.emptyString).toContainText('Email is required');
  }
  async verifyEmptyPasswordField(){
    await expect(this.emptyString).toContainText('Password is required');
  }

  async verifyInvalidUsernameOrPasswordAlert(){
    await expect(this.alertMessage).toContainText('Invalid Username or Password');
    //await expect(page.getByRole('heading', { name: 'Invalid Username or Password' })).toBeVisible();
  }

  async verifyUserLockedOutForInvalidAttemptsAlert(){
    await expect(this.alertMessage).toContainText('User Locked out for multiple Invalid Attempts. Please Contact your administrator');
  }

  async login(email: string, password: string) {
    await this.goto("/login");
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async popupButtonVerification(){
    await this.popupOkButton.click();
  }
  
}


