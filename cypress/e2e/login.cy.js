
import LoginPage from '../pages/LoginPage';

import {
  DASHBOARD_URL,
  LOGIN_DATA
} from '../data/loginData';

describe('Login OrangeHRM - Page Object Model', () => {

  // TC01 - Login dengan username invalid
  it('TC01 - Login dengan username invalid', () => {

    // Intercept
    cy.intercept('POST', '**/web/index.php/auth/validate')
      .as('loginInvalid');

    // Action
    LoginPage.visit();

    const data = LOGIN_DATA.invalidUsername;
    LoginPage.login(data.username, data.password);

    // Assertion
    LoginPage.verifyInvalidCredentials();
    cy.url().should('include', '/auth/login');

    // Intercept Assertion
    cy.wait('@loginInvalid').then(({ request, response }) => {
      expect(request.method).to.equal('POST');
      expect(response).to.exist;
      expect(response.statusCode).to.be.oneOf([200, 302]);
    });
  });


  // TC02 - Login dengan username dan password valid
  it('TC02 - Login dengan username dan password valid', () => {

    // Intercept
    cy.intercept('GET', '**/web/index.php/api/v2/dashboard/shortcuts')
      .as('dashboardShortcuts');

    // Action
    LoginPage.visit();

    const data = LOGIN_DATA.valid;
    LoginPage.login(data.username, data.password);

    // Assertion
    LoginPage.verifyDashboard();

    // Intercept Assertion
    cy.wait('@dashboardShortcuts', { timeout: 60000 })
      .then(({ request, response }) => {
        expect(request.method).to.equal('GET');
        expect(response).to.exist;
        expect(response.statusCode).to.equal(200);
      });
  });


  // TC03 - Login dengan username kosong
  it('TC03 - Login dengan username kosong', () => {

    // Intercept
    cy.intercept('POST', '**/web/index.php/auth/validate')
      .as('loginEmptyUsername');

    // Action
    LoginPage.visit();
    LoginPage.enterPassword(LOGIN_DATA.valid.password);
    LoginPage.clickLogin();

    // Assertion
    LoginPage.getErrorMessages()
      .first()
      .should('be.visible')
      .and('contain', 'Required');

    // Intercept Assertion
    cy.get('@loginEmptyUsername.all').should('have.length', 0);
  });


  // TC04 - Login dengan password kosong
  it('TC04 - Login dengan password kosong', () => {

    // Intercept
    cy.intercept('POST', '**/web/index.php/auth/validate')
      .as('loginEmptyPassword');

    // Action
    LoginPage.visit();
    LoginPage.enterUsername(LOGIN_DATA.valid.username);
    LoginPage.clickLogin();

    // Assertion
    LoginPage.getErrorMessages()
      .last()
      .should('be.visible')
      .and('contain', 'Required');

    // Intercept Assertion
    cy.get('@loginEmptyPassword.all').should('have.length', 0);
  });


  // TC05 - Login dengan username dan password kosong
  it('TC05 - Login dengan username dan password kosong', () => {

    // Intercept
    cy.intercept('POST', '**/web/index.php/auth/validate')
      .as('loginBothEmpty');

    // Action
    LoginPage.visit();
    LoginPage.clickLogin();

    // Assertion - Username
    LoginPage.getUsernameField()
      .parent()
      .parent()
      .find('.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain', 'Required');

    // Assertion - Password
    LoginPage.getPasswordField()
      .parent()
      .parent()
      .find('.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain', 'Required');

    // Intercept Assertion
    cy.get('@loginBothEmpty.all').should('have.length', 0);
  });


  // TC06 - Login dengan password berbeda kapitalisasi
  it('TC06 - Login dengan password berbeda kapitalisasi', () => {

    // Intercept
    cy.intercept('POST', '**/web/index.php/auth/validate')
      .as('loginWrongCase');

    // Action
    LoginPage.visit();

    const data = LOGIN_DATA.invalidPasswordCase;
    LoginPage.login(data.username, data.password);

    // Assertion
    LoginPage.verifyInvalidCredentials();
    cy.url().should('include', '/auth/login');

    // Intercept Assertion
    cy.wait('@loginWrongCase').then(({ request, response }) => {
      expect(request.method).to.equal('POST');
      expect(response).to.exist;
      expect(response.statusCode).to.be.oneOf([200, 302]);
    });
  });


  // TC07 - Membuka Dashboard tanpa login
  it('TC07 - Membuka Dashboard tanpa login', () => {

    // Intercept
    cy.intercept('GET', '**/web/index.php/dashboard/index')
      .as('dashboardWithoutLogin');

    // Action
    cy.visit(DASHBOARD_URL, { timeout: 120000 });

    // Assertion
    cy.url().should('include', '/auth/login');
    LoginPage.verifyLoginPage();

    // Intercept Assertion
    cy.wait('@dashboardWithoutLogin').then(({ request, response }) => {
      expect(request.method).to.equal('GET');
      expect(response).to.exist;
      expect(response.statusCode).to.be.oneOf([200, 302]);
    });
  });


  // TC08 - Memeriksa tampilan halaman Login
  it('TC08 - Memeriksa tampilan halaman Login', () => {

    // Intercept
    cy.intercept('GET', '**/web/index.php/auth/login')
      .as('loginPage');

    // Action
    LoginPage.visit();

    // Assertion - Response
    cy.wait('@loginPage').then(({ response }) => {
      expect(response).to.exist;
      expect(response.statusCode).to.equal(200);
    });

    // Assertion - Tampilan
    LoginPage.getLoginLogo().should('be.visible');
    LoginPage.verifyLoginPage();

    cy.contains('Forgot your password?')
      .should('be.visible');
  });

});
