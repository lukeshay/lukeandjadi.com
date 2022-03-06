import { Chance } from 'chance';

const chance = new Chance();

describe('RSVPs', () => {
  const rsvps = [
    {
      parent: 'Jeff & Tami Reding',
      variations: [
        'Jeff Reding',
        'Tami Reding',
        'Jeff & Tami Reding',
        'Tami & Jeff Reding',
        'Jeff and Tami Reding',
        'Tami and Jeff Reding',
      ],
    },
    {
      parent: 'Tory & Brandi Shay & Family',
      variations: [
        'Tory Shay',
        'Brandi Shay',
        'Tory & Brandi Shay',
        'Brandi & Tory Shay',
        'Tory and Brandi Shay',
        'Brandi and Tory Shay',
        'Tory & Brandi Shay & Family',
        'Brandi & Tory Shay & Family',
        'Tory and Brandi Shay and Family',
        'Brandi and Tory Shay and Family',
      ],
    },
  ];

  rsvps.forEach(({ parent, variations }) => {
    describe(parent, () => {
      [...variations, ...variations.map((v) => v.toLowerCase())].forEach((variation) => {
        it(`should return results for ${variation}`, () => {
          cy.visitRSVPSearchPage();
          cy.searchRSVP(variation);

          cy.url().should('include', '/rsvp/edit');
          cy.contains(
            'Please fill out all required fields, this information will help us in planning for our wedding!',
          );
          cy.getCookie('rsvp-jwt-token').should('exist');

          cy.getById('name').should('have.value', parent);
          cy.getById('email').should('exist');
          cy.getById('attending').should('exist');

          cy.getSubmitButton().should('exist');
        });
      });
    });
  });

  it('should not show edit page for random value', () => {
    cy.visitRSVPSearchPage();
    cy.searchRSVP(`${chance.first()} ${chance.last()}`);

    cy.url().should('not.include', '/rsvp/edit');
    cy.url().should('include', '/rsvp');
    cy.contains('That RSVP could not be found. If the problem persists, please email contact@lukeandjadi.com');
  });
});
