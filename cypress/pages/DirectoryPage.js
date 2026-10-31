import { DIRECTORY_URL } from '../data/directoryData';

class DirectoryPage {

  // ACTION
  visit() {
    cy.visit(DIRECTORY_URL, { timeout: 120000 });
  }

  enterEmployeeName(name) {
    this.getNameField().clear().type(name);
  }

  selectFirstEmployeeSuggestion() {
    cy.get('.oxd-autocomplete-option')
      .should('be.visible')
      .first()
      .click();
  }

  selectFirstJobTitle() {
    this.getJobTitleFilter().click();

    cy.get('.oxd-select-dropdown')
      .should('be.visible')
      .find('.oxd-select-option')
      .filter(':not(:contains("Select"))')
      .first()
      .click();
  }

  selectFirstLocation() {
    this.getLocationFilter().click();

    cy.get('.oxd-select-dropdown')
      .should('be.visible')
      .find('.oxd-select-option')
      .filter(':not(:contains("Select"))')
      .first()
      .click();
  }

  clickSearch() {
    cy.contains('button', 'Search').click();
  }

  clickReset() {
    cy.contains('button', 'Reset').click();
  }

  // ELEMENT / LOCATOR
  getNameField() {
    return cy.get('input[placeholder="Type for hints..."]');
  }

  getJobTitleFilter() {
    return cy.get('.oxd-select-text').eq(0);
  }

  getLocationFilter() {
    return cy.get('.oxd-select-text').eq(1);
  }

  getSearchResults() {
    return cy.get('.orangehrm-directory-card');
  }

  getNoRecordsMessage() {
    return cy.contains('No Records Found');
  }

    // ASSERTION

    verifyDirectoryPage() {
    cy.contains('h6', 'Directory').should('be.visible');
    this.getNameField().should('be.visible');
    this.getJobTitleFilter().should('be.visible');
    this.getLocationFilter().should('be.visible');
    cy.contains('button', 'Search').should('be.visible');
    }

    verifySearchResults(expectedCount) {
        if (expectedCount !== undefined) {
            this.getSearchResults()
                .should('have.length', expectedCount);
        } else {
            this.getSearchResults()
                .should('be.visible')
                .its('length')
                .should('be.greaterThan', 0);
        }
    }

    verifyNoSearchResults() {
    this.getSearchResults().should('not.exist');
    }

}

export default new DirectoryPage();