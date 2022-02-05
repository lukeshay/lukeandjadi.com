// reference code is written like below to avoid the clash in mocha types.
// in most of the cases, simple <reference types="cypress" /> will do.
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../../../node_modules/cypress/types/cy-blob-util.d.ts" />
/// <reference path="../../../node_modules/cypress/types/cy-bluebird.d.ts" />
/// <reference path="../../../node_modules/cypress/types/cy-moment.d.ts" />
/// <reference path="../../../node_modules/cypress/types/cy-minimatch.d.ts" />
/// <reference path="../../../node_modules/cypress/types/lodash/index.d.ts" />
/// <reference path="../../../node_modules/cypress/types/sinon/index.d.ts" />
/// <reference path="../../../node_modules/cypress/types/jquery/index.d.ts" />
/// <reference path="../../../node_modules/cypress/types/cypress.d.ts" />
/// <reference path="../../../node_modules/cypress/types/cypress-type-helpers.d.ts" />
/// <reference path="../../../node_modules/cypress/types/cypress-global-vars.d.ts" />
/* eslint-enable @typescript-eslint/triple-slash-reference */

declare namespace Cypress {
  // add custom Cypress command to the interface Chainable<Subject>
  type Chainable = {
    // let TS know we have a custom command cy.clickLink(...)
    clickLink: (label: RegExp | number | string) => void;
  };

  // add properties the application adds to its "window" object
  // by adding them to the interface ApplicationWindow
  type ApplicationWindow = {
    // let TS know the application's code will add
    // method window.add with the following signature
    add: (a: number, b: number) => number;
  };
}
