describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');

    cy.get('nav');
    cy.contains('button', 'RSVP');
    cy.get('img[data-test-id="banner"]');
    cy.contains('h1', 'Our Story');
    cy.contains('h1', 'The Wedding');
    cy.contains('h1', 'Guest Accommodations');
    cy.contains('h1', 'Registries');
    cy.contains('h1', 'Wedding Party');
  });
});
