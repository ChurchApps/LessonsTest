import { waitFor } from "@testing-library/dom";

describe("Lessons screen", () => {
    beforeEach(() => {
        cy.clearLocalStorageSnapshot();
        cy.visit({
            url: `/ark/dontfear/jesusisstrong`,
            failOnStatusCode: false,
        });
    });

    it("validate expected lessons page main texts", () => {
        cy.get('div.pageSection').within(() => {
            LESSONS_MAIN_TEXT.forEach( text => { cy.contains(text) });
        });
        cy.get('#footer').within(() => {
            FOOTER.forEach( text => { cy.contains(text) });
        });
    });

    it("play The Adventures of Herman and Rusty - Don't Fear Week 1 video", () => {
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

    it("check Large Group buttons", () => {
        cy.findAllByRole("button", { name: /print/i }) // did not execute clicking as this opens a new popup window that Cypress is having troubles interacting ewith
            .eq(0)
            .scrollIntoView();
        cy.findAllByRole("button", { name: /downloads/i })
            .eq(0)
            .click()
            
        cy.log("__**verify Large Group downloads dialog content**__")
        cy.findAllByRole("menu", { name: /Downloads/i }).eq(0).within(() => {
            LARGE_GROUP_DL_CONTENT.forEach( text => { cy.contains(text) });
        });
        cy.findAllByRole("menu", { name: /Downloads/i })
            .eq(0)
            .find('a')
            .each(($btn, index) => {
                if (index >= 0) 
                cy.wrap($btn)
                    .should('have.attr', 'href').and('include', `${LARGE_GROUP_DL_FILES[index]}`)
            });
        cy.reload()
    });

    it("check Midweek / Classroom buttons", () => {
        cy.findAllByRole("button", { name: /print/i }) // did not execute clicking as this opens a new popup window that Cypress is having troubles interacting ewith
            .eq(1)
            .scrollIntoView();
        cy.findAllByRole("button", { name: /downloads/i })
            .eq(1)
            .click()
            
        cy.log("__**verify Midweek / Classroom downloads dialog content**__")
        cy.findAllByRole("menu", { name: /DownloadS/i }).eq(0).within(() => {
            MIDWEEK_DL_CONTENT.forEach( text => { cy.contains(text) });
        });
        cy.findAllByRole("menu", { name: /Downloads/i })
            .eq(0)
            .find('a')
            .each(($btn, index) => {
                if (index >= 0) 
                cy.wrap($btn)
                    .should('have.attr', 'href').and('include', `${MIDWEEK_DL_FILES[index]}`)
            });
        cy.reload()
    });

    it("check Accordion Headers", () => {
        cy.get('div.accordion').eq(0).within(() => {
            LARGE_GROUP_ACCORDION_HEADERS.forEach( text => { cy.contains(text) });
        });
        cy.get('div.accordion').eq(1).within(() => {
            MIDWEEK_ACCORDION_HEADERS.forEach( text => { cy.contains(text) });
        });
    })

    it("check Large Group Accordion Content", () => { 
        // #1
        cy.log(`__${LARGE_GROUP_ACCORDION_HEADERS[0]} content__`);
        cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[0]}`, 0, 'true');
        cy.get('div[aria-expanded="true"]')
            .siblings()
            .within(() => {
                LG_1_CONTENT.forEach( text => { cy.contains(text) });
                cy.contains('H&R 5 Min Countdown with Rules')
                    .should('have.attr', 'href').and('include', 'H&R 5 Min Countdown with Rules.mp4')
            });
        cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[0]}`, 0, 'false');

        // #2
        cy.log(`__${LARGE_GROUP_ACCORDION_HEADERS[1]} content__`);
        cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[1]}`, 0, 'true');
        cy.get('div[aria-expanded="true"]')
            .siblings()
            .within(() => {
                LG_2_CONTENT.forEach( text => { cy.contains(text) });
                cy.contains('Herman and Rusty Title')
                    .should('have.attr', 'href').and('include', 'herman-and-rusty-title.mp4');
            });

        // check image links
        cy.get('div[aria-expanded="true"]')
            .siblings()
            .find('img')
            .eq(1)
            .click()
            cy.get('h2#mui-1')
                .contains('Preview Video').should('be.visible');
            cy.findAllByRole("button", { name: /Close/i })
                .click();
        cy.get('div[aria-expanded="true"]')
            .siblings()
            .find('img')
            .eq(2)
            .click()
            cy.get('h2#mui-2')
                .contains('Preview Video').should('be.visible');
            cy.findAllByRole("button", { name: /Close/i })
                .click();

        // check text links
        cy.contains('Impact Sound Effect')
            .click();
            cy.get('h2#mui-3')
                .contains('Preview Video').should('be.visible');
            cy.findAllByRole("button", { name: /Close/i })
                .click();
        cy.contains('Herman and Rusty Part 1')
            .click();
            cy.get('h2#mui-4')
                .contains('Preview Video').should('be.visible');
            cy.findAllByRole("button", { name: /Close/i })
                .click();
        cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[1]}`, 0, 'false');

        // #3
        cy.log(`__${LARGE_GROUP_ACCORDION_HEADERS[2]} content__`);
        cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[2]}`, 0, 'true');
        cy.get('div[aria-expanded="true"]')
            .siblings()
            .within(() => {
                LG_3_CONTENT.forEach( text => { cy.contains(text) });
            });
        cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[2]}`, 0, 'false');

        // #4
        cy.log(`__${LARGE_GROUP_ACCORDION_HEADERS[3]} content__`);
        cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[3]}`, 0, 'true');
        cy.get('div[aria-expanded="true"]')
            .siblings()
            .within(() => {
                LG_4_CONTENT.forEach( text => { cy.contains(text) });
                cy.contains('Herman and Rusty Title')
                    .should('have.attr', 'href').and('include', 'herman-and-rusty-title.mp4');
                cy.contains('Big Point Slide')
                    .should('have.attr', 'href').and('include', 'big-point-slide.jpg');
            });

        // check image links
        cy.get('div[aria-expanded="true"]')
            .siblings()
            .find('img')
            .eq(2)
            .click()
            cy.get('h2#mui-5')
                .contains('Preview Video').should('be.visible');
            cy.findAllByRole("button", { name: /Close/i })
                .click();

        // check text links
        cy.contains('Herman and Rusty Part 2')
            .click();
            cy.get('h2#mui-6')
                .contains('Preview Video').should('be.visible');
            cy.findAllByRole("button", { name: /Close/i })
                .click();
        cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[3]}`, 0, 'false');

        // #5
        cy.log(`__${LARGE_GROUP_ACCORDION_HEADERS[4]} content__`);
        cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[4]}`, 0, 'true');
        cy.get('div[aria-expanded="true"]')
            .siblings()
            .within(() => {
                LG_5_CONTENT.forEach( text => { cy.contains(text) });
                cy.contains('Herman and Rusty Title')
                    .should('have.attr', 'href').and('include', 'herman-and-rusty-title.mp4');
                cy.contains('Big Point Slide')
                    .should('have.attr', 'href').and('include', 'big-point-slide.jpg');
                cy.contains('Big Verse Slide')
                    .scrollIntoView()
                    .should('have.attr', 'href').and('include', 'big-verse-slide.jpg');
                cy.contains('Big Point Slide')
                    .should('have.attr', 'href').and('include', 'big-point-slide.jpg');
            });
        cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[4]}`, 0, 'false');

        // #6
        // cy.log(`__${LARGE_GROUP_ACCORDION_HEADERS[5]} content__`);
        // cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[5]}`, 1, 'true');
        // cy.get('div[aria-expanded="true"]')
        //     .siblings()
        //     .within(() => {
        //         LG_6_CONTENT.forEach( text => { cy.contains(text) });
        //     });
        // cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[5]}`, 0, 'false');

        // #7
        cy.log(`__${LARGE_GROUP_ACCORDION_HEADERS[6]} content__`);
        cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[6]}`, 0, 'true');
        cy.get('div[aria-expanded="true"]')
            .siblings()
            .within(() => {
                LG_7_CONTENT.forEach( text => { cy.contains(text) });
            });

        // check image links
        cy.get('div[aria-expanded="true"]')
            .siblings()
            .find('img')
            .eq(0)
            .click()
            cy.get('h2#mui-7')
                .contains('Preview Video').should('be.visible');
            cy.findAllByRole("button", { name: /Close/i })
                .click();

        cy.get('div[aria-expanded="true"]')
            .siblings()
            .find('img')
            .eq(1)
            .click()
        cy.get('h2#mui-8')
            .contains('Preview Video').should('be.visible');
        cy.findAllByRole("button", { name: /Close/i })
            .click();

        // check text links
        cy.contains('Big Story Video')
            .click();
            cy.get('h2#mui-9')
                .contains('Preview Video').should('be.visible');
            cy.findAllByRole("button", { name: /Close/i })
                .click();

        cy.contains('Herman and Rusty Part 3')
            .click();
        cy.get('h2#mui-10')
            .contains('Preview Video').should('be.visible');
        cy.findAllByRole("button", { name: /Close/i })
            .click();
        cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[6]}`, 0, 'false');

        // #8
        // cy.log(`__${LARGE_GROUP_ACCORDION_HEADERS[7]} content__`);
        // cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[7]}`, 2, 'true');
        // cy.get('div[aria-expanded="true"]')
        //     .siblings()
        //     .within(() => {
        //         LG_8_CONTENT.forEach( text => { cy.contains(text) });
        //     });
        // cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[7]}`, 2, 'false');

        // #9
        cy.log(`__${LARGE_GROUP_ACCORDION_HEADERS[8]} content__`);
        cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[8]}`, 0, 'true');
        cy.get('div[aria-expanded="true"]')
            .siblings()
            .within(() => {
                LG_9_CONTENT.forEach( text => { cy.contains(text) });
                cy.contains('Herman and Rusty Title')
                    .should('have.attr', 'href').and('include', 'herman-and-rusty-title.mp4');
                cy.contains('Big Point Slide')
                    .should('have.attr', 'href').and('include', 'big-point-slide.jpg');
                cy.contains('Engage Slides')
                    .should('have.attr', 'href').and('include', 'engage slide.zip');
                cy.contains('Big Point Slide')
                    .should('have.attr', 'href').and('include', 'big-point-slide.jpg');
            });
        cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[8]}`, 0, 'false');

        // #10
        cy.log(`__${LARGE_GROUP_ACCORDION_HEADERS[9]} content__`);
        cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[9]}`, 0, 'true');
        cy.get('div[aria-expanded="true"]')
            .siblings()
            .within(() => {
                LG_10_CONTENT.forEach( text => { cy.contains(text) });
            });
        cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[9]}`, 0, 'false');

        // #11
        cy.log(`__${LARGE_GROUP_ACCORDION_HEADERS[10]} content__`);
        cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[10]}`, 0, 'true');
        cy.get('div[aria-expanded="true"]')
            .siblings()
            .within(() => {
                LG_11_CONTENT.forEach( text => { cy.contains(text) });
                cy.contains('H&R BIG REVIEW Bumper')
                    .should('have.attr', 'href').and('include', 'hr-big-review-bumper.mp4');
                cy.contains('Big Review Slides')
                    .should('have.attr', 'href').and('include', 'big review.zip');
            });
        cy.expandOrCollapseAccordion(0, `${LARGE_GROUP_ACCORDION_HEADERS[10]}`, 0, 'false');
    })

    it("check expand and collapse function of Midweek headers", () => {
        cy.wrap(MIDWEEK_ACCORDION_HEADERS).each((index) => {
            cy.expandOrCollapseAccordion(1, `${index}`, 0, 'true');
            cy.expandOrCollapseAccordion(1, `${index}`, 0, 'false');
        })
    })
})

const LESSONS_MAIN_TEXT = [
    'Ark Kids Elementary',
    ':',
    'Don’t Fear',
    'Don\'t Fear Week 1',
    ':',
    //'Dont't Fear, Jesus Is Strong!',   <=== to be replaced once bug is fixed in staging env
    'A massive storm is approaching the lab, which is terrible news for Ethel because she\'s terrified of storms. Rusty\'s cousin, Skip, a local weatherman, thinks it\'s crazy to put your faith in Jesus. It\'s up to Herman to show Ethel that Jesus is Strong and that He can help her, and us, with any challenge.',
    'Large Group',
    'Midweek / Classroom',
    'About',
    'Ark Kids Elementary',
    'This content is provided free of charge by',
    'The Ark Church.'
]

const FOOTER = [
    'Phone:',
    '918-994-2638',
    'support@churchapps.org',
    '2022',
    '© Live Church Solutions. All rights reserved.'
]

const LARGE_GROUP_DL_CONTENT = [
    'Program Videos',
    'Slides and Printables',
    'Herman and Rusty Part 1',
    'Herman and Rusty Part 2',
    'Big Story Video',
    'Impact Sound Effect',
    'Herman and Rusty Part 3',
    'Don\'t want to download lessons each week?',
    'Get the Lessons.church app for AndroidTV or FireSticks',
    'and have your videos download automatically each week.'
]

// added vimeo reference to files with token auth
const LARGE_GROUP_DL_FILES = [
    'Program Videos.zip', 
    'Slides and Printables.zip', 
    'vimeo',
    'vimeo',
    'vimeo',
    'vimeo',
    'vimeo',
    '#connectSection'
]

const MIDWEEK_DL_CONTENT = [
    'Program Videos',
    'Slides and Printables',
    'Herman and Rusty Part 1',
    'Herman and Rusty Part 2',
    'Big Story Video',
    'Impact Sound Effect',
    'Herman and Rusty Part 3',
    'Don\'t want to download lessons each week?',
    'Get the Lessons.church app for AndroidTV or FireSticks',
    'and have your videos download automatically each week.'
]

// added vimeo reference to files with token auth
const MIDWEEK_DL_FILES = [
    'Program Videos.zip', 
    'Slides and Printables.zip', 
    'vimeo',
    'vimeo',
    'vimeo',
    'vimeo',
    'vimeo',
    '#connectSection'
]

const LARGE_GROUP_ACCORDION_HEADERS = [
    'Countdown / Rules',
    'Welcome',
    'Worship',
    'Engage 1',
    'Engage 2',
    'Worship',
    'Big Story',
    'Worship',
    'Engage 3',
    'Small Group',
    'Big Review'
]

const MIDWEEK_ACCORDION_HEADERS = [
    'Countdown / Rules',
    'Welcome',
    'Worship',
    'Lab Wars',
    'Engage 1',
    'Engage 2',
    'Big Story',
    'Closing',
    'Big Review'
]

const LG_1_CONTENT = [
    'Materials:',
    'Lesson Materials',
    'Lesson Plan',
    'Leader',
    'Play:',
    'H&R 5 Min Countdown with Rules'
]

const LG_2_CONTENT = [
    'Materials:',
    'Lab Coat (2',
    'Hosts',
    'Play:',
    'Herman and Rusty Title',
    'Host and Co-host enter.',
    'Host',
    'Welcome to the Lab! I can’t believe we got away with inventing a service this fun.',
    'Co-Host',
    'Yes, this is going to be your most exciting hour of the week, unless you just spent the last hour skydiving.',
    'Host',
    'How would they have skydived in the last hour and made it to church?',
    'Co-Host',
    'I don’t know, maybe the giant target I painted on the roof.',
    'Play:',
    'Impact Sound Effect',
    'Co-Host',
    'Well, I probably shouldn’t have put that there. Now the lab is going to be pelted by skydivers.',
    'Host',
    'Even if you did skydive, I think today is going to be the best hour of your week.',
    'Co-Host',
    'Unless you rode an elephant here, which would be amazing. Never mind, you’re right. This is going to be the most fun you’ve had all week…unless you really love homework.',
    'Host',
    'Forget all that. Today is going to be awesome. Let’s get things started off by checking in on Herman and Rusty, but first stand up, find a friend, and tell him or her, “What’s the best thing you’ve done this week!',
    'Play',
    'Herman and Rusty Part 1',
]

const LG_3_CONTENT = [
    'Materials:'
]

const LG_4_CONTENT = [
    'Materials:',
    ': Lab Coat (2), Button, Table, Clear Bucket, Pitcher of Water, Toilet Paper, Paper Towel, Notebook Paper, Construction Paper, Tennis Ball',
    'Hosts',
    'Play:',
    'Herman and Rusty Title',
    'Host',
    'and',
    'Co-Host',
    'enter.',
    'Co-Host',
    'Wow, Ethel is pretty upset about that tropical storm. You know what she needs? One of those thunder vests that dogs wear during storms. I don’t know who invented that, but that person is a genius.',
    'Host',
    'I think the Big Point might actually be more helpful.',
    'Co-Host',
    'Those vests are pretty snazzy, though. I wore my dog’s vest to my Senior Prom under my tuxedo.',
    'Host',
    'Let’s check out today’s Big Point. I need one of you to be a lab assistant to make this happen.',
    '(',
    'Host',
    'and',
    'Co-Host',
    'choose a kid to volunteer.)',
    'Co-Host',
    'How do you feel about wearing my dog’s thunder vest?',
    'Host',
    'What we really need your assistance with is revealing today’s Big Point. I need everyone in the lab to count down from three. When we say one, hit that button and reveal the Big Point.',
    'Co-Host',
    '3…2…1!',
    'Play:',
    'Big Point Slide',
    'Co-Host',
    'Let’s all say it together, “Don’t Fear, Jesus Is Strong!”',
    'Host',
    'Let’s do a test of strength. I have different things holding these tennis balls, like paper towels, toilet paper, notebook paper, and construction paper. If I pour water on them, which one will hold the tennis ball the longest? You’re going to hold the items.',
    'Co-Host',
    'Let’s experiment! I need the audience to count the seconds for each one, so we can measure it.',
    'Holding the item over the bucket, pour the water onto each paper and see which one lasts the longest.',
    'Host',
    'The strongest is the (Insert winner). It’s helpful to know who or what is the strongest because it shows you where it’s safe to place your trust.',
    'Co-Host',
    'Since Jesus is the strongest, it only makes sense that we put our faith in Him.',
    'Host',
    'With our faith in the strongest One out there, we can be sure we don’t have to be afraid. Let’s see how Ethel is holding up.',
    'Play:',
    'Herman and Rusty Part 2',
]

const LG_5_CONTENT = [
    'Materials:',
    'Lab Coat (2), Button, Small Box, Water Gun',
    'Hosts',
    'Play:',
    'Herman and Rusty Title',
    'Host',
    'and',
    'Co-Host',
    'enter.',
    'Host',
    'It seems like Skip is only making things worse.',
    'Co-Host',
    'Rusty seemed fine until he listened to his cousin. It’s weird that Skip only thinks of Jesus as a baby. That doesn’t even make sense.',
    'Host',
    'Yeah, he kind of got stuck at Christmas, and didn’t read anything else about Jesus after that. Sometimes kids and grownups think about Jesus in ways that don’t match what is true. But we can be sure that our Big Point is true,',
    'Play:',
    'Big Point Slide',
    'Don’t Fear, Jesus Is Strong!',
    'I need another assistant.',
    '(',
    'Host',
    'and',
    'Co-Host',
    'choose a kid to volunteer.)',
    'Host',
    'I need you to get inside this box.',
    'Show them the small box.',
    'Co-Host',
    'That’s impossible…unless I use Rusty’s shrink ray he invented last week.',
    'Co-Host',
    'pulls out a water gun. He/She squirts the ',
    'Co-Host',
    'I accidentally grabbed his water gun.',
    'Host',
    'It didn’t work anyway. It is impossible for you to fit inside this box, right? Sometimes we think of God as really small and weak. It’s like we put Him in a tiny box. But is that accurate? Check out this verse. I need you to hit the button as we count down from three.',
    'Play:',
    'Big Verse Slide',
    'Co-Host',
    'Revelation 1:8 (NIrV), “I am the Mighty One.”',
    'Host',
    '“Mighty” means strong, like really strong. I need my assistant to go out and ask one person this question, “How is it helpful to think of Jesus as strong?”',
    'Kid interviews a friend from the audience.',
    'Co-Host',
    'I agree. If you think of Jesus as weak, then it’s hard to believe that He can help you live your best life.',
    'Host',
    'That can amp up the fear. We don’t want that. Remember,',
    'Play:',
    'Big Point Slide',
    'Don’t Fear, Jesus Is Strong!',
    'Let’s jump to our feet and worship our strong God!',
]

const LG_6_CONTENT = [
    'Materials:'
]

const LG_7_CONTENT = [
    'Materials:',
    'Leader',
    'Play:',
    'Big Story Video',
    'Play:',
    'Slides - Big Point Slide',
    'Today I want you to think of your biggest, baddest fears - you know, the things that keep you wide awake at night or tug at you throughout the day. I want you to imagine yourself giving them to Jesus. Go ahead. Picture yourself holding that fear and placing it in Jesus’ hands. Now let go. That’s right; don’t take it back. It’s His to deal with now. Jesus wants us to give our fears to Him. He can handle them. That frees us up to live a joyful life. Take a moment to quietly thank Jesus for taking away your fear, for being with you, and giving you forever to look forward to. (Pause) Now I’ll pray. (Pray)',
    'Play:',
    'Herman and Rusty Part 3',
]

const LG_8_CONTENT = [
    'Materials:'
]

const LG_9_CONTENT = [
    'Materials:',
    'Labcoat (2), Button, Umbrella, Water',
    'Hosts',
    'Play:',
    'Herman and Rusty Title',
    'Host',
    'and',
    'Co-Host',
    'enter.',
    'Co-Host',
    'Whew! That was a close one. I’m glad the lab is safe.',
    '(',
    'Co-Host',
    'shakes off the umbrella, splashing water on the ',
    'Host',
    '.)',
    'Host',
    'More importantly, Ethel and Rusty learned our Big Point.',
    'Play:',
    'Big Point Slide',
    'Host',
    'Don’t Fear, Jesus Is Strong',
    'That picture of Jesus that John wrote about in the Book of Revelation was really helpful to the Christians back then because it reminded them that they serve a strong God.',
    'Co-Host',
    'Was that only written for people a long time ago, or can it help us, too?',
    'Host',
    'Trust me, the Bible is just as important for us now as it was for them. Let’s think about it some situations that might arise. We’re going to need some more volunteers.',
    '(Bring up volunteers to talk about how Jesus could help them in the following situations.)',
    'Play:',
    'Engage Slides',
    'A school bully threatens to text lies about you to your friends.',
    'Play:',
    'Engage Slides',
    'You find out someone in your family has cancer.',
    'Play:',
    'Engage Slides',
    'You keep having terrible nightmares.',
    'Host',
    'No matter what situation you face, you can be sure that Jesus is with you and that He is powerful enough to help you. Don’t forget,',
    'Play:',
    'Big Point Slide',
    'Host',
    'Don’t Fear, Jesus Is Strong!',
    'Let’s gather with our small groups and talk about this.',
]

const LG_10_CONTENT = [
    'Materials:',
    'Small Group Leader',
    'Play:',
    'Slides - Small Group Slide',
    'Gather the kids into small groups and discuss the following.',
    'Have you ever been scared during a storm like Ethel, or some other time? What happened?',
    'Which part of the description of Jesus in the Big Story helps you remember that Jesus is strong: His robe, His white hair, His fiery eyes, His bronze feet, His voice that booms, or His face giving light? Why?',
    'How does remembering that Jesus is strong help get rid of fear?',
    'What did Herman tell us to do in the Big Do?',
]

const LG_11_CONTENT = [
    'Materials:',
    'Leader',
    'Play:',
    'H&R BIG REVIEW Bumper',
    '** Choose two kids from the audience to come on stage and answer the question.**',
    'Play:',
    'Big Review Slides',
    'Our Big Point says Don’t Fear, Jesus Is _______! a.',
    'Skip thought Jesus was still a ________.',
    'Baby',
    'Name one way that John described Jesus in our Big Story. ',
    'Why was Ethel scared\?',
    'A giant storm',
    'How could knowing Jesus is strong help you when you’re afraid?',
    'Our Big Verse, Revelation 1:8 (NIrV) says, “I am the ______ One.',
    'If Jesus is stronger than anyone else in the universe, why do you think people are still afraid?',
    'What did Jesus tell John when John dropped to the ground\?',
    'Do not be afraid',
    'What does Jesus want you do with your fears?',
    'Give them to Him',
    'What challenge did Herman give us as this week’s Big Do?',
    'Put your fears in a jar and pray the Big Verse'
]