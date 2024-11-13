/// <reference types="cypress" />
const baseUrl = Cypress.env("base_url");
const usuario = Cypress.env("user");

class LoginPage {
  constructor() {
    this.usuario = Cypress.env("user");
  }

  visitar_pagina(page) {
    cy.visit(`${baseUrl}${page}`);
  }

  executar_login(tipoLogin) {
    const tiposPermitidos = ['valido', 'senhaIncorreta', 'usuarioVazio'];
    if (!tiposPermitidos.includes(tipoLogin)) {
      throw new Error(`Tipo de login invalido: ${tipoLogin}`);
    }

    switch (tipoLogin) {
      case 'valido': {
        cy.get('#id_username').type(`${this.usuario[0]}`);
        cy.get('#id_password').type(this.usuario[1]);
        cy.get('#submit-id-submit').click();

        break;
      }

      case 'senhaIncorreta':
        {
          cy.get('#id_username').type(this.usuario[1]);
          cy.get('#id_password').type(this.usuario[0]);
          cy.get('#submit-id-submit').click();
          break;
        }

      case 'usuarioIncorreto':
        {
          cy.get('#id_username').type(this.usuario[0]);
          cy.get('#id_password').type(this.usuario[2]);
          cy.get('#submit-id-submit').click();
          break;
        }
    }
  }

  validaLogin() {
    cy.get('.my-2 > .dropdown > .dropdown-toggle')
      .should('be.visible')
      .and('contain', user[3]);
    cy.url().should('include', `${baseUrl}dashboard`);
  }

  validaUsuarioInvalido() {
    cy.get('.alert')
      .should('contains', 'Por favor, entre com um usuário e senha corretos. Note que ambos os campos diferenciam maiúsculas e minúsculas.');
  }

  validaSenhaInvalida() {
    cy.contains('Por favor, entre com um usuário e senha corretos. Note que ambos os campos diferenciam maiúsculas e minúsculas.')
      .should('be.visible');
  }

  validaPaginaSobreNos() {
    cy.url().should('include', `${baseUrl}software/about-us`);
    cy.get('#page-title')
      .should('be.visible')
      .and('contain', 'About us');
  }
}

export default LoginPage;