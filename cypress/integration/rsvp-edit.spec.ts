import { Chance } from 'chance';

const chance = new Chance();

describe('RSVPs', () => {
  it('can be edited', () => {
    cy.visit('/rsvp');

    cy.get('input[id="name"]').type('Luke Shay');
    cy.get('button[type=submit]').click({ waitForAnimations: true });

    cy.wait(3000);

    cy.url().should('include', '/rsvp/edit');

    cy.getCookie('rsvp-jwt-token').should('exist');

    cy.get('input[id="name"]');
    cy.get('input[id="email"]').clear().type(`shay.luke17+${Date.now()}@gmail.com`);
    cy.get('select[id="guests"]').select(
      chance.natural({
        max: 2,
        min: 0,
      }),
    );

    cy.contains('button', 'Update').click({ waitForAnimations: true });

    cy.wait(3000);

    cy.contains('Your RSVP has been updated!');
  });
});
