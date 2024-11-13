/// <reference types="cypress" />
import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import ApiRequests from "../../support/api/ApiRequests";

let response;

Given("que tenho uma requisicao do tipo {string} para o endpoint {string}", (method, endpoint) => {
  ApiRequests.setRequestData(method, endpoint);
});

Given("tenho os seguintes parametros:", (dataTable) => {
  ApiRequests.setRequestBody(dataTable);
});

When("a requisicao e enviada", () => {
  ApiRequests.sendRequest().then((res) => {
    response = res;
  });
});

Then("o status code de resposta deve ser {string}", (statusCode) => {
  expect(response.status).to.eq(parseInt(statusCode));
});

Then("o response body nao pode retornar vazio", () => {
  expect(response.body).to.not.be.empty;
});

Then("o response body deve conter os dados do usuario criado no cenario anterior", () => {
  expect(response.body).to.have.property("username", ApiRequests.usuario);
  expect(response.body).to.have.property("id", 1);
});

Then("o response body deve conter o nome de usuario", () => {
  expect(response.body.message).to.eq(ApiRequests.usuario);
});

Then("o usuario nao deve mais existir", () => {
  expect(response.status).to.eq(404);
  expect(response.body).to.have.property("message", "User not found");
});
