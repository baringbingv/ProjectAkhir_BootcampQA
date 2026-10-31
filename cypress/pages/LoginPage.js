
import { LOGIN_URL } from '../data/loginData';

class LoginPage {

  // =========================
  // ACTION
  // =========================

  visit() {
    cy.visit(LOGIN_URL, { timeout: 120000 });
  }

  visitDashboard() {
    cy.visit(
      'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index',
      { timeout: 120000 }
    );
  }

  enterUsername(username) {
    this.getUsernameField().type(username);
  }

  enterPassword(password) {
    this.getPasswordField().type(password);
  }

  clickLogin() {
    this.getLoginButton().click();
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }

  clickForgotPassword() {
    cy.contains('Forgot your password?').click();
  }


  // =========================
  // ELEMENT / LOCATOR
  // =========================

  getUsernameField() {
    return cy.get('input[name="username"]');
  }

  getPasswordField() {
    return cy.get('input[name="password"]');
  }

  getLoginButton() {
    return cy.get('button[type="submit"]');
  }

  getLoginAlert() {
    return cy.get('.oxd-alert-content-text');
  }

  getErrorMessages() {
    return cy.get('.oxd-input-field-error-message');
  }

  getDashboardBreadcrumb() {
    return cy.get('.oxd-topbar-header-breadcrumb');
  }

  getLoginLogo() {
    return cy.get('.orangehrm-login-branding img');
  }


  // =========================
  // ASSERTION
  // =========================

  verifyInvalidCredentials() {
    this.getLoginAlert()
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  }

  verifyDashboard() {
    cy.url().should('include', '/dashboard');

    cy.contains('h6', 'Dashboard')
      .should('be.visible');
  }

  verifyLoginPage() {
    this.getUsernameField().should('be.visible');
    this.getPasswordField().should('be.visible');
    this.getLoginButton()
      .should('be.visible')
      .and('contain', 'Login');
  }

}

export default new LoginPage();
