import LoginPage from '../pages/LoginPage';
import DirectoryPage from '../pages/DirectoryPage';

import { LOGIN_DATA } from '../data/loginData';
import { DIRECTORY_DATA } from '../data/directoryData';


describe('Directory OrangeHRM - Page Object Model', () => {

  // LOGIN SEBELUM SETIAP TEST
  beforeEach(() => {
    LoginPage.visit();

    const data = LOGIN_DATA.valid;
    LoginPage.login(data.username, data.password);

    LoginPage.verifyDashboard();
  });


  // TC-DR-001 - Menampilkan halaman Directory
  it('TC-DR-001 - Menampilkan halaman Directory', () => {

    // INTERCEPT
    cy.intercept('GET', '**/api/v2/directory/employees*')
      .as('loadDirectory');

    // ACTION
    DirectoryPage.visit();

    // ASSERTION
    cy.wait('@loadDirectory').then(({ response }) => {
      expect(response).to.exist;
      expect(response.statusCode).to.equal(200);
    });

    DirectoryPage.verifyDirectoryPage();
  });


  // TC-DR-002 - Menampilkan daftar karyawan
  it('TC-DR-002 - Menampilkan daftar karyawan', () => {

    // INTERCEPT
    cy.intercept('GET', '**/api/v2/directory/employees*')
      .as('getEmployeeList');

    // ACTION
    DirectoryPage.visit();

    // ASSERTION
    cy.wait('@getEmployeeList').then(({ response }) => {
      expect(response).to.exist;
      expect(response.statusCode).to.equal(200);
      expect(response.body.data).to.be.an('array');
    });

    DirectoryPage.verifySearchResults();
  });


  // TC-DR-003 - Mencari karyawan berdasarkan nama valid
  it('TC-DR-003 - Mencari karyawan berdasarkan nama valid', () => {

    // INTERCEPT
    cy.intercept('GET', '**/api/v2/directory/employees*')
      .as('searchValidName');

    // ACTION
    DirectoryPage.visit();
    cy.wait('@searchValidName');

    DirectoryPage.enterEmployeeName(DIRECTORY_DATA.validName);
    DirectoryPage.selectFirstEmployeeSuggestion();
    DirectoryPage.clickSearch();

    // ASSERTION
    cy.wait('@searchValidName').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.data).to.be.an('array');
    });

    DirectoryPage.verifySearchResults();
  });


    // TC-DR-004 - Mencari karyawan yang tidak terdaftar
    it('TC-DR-004 - Mencari karyawan yang tidak terdaftar', () => {

    // INTERCEPT
    cy.intercept('GET', '**/api/v2/directory/employees*')
        .as('searchInvalidName');

    // ACTION
    DirectoryPage.visit();
    cy.wait('@searchInvalidName');

    DirectoryPage.enterEmployeeName(DIRECTORY_DATA.invalidName);
    DirectoryPage.clickSearch();

    // ASSERTION
    cy.wait('@searchInvalidName').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
        expect(response.body.data).to.be.an('array');
        expect(response.body.data).to.have.length(0);
    });

    });

  // TC-DR-005 - Mencari karyawan menggunakan nama sebagian
  it('TC-DR-005 - Mencari karyawan menggunakan nama sebagian', () => {

    // INTERCEPT
    cy.intercept('GET', '**/api/v2/directory/employees*')
      .as('searchPartialName');

    // ACTION
    DirectoryPage.visit();
    cy.wait('@searchPartialName');

    DirectoryPage.enterEmployeeName(DIRECTORY_DATA.partialName);
    DirectoryPage.selectFirstEmployeeSuggestion();
    DirectoryPage.clickSearch();

    // ASSERTION
    cy.wait('@searchPartialName').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.data).to.be.an('array');
    });

    DirectoryPage.verifySearchResults();
  });


  // TC-DR-006 - Filter berdasarkan Job Title
  it('TC-DR-006 - Filter berdasarkan Job Title', () => {

    // INTERCEPT
    cy.intercept('GET', '**/api/v2/directory/employees*')
      .as('filterJobTitle');

    // ACTION
    DirectoryPage.visit();
    cy.wait('@filterJobTitle');

    DirectoryPage.selectFirstJobTitle();
    DirectoryPage.clickSearch();

    // ASSERTION
    cy.wait('@filterJobTitle').then(({ response }) => {
    expect(response.statusCode).to.equal(200);
    expect(response.body.data).to.be.an('array');

    DirectoryPage.verifySearchResults(response.body.data.length);
    });
  });

  // TC-DR-007 - Filter berdasarkan Location
  it('TC-DR-007 - Filter berdasarkan Location', () => {

    // INTERCEPT
    cy.intercept('GET', '**/api/v2/directory/employees*')
      .as('filterLocation');

    // ACTION
    DirectoryPage.visit();
    cy.wait('@filterLocation');

    DirectoryPage.selectFirstLocation();
    DirectoryPage.clickSearch();

    // ASSERTION
    cy.wait('@filterLocation').then(({ response }) => {
    expect(response.statusCode).to.equal(200);
    expect(response.body.data).to.be.an('array');

    DirectoryPage.verifySearchResults(response.body.data.length);
    });
    });

  // TC-DR-008 - Kombinasi filter
  it('TC-DR-008 - Kombinasi filter Name, Job Title, dan Location', () => {

    // INTERCEPT
    cy.intercept('GET', '**/api/v2/directory/employees*')
      .as('filterCombination');

    // ACTION
    DirectoryPage.visit();
    cy.wait('@filterCombination');

    DirectoryPage.enterEmployeeName(DIRECTORY_DATA.validName);
    DirectoryPage.selectFirstEmployeeSuggestion();

    DirectoryPage.selectFirstJobTitle();
    DirectoryPage.selectFirstLocation();

    DirectoryPage.clickSearch();

    // ASSERTION
    cy.wait('@filterCombination').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body.data).to.be.an('array');
    });

    DirectoryPage.verifySearchResults();
  });

});