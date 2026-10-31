import LoginPage from '../pages/LoginPage';
import RecruitmentPage from '../pages/RecruitmentPage';

import { LOGIN_DATA } from '../data/loginData';
import { RECRUITMENT_DATA } from '../data/recruitmentData';


describe('Recruitment OrangeHRM - Page Object Model', () => {

    // LOGIN SEBELUM SETIAP TEST
    beforeEach(() => {
        LoginPage.visit();

        const data = LOGIN_DATA.valid;
        LoginPage.login(data.username, data.password);

        LoginPage.verifyDashboard();
    });


    // TC-RC-001 - Membuka halaman Recruitment
    it('TC-RC-001 - Membuka halaman Recruitment', () => {

        RecruitmentPage.openRecruitment();

        cy.contains('a, span', 'Candidates')
            .should('be.visible');

        cy.contains('a, span', 'Vacancies')
            .should('be.visible');
    });

    // TC-RC-002 - Mencari kandidat berdasarkan nama valid
    it('TC-RC-002 - Mencari kandidat berdasarkan nama valid', () => {

        RecruitmentPage.visitCandidates();

        RecruitmentPage.enterCandidateName(
            RECRUITMENT_DATA.validName
        );

        RecruitmentPage.selectFirstCandidateSuggestion();

        RecruitmentPage.interceptCandidates('searchValidCandidate');

        RecruitmentPage.clickSearch();

        cy.wait('@searchValidCandidate').then(({ response }) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body.data).to.be.an('array');
            expect(response.body.data.length).to.be.greaterThan(0);
        });
    });


    // TC-RC-003 - Mencari kandidat yang tidak terdaftar
    it('TC-RC-003 - Mencari kandidat yang tidak terdaftar', () => {

        RecruitmentPage.visitCandidates();

        RecruitmentPage.enterCandidateName(
            RECRUITMENT_DATA.invalidName
        );

        RecruitmentPage.interceptCandidates('searchInvalidCandidate');

        RecruitmentPage.clickSearch();

        cy.wait('@searchInvalidCandidate').then(({ response }) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body.data).to.be.an('array');
            expect(response.body.data).to.have.length(0);
        });
    });


    // TC-RC-004 - Filter berdasarkan Hiring Manager
    it('TC-RC-004 - Filter berdasarkan Hiring Manager', () => {

        RecruitmentPage.visitCandidates();

        RecruitmentPage.selectFilter('Hiring Manager');

        RecruitmentPage.interceptCandidates('filterHiringManager');

        RecruitmentPage.clickSearch();

        cy.wait('@filterHiringManager').then(({ response }) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body.data).to.be.an('array');
        });
    });


    // TC-RC-005 - Filter berdasarkan Vacancy
    it('TC-RC-005 - Filter berdasarkan Vacancy', () => {

        RecruitmentPage.visitCandidates();

        RecruitmentPage.selectFilter('Vacancy');

        RecruitmentPage.interceptCandidates('filterVacancy');

        RecruitmentPage.clickSearch();

        cy.wait('@filterVacancy').then(({ response }) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body.data).to.be.an('array');
        });
    });


    // TC-RC-006 - Filter berdasarkan Status
    it('TC-RC-006 - Filter berdasarkan Status', () => {

        RecruitmentPage.visitCandidates();

        RecruitmentPage.selectFilter('Status');

        RecruitmentPage.interceptCandidates('filterStatus');

        RecruitmentPage.clickSearch();

        cy.wait('@filterStatus').then(({ response }) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body.data).to.be.an('array');
        });
    });

    // TC-RC-007 - Membuka form Add Candidate
    it('TC-RC-007 - Membuka form Add Candidate', () => {

        RecruitmentPage.visitAddCandidate();

        RecruitmentPage.verifyAddCandidateForm();
    });


    // TC-RC-008 - Menambahkan kandidat dengan data valid
    it('TC-RC-008 - Menambahkan kandidat dengan data valid', () => {

        RecruitmentPage.visitAddCandidate();

        const email =
            `${RECRUITMENT_DATA.candidate.emailPrefix}.${Date.now()}@gmail.com`;

        RecruitmentPage.enterFirstName(
            RECRUITMENT_DATA.candidate.firstName
        );

        RecruitmentPage.enterLastName(
            RECRUITMENT_DATA.candidate.lastName
        );

        RecruitmentPage.selectVacancy();

        RecruitmentPage.enterEmail(email);

        RecruitmentPage.enterContactNumber(
            RECRUITMENT_DATA.candidate.contactNumber
        );

        RecruitmentPage.interceptAddCandidate('saveCandidate');

        RecruitmentPage.clickSave();

        cy.wait('@saveCandidate').then(({ response }) => {
            expect(response.statusCode).to.be.oneOf([200, 201]);
        });
    });


    // TC-RC-009 - Menyimpan kandidat tanpa First Name
    it('TC-RC-009 - Menyimpan kandidat tanpa First Name', () => {

        RecruitmentPage.visitAddCandidate();

        RecruitmentPage.enterLastName(
            RECRUITMENT_DATA.candidate.lastName
        );

        RecruitmentPage.enterEmail(
            `${RECRUITMENT_DATA.candidate.emailPrefix}.${Date.now()}@gmail.com`
        );

        RecruitmentPage.clickSave();

        RecruitmentPage.verifyRequiredField();
    });

});