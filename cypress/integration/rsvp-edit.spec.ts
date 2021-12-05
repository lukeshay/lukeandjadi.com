describe('RSVPs', () => {
  it('can be edited', () => {
    cy.visit('/');
    cy.contains('a', 'RSVP').click();

    cy.url().should('include', '/rsvp');

    cy.get('input[id="name"]').type('Luke Shay');
    cy.contains('button', 'Search').click({ waitForAnimations: true });

    cy.wait(5000);

    cy.url().should('include', '/rsvp/edit');

    cy.getCookie('rsvp-jwt-token').should('exist');

    cy.get('input[id="name"]');
    cy.get('input[id="email"]')
      .clear()
      .type(`shay.luke17+${Date.now()}@gmail.com`);
    cy.get('input[id="guests"]')
      .clear()
      .type(`${(Math.random() * 5 + 1).toFixed()}`);

    cy.contains('button', 'Update').click({ waitForAnimations: true });

    cy.wait(5000);

    cy.contains('Your RSVP has been updated!');
  });
});

export {};
