import { RECRUITMENT_URL, RECRUITMENT_DATA } from '../data/recruitmentData';

class RecruitmentPage {

    // =========================
    // LOCATOR
    // =========================

    loc = {
        sidebarMenu: '.oxd-main-menu-item',

        candidateName: 'input[placeholder="Type for hints..."]',

        selectText: '.oxd-select-text',
        selectDropdown: '.oxd-select-dropdown',
        selectOption: '.oxd-select-option',

        searchButton: 'button[type="submit"]',
        resetButton: 'button[type="reset"]',

        tableRow: '.oxd-table-card',
        errorMessage: '.oxd-input-field-error-message',

        fileInput: 'input[type="file"]',
    };

    // =========================
    // INTERCEPT
    // =========================

    interceptCandidates(alias = 'getCandidates') {
        cy.intercept(
            'GET',
            '**/api/v2/recruitment/candidates*'
        ).as(alias);
    }

    interceptAddCandidate(alias = 'addCandidate') {
        cy.intercept(
            'POST',
            '**/api/v2/recruitment/candidates*'
        ).as(alias);
    }

    // =========================
    // ACTION
    // =========================

    openRecruitment() {
        cy.contains(this.loc.sidebarMenu, 'Recruitment').click();
    }

    visitCandidates() {
        this.interceptCandidates('getCandidates');
        cy.visit(RECRUITMENT_URL.candidates);
        cy.wait('@getCandidates');
    }

    visitAddCandidate() {
        cy.visit(RECRUITMENT_URL.addCandidate);
    }

    enterCandidateName(name) {
        cy.get(this.loc.candidateName)
            .clear()
            .type(name);
    }

    selectFirstCandidateSuggestion() {
        cy.get('.oxd-autocomplete-option')
            .should('be.visible')
            .first()
            .click();
    }

    getFilterGroup(label) {
        return cy.contains('.oxd-input-group', label);
    }

    selectFilter(label, optionIndex = 1) {
        this.getFilterGroup(label)
            .find(this.loc.selectText)
            .click();

        cy.get(this.loc.selectDropdown)
            .should('be.visible')
            .find(this.loc.selectOption)
            .eq(optionIndex)
            .click();
    }

    clickSearch() {
        cy.contains('button', 'Search').click();
    }

    clickReset() {
        cy.contains('button', 'Reset').click();
    }

    // =========================
    // ADD CANDIDATE ACTION
    // =========================

    enterFormField(label, value) {
        this.getFilterGroup(label)
            .find('input')
            .clear()
            .type(value);
    }

    enterFirstName(value) {
        cy.get('input[name="firstName"]')
            .should('be.visible')
            .clear()
            .type(value);
    }

    enterLastName(value) {
        cy.get('input[name="lastName"]')
            .should('be.visible')
            .clear()
            .type(value);
    }

    enterEmail(value) {
        cy.contains('.oxd-input-group', 'Email')
            .find('input')
            .clear()
            .type(value);
    }

    enterContactNumber(value) {
        cy.contains('.oxd-input-group', 'Contact Number')
            .find('input')
            .clear()
            .type(value);
    }

    selectVacancy() {
        cy.contains('.oxd-input-group', 'Vacancy')
            .find(this.loc.selectText)
            .click();

        cy.get(this.loc.selectDropdown)
            .should('be.visible')
            .find(this.loc.selectOption)
            .eq(1)
            .click();
    }

    clickSave() {
        cy.contains('button', 'Save').click();
    }

    // =========================
    // ASSERTION
    // =========================

    verifyCandidatesPage() {
        cy.contains('h6', RECRUITMENT_DATA.text.pageTitle)
            .should('be.visible');
    }

    verifyCandidateTable() {
        cy.get(this.loc.tableRow)
            .should('have.length.greaterThan', 0);
    }

    verifySearchResults(expectedCount) {
        if (expectedCount !== undefined) {
            if (expectedCount > 0) {
                cy.get(this.loc.tableRow)
                    .should('have.length', expectedCount);
            } else {
                cy.get(this.loc.tableRow)
                    .should('not.exist');
            }
        } else {
            cy.get(this.loc.tableRow)
                .should('have.length.greaterThan', 0);
        }
    }

    verifyNoSearchResults() {
        cy.get(this.loc.tableRow).should('not.exist');
    }

    verifyFiltersReset() {
        cy.get(this.loc.candidateName)
            .should('have.value', '');

        cy.get(this.loc.selectText)
            .each(($el) => {
                expect($el.text()).to.match(/Select|-- Select --/);
            });
    }

    verifyAddCandidateForm() {
        cy.contains('h6', RECRUITMENT_DATA.text.addCandidateTitle)
            .should('be.visible');

        cy.get('input[name="firstName"]').should('be.visible');
        cy.get('input[name="lastName"]').should('be.visible');

        cy.contains('button', 'Save').should('be.visible');
    }

    verifyRequiredField() {
        cy.get(this.loc.errorMessage)
            .should('contain.text', RECRUITMENT_DATA.text.required);
    }
}

export default new RecruitmentPage();