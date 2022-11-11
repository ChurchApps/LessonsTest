
declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to expand or collapse accordion using its header in lessons page
         * @example cy.expandAccordion(0, 'Countdown / Rules', 0, 'true')
         */
        expandOrCollapseAccordion(accordionIndex: number, accordionHeader: string, headerIndex: number,  bool: string): Chainable<Element>;
    }
}

Cypress.Commands.add("expandOrCollapseAccordion", (accordionIndex, accordionHeader, headerIndex, bool) => {
    cy.get("div.accordion")
        .eq(accordionIndex)
        .contains(accordionHeader)
        .eq(headerIndex)
        .scrollIntoView()
        .parent()
        .invoke('attr','aria-expanded') // this attr indicates checked state
        .then(($isAccordionExpanded) => {
            if($isAccordionExpanded == bool) { 
                if (bool == 'true') {
                    cy.log(`${accordionHeader} accordion is already expanded!`)
                } else if (bool == 'false') {
                    cy.log(`${accordionHeader} accordion is already collapsed!`)
                }
                return;
            } else {
                if (bool == 'true') {
                    cy.get("div.accordion")
                        .eq(accordionIndex)
                        .contains(accordionHeader)
                        .eq(headerIndex)
                        .click({force: true});
                    cy.log(`expanded ${accordionHeader} accordion`)
                } else if (bool == 'false') {
                    cy.get("div.accordion")
                        .eq(accordionIndex)
                        .contains(accordionHeader)
                        .eq(headerIndex)
                        .click({force: true});
                    cy.log(`collapsed ${accordionHeader} accordion`)
                }
            }
        })
});

