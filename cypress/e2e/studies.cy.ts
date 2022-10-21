import * as faker from "faker";

describe("Studies screen", () => {
    beforeEach(() => {
        cy.clearLocalStorageSnapshot();
        cy.visit({
            url: `/ark/dontfear`,
            failOnStatusCode: false
        });
    });

    it("validate expected study page texts", () => {
        cy.get('div.pageSection').within(() => {
            STUDIES_MAIN_TEXT.forEach( text => { cy.contains(text) });
            LESSONS_LIST.forEach( text => { cy.contains(text) });
        });
        cy.get('#footer').within(() => {
            FOOTER.forEach( text => { cy.contains(text) });
        });
    });

    it("play Ark Kids Don't Fear Series Intro video", () => {
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

    it("open sample lesson - Don't Fear, Jesus Is Strong", () => {
        cy.findByAltText(/Don't Fear Week 1/)
            .scrollIntoView()
            .click();
        cy.url().should('include', '/ark/dontfear/jesusisstrong')
    })
})

const STUDIES_MAIN_TEXT = [
    'Ark Kids Elementary',
    ':',
    'Don’t Fear',
    'Fear is a powerful force and something we all deal with, kids and grown-ups alike. However, it’s vital that kids realize that there is something and Someone greater than fear! While our feelings are real, they don’t have to be in charge. That’s what this series, “Don’t Fear,” is all about. From the book of Revelation (don’t let that freak you out!), we help kids form a biblical picture of how awesome, just, holy, and powerful Jesus is. A. W. Tozer said the most important thing about us is our thoughts of God. When we have an accurate view of who Jesus is, we don’t have to fear!',
]

const LESSONS_LIST = [
    'Lessons',
    'Don\'t Fear Week 1',
    //'Dont\'t Fear, Jesus Is Strong!', --> will add once spelling is fixed (filed on GitHub)
    'A massive storm is approaching the lab, which is terrible news for Ethel because she\'s terrified of storms. Rusty\'s cousin, Skip, a local weatherman, thinks it\'s crazy to put your faith in Jesus. It\'s up to Herman to show Ethel that Jesus is Strong and that He can help her, and us, with any challenge.',
    'Don\'t Fear Week 2',
    'Don\'t Fear, Jesus Wins!',
    'While watching a Marvel movie marathon, Rusty stops at the exact point where the bad guy wins. He decides to form a superhero team, The Scottish Sentinels, to defend the neighborhood. Do the bad guys win? If you hear the whole story, you\'ll find out that Jesus wins. We can trust Him to protect us.',
    'Don\'t Fear Week 3',
    'Don\'t Fear, Jesus Is Just!',
    'Herman\'s neighbor, Hans Von Striker, has struck again. This time Rusty\'s prize flowerbed was his target. Will Rusty seek revenge or trust God for justice? Hopefully, Herman can point his friend in the right direction. (Note: This lesson presents God’s gift of salvation. Every church presents the Gospel with slight variations and nuances. Read through the steps before teaching. Present the Gospel in a way that is consistent with the scripture and God’s leading.)',
    'Don\'t Fear Week 4',
    'Don\'t Fear, Jesus Lives Forever!',
    'When Ethel\'s goldfish suddenly dies, the lab\'s mood sinks. Thankfully, Herman has some good news from the Bible that reminds us of the great future we look forward to with Jesus. (Note: This lesson\'s midweek component presents God’s gift of salvation. Every church presents the Gospel with slight variations and nuances. Read through the steps before teaching. Present the Gospel in a way that is consistent with the scripture and God’s leading.)'
]

const FOOTER = [
    'Phone:',
    '918-994-2638',
    'support@churchapps.org',
    '2022',
    '© Live Church Solutions. All rights reserved.'
]