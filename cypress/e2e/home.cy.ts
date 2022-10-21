import * as faker from "faker";

describe("Home screen", () => {
    beforeEach(() => {
        cy.clearLocalStorageSnapshot();
        cy.visit({
            url: `/`,
            failOnStatusCode: false
        });
    });

    it("validate expected home page texts", () => {
        cy.get('#hero').within(() => {
            HEADER_SECTION.forEach( text => { cy.contains(text) });
        });
        cy.get('#statsSection').within(() => {
            STATS_SECTION.forEach( text => { cy.contains(text) });
        });
        cy.get('div.homeSection').eq(1).within(() => {
            PROGRAMS_SECTION.forEach( text => { cy.contains(text) });
        });
        cy.get('#connectSection').within(() => {
            CONNECT_SECTION.forEach( text => { cy.contains(text) });
        });
        cy.get('div.homeSection').eq(3).within(() => {
            WHO_WE_ARE_SECTION.forEach( text => { cy.contains(text) });
        });
        cy.get('#footer').within(() => {
            FOOTER.forEach( text => { cy.contains(text) });
        });
    });

    it("play Lessons.church introductory video", () => {
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

    it("play Lessons.church setup guide video", () => {
        cy.findByText(/using in your classroom/i).scrollIntoView();
        cy.get('iframe').then(iframe => {
            cy.wrap(iframe)
                .its('1.contentDocument.body')
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

    it("program section - check program links", () => {
        cy.findByText(/available programs/i).scrollIntoView();
        cy.findByText(/The Ark Kids - Elementary/i).click();
        cy.url().should('include', 'ark');
        cy.go('back');
        cy.findByText(/second program/i).click(); // to replace once placeholder is updated
        cy.url().should('include', 'second');
        cy.go('back');
    });

    it("connect section - check 'our guide' link", () => {
        cy.findByText(/using in your classroom/i).scrollIntoView();
        cy.findByRole("link", { name: /our guide/i })
            .should('have.attr', 'href', 'https://support.churchapps.org/lessons/setup.html'); // did not click as this opens a new tab
    });

    it("connect section - validate options when downloading B1.church mobile app", () => {
        cy.findByText(/using in your classroom/i).scrollIntoView();
        cy.findByText(/Get B1.church App for Volunteers/i).click();
        cy.findByRole("menuitem", { name: /android/i }).should('exist'); // did not click as this opens a new tab
        cy.findByRole("menuitem", { name: /apple/i }).should('exist'); // did not click as this opens a new tab
    });

    it("connect section - check download of Lessons.church app for TVs in connect section", () => {
        cy.findByText(/using in your classroom/i).scrollIntoView();
        cy.findByText(/Get Lessons.church App for TVs/i)
            .should('have.attr', 'href', 'https://www.amazon.com/dp/B09T38BNQG/'); // did not click as this opens a new tab
    });

    it("connect section - check registration of church and scheduling lessons", () => {
        cy.findByText(/using in your classroom/i).scrollIntoView();
        cy.findByText(/Register Your Church and Schedule Lessons/i).click();
        cy.url().should('include', 'login');
        cy.go('back');
    });

    it("who we are section - check 'live church solutions' link", () => {
        cy.findByText(/About Lessons.church/i).scrollIntoView();
        cy.findByRole("link", { name: /Live Church Solutions/i }).click();
        cy.url().should('include', 'livecs.org');
        cy.go('back');
    });

    it("who we are section - check learn more button", () => {
        cy.findByText(/About Lessons.church/i).scrollIntoView();
        cy.findByRole("link", { name: /learn more/i }).click();
        cy.url().should('include', 'livecs.org');
        cy.go('back');
    });

    it("check get support details", () => {
        cy.findByText(/contact_support/i).click();
        cy.get('div.MuiDialogContent-root').within(() => {
            GET_SUPPORT.forEach( text => { cy.contains(text) });
        });
        cy.findByRole("button", { name: /close/i }).click();
    });

});

const HEADER_SECTION = [
    'Completely',
    'Free Curriculum',
    'for Churches',
    'We believe that limited church budgets should never stand in the way of teaching both children and adults the word of God in the most effective way possible. By partnering with generous creators willing to donate their work for other churches to use we are able to provide this content for your church completely free of charge.'
]

const STATS_SECTION = [
    '8',
    'providers',
    '94',
    'studies',
    '541',
    'lessons'
]

const PROGRAMS_SECTION = [
    'Browse',
    'Available Programs',
    'The Ark Church',
    'The Ark Kids - Elementary',
    'Ongoing studies for 3rd-5th graders',
    'Second Program',
    'The Ark',
    'Ark Kids Elementary',
    'An ongoing curriculum for elementary',
    'Join Herman, Rusty, and their friends on an adventure of science and faith. Their hijinks will leave your kids (and volunteers) laughing as they deepen their understanding of God’s Word. Included are lessons for both large groups and small groups. Each week you will receive videos, graphics, coloring sheets, and more. The elementary lessons will correspond with the junior curriculum so that everyone in your children’s ministry will be on the same page.',
    'Ark Kids Junior',
    'An ongoing curriculum for Early Childhood',
    'Join Conductor Carl and his friends as they lead your kids on an adventure through God’s word. These imaginative and engaging lessons will have your early childhood kids and volunteers loving every minute of their time at the Train Station. Included are lessons for Kindergarten-3s, 2-year-olds and a story for babies and toddlers. Lessons include videos, graphics, coloring sheets, and both large and small group lessons. The junior lessons tie directly with the corresponding elementary lesson.',
    'For Ministry Resources',
    'For Ministry Resources Youth Series',
    'Free youth ministry curriculum free sermon series, small groups, and devotionals for your youth group',
    'Free youth ministry curriculum. A year\'s worth of free sermon series, and small groups for your youth group.',
    'Ozark Christian College',
    'NextLevel Online',
    'Free courses from Ozark Christian College',
    'Free video resources for you and your church. Designed for use in these environments: Adult Studies, Student Ministry, Leadership Training, Personal Growth.',
    'The vision of Ozark Christian College is to glorify God by evangelizing the lost and edifying Christians worldwide. The mission of Ozark Christian College is to train men and women for Christian service as a degree-granting institution of biblical higher education.',
    'MyStory.church',
    'My Story',
    'Testimony based adult Bible studies.',
    'We want to help others follow Jesus by meeting in small groups in homes with a heavy focus on what it looks like to actually live out the instructions God has given us in our current world. If you are trying to find out more about Jesus or if you know him but are having trouble following him or if you just like to learn how others are following him you are in the right place.',
    'High Voltage Kids',
    'High Voltage Elementary',
    'An ongoing curriculum for elementary',
    'Builds strong biblical kids by teaching deep Christian topics in a relevant and palatable way. Empowers volunteers by enabling leaders to teach and relate as opposed to constant discipline and redirection. Saves your budget by being freely available. High Voltage Kids has been creating Elementary Curriculum for nearly 20 years. It is created by Kids Pastors who are weekly involved in the local church, so you know it is highly effective and relevant. To purchase their latest curriculum, please visit',
    'www.highvoltagekids.com'
]

const CONNECT_SECTION = [
    'Our Apps',
    'Using in Your Classroom',
    'Great curriculum can make your teaching far more effective, but only if you can reliably deliver it each week. See the video to learn how you can easily present your lessons from a Fire stick each week, even if the Internet goes down.',
    'In addition your volunteers can use the B1.church app to see the leaders notes each week. There is nothing to print.',
    'View',
    'on setting up schedules to configure your church.'
]

const WHO_WE_ARE_SECTION = [
    'Who we are',
    'About Lessons.church',
    'Lessons.church is a completely free service provided to Christian churches and ministries.',
    'Every year the Church as a whole spends',
    'millions of dollars',
    'purchasing curriculum for classrooms. We believe by the body working together to create and distribute freely available curriculum, that money can be freed up for use in other areas. Likewise, we do not believe that budget restrictions should prevent teachers from doing the best job they possibly can. That is why we developed Lessons.church; a completely free, open-source platform for finding and managing curriculum.',
    'Lessons.church is built and provided free of charge by',
    'a 501(c)(3) that was founded in 2012 with the goal of helping small churches with their technical needs.'
]

const FOOTER = [
    'Phone:',
    '918-994-2638',
    'support@churchapps.org',
    '2022',
    '© Live Church Solutions. All rights reserved.'
]

const GET_SUPPORT = [
    'Email:',
    'support@livecs.org',
    'Phone:',
    '+1 (918) 994-2638',
    'Messenger:',
    'https://m.me/livecsolutions',
    'Knowledge Base',
    'https://support.churchapps.org'
]
