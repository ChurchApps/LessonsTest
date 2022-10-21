import * as faker from "faker";

describe("Programs screen", () => {
    beforeEach(() => {
        cy.clearLocalStorageSnapshot();
        cy.visit({
            url: `/ark`,
            failOnStatusCode: false
        });
    });

    it("validate expected main programs page texts", () => {
        cy.get('div.pageSection').within(() => {
            PROGRAMS_MAIN_TEXT.forEach( text => { cy.contains(text) });
        });
        cy.get('#footer').within(() => {
            FOOTER.forEach( text => { cy.contains(text) });
        });
    });

    it("play Ark Kids Main Intro video", () => {
        cy.get('iframe').then(iframe => {
            cy.wrap(iframe)
                .its('0.contentDocument.body')
                .should('not.be.undefined')
                .as('iframeBody');
            cy.get('@iframeBody')
                .find('video')
                .should('have.prop', 'paused', true)
                .click({force: true});
            cy.get('@iframeBody')
                .find('video')
                .should('have.prop', 'paused', false)
                .click({force: true});
        });
    });

    it("check Don't Fear flip card", () => {
        cy.findByAltText(/Don’t Fear/)
            .scrollIntoView()
            .trigger('mouseover');
        cy.findByAltText(/Don’t Fear/)
            .parent('div.flippy-front')
            .parent('div.flippy-cardContainer')
            .children()
            .then(() => {
                FLIP_MAIN_TEXT.forEach( text => { cy.contains(text) });
            });
        
    });

    it("click Don't Fear flip card", () => {
        cy.findByAltText(/Don’t Fear/)
            .scrollIntoView()
            .click();
        cy.url().should('include', '/ark/dontfear')
    })
});

const PROGRAMS_MAIN_TEXT = [
    'The Ark',
    ': ',
    'Ark Kids Elementary',
    'An ongoing curriculum for elementary',
    'Join Herman, Rusty, and their friends on an adventure of science and faith. Their hijinks will leave your kids (and volunteers) laughing as they deepen their understanding of God’s Word. Included are lessons for both large groups and small groups. Each week you will receive videos, graphics, coloring sheets, and more. The elementary lessons will correspond with the junior curriculum so that everyone in your children’s ministry will be on the same page.',
    'Studies',
    'Great Joy (Christmas Series)',
    'Guard Your Heart',
    'Thanks & Giving',
    'Don’t Fear',
    'Go (Missions Series)',
    'Tools For School',
    'Yes To Jesus',
    'God\'s Love Is',
    'I’m Part of God\'s Big Plan',
    'Power Up (Easter Series)',
    'Back To School Bash',
    'All Aboard',
    'Super Bowl Sunday',
    'Peace'
]

const FLIP_MAIN_TEXT = [
    'Fear is a powerful force and something we all deal with, kids and grown-ups alike. However, it’s vital that kids realize that there is something and Someone greater than fear! While our feelings are real, they don’t have to be in charge. That’s what this series, “Don’t Fear,” is all about. From the book of Revelation (don’t let that freak you out!), we help kids form a biblical picture of how awesome, just, holy, and powerful Jesus is. A. W. Tozer said the most important thing about us is our thoughts of God. When we have an accurate view of who Jesus is, we don’t have to fear!'
]

const FOOTER = [
    'Phone:',
    '918-994-2638',
    'support@churchapps.org',
    '2022',
    '© Live Church Solutions. All rights reserved.'
]