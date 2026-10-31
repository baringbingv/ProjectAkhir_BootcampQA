export const RECRUITMENT_URL = {
    candidates: 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates',
    addCandidate: 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate',
};

export const RECRUITMENT_DATA = {
    validName: 'Peter',
    partialName: 'Pet',
    invalidName: 'vincib',

    // Digunakan untuk membuat email unik saat test dijalankan
    candidate: {
        firstName: 'Vinci',
        lastName: 'AutomationTest',
        emailPrefix: 'vinci.qa',
        contactNumber: '081234567890',
        keywords: 'Cypress Automation QA',
    },

    text: {
        pageTitle: 'Candidates',
        addCandidateTitle: 'Add Candidate',
        required: 'Required',
        noRecords: 'No Records Found',
    },
};