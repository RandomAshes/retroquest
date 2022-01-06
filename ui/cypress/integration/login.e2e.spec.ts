/*
 * Copyright (c) 2022 Ford Motor Company
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import TeamCredentials from '../support/types/teamCredentials';

describe('Logging In', () => {
  const teamCredentials = {
    teamName: 'Test Login',
    teamId: 'test-login',
    password: 'Login1234',
    jwt: '',
  } as TeamCredentials;

  before(() => {
    cy.createTeam(teamCredentials);
  });

  beforeEach(() => {
    cy.visit('/login');
    cy.contains('Sign in to your Team!');

    cy.get('[data-testid=teamNameInput]').as('teamNameInput');
  });

  it('Navigates to team board after successful login', () => {
    cy.get('@teamNameInput').type(teamCredentials.teamName);
    cy.get('[data-testid=teamPasswordInput]').type(teamCredentials.password);
    cy.get('[data-testid=formSubmitButton]').click();
    cy.url().should('eq', Cypress.config().baseUrl + `/team/${teamCredentials.teamId}`);
  });

  it('Pre-populates team name', () => {
    cy.get('@teamNameInput').should('have.value', '');

    cy.visit(`/login/${teamCredentials.teamId}`);
    cy.get('@teamNameInput').should('have.value', teamCredentials.teamName);
  });
});
