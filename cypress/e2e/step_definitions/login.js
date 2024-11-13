/// <reference types="cypress" />

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/login_page";

const baseUrl = Cypress.env("base_url");
const login_page = new LoginPage();

Given("que o usuario esta na pagina de login", () => {
  login_page.visitar_pagina('user/login');
});

When("o usuario preenche os campos com dados validos e clica no botao 'Login'", () => {
  login_page.executar_login('valido');
});

When("o usuario preenche o campo senha com uma senha incorreta e clica no botao 'Login'", () => {
  login_page.executar_login('senhaIncorreta');
});

When("o usuario preenche o campo com um usuario incorreto e clica no botao 'Login'", () => {
  login_page.executar_login('usuarioIncorreto');
});

When("navega ate a pagina 'About us'", () => {
  cy.visit(`${baseUrl}software/about-us`);
});

Then("o usuario deve ser redirecionado para a pagina 'dashboard'", () => {
  login_page.validaLogin();
});

Then("uma mensagem de erro 'Por favor, entre com um usuário e senha corretos. Note que ambos os campos diferenciam maiúsculas e minúsculas.' deve ser exibida", () => {
  login_page.validaSenhaInvalida();
});

Then("o usuario deve ser redirecionado para a pagina 'About us'", () => {
  login_page.validaPaginaSobreNos();
});