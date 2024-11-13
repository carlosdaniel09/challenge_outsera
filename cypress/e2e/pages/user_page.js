// cypress/support/api/ApiRequests.js
class ApiRequests {
  constructor() {
    this.usuario = Cypress.env("user")[0];
  }

  setRequestData(method, endpoint) {
    return cy.wrap({
      method,
      url: endpoint.replace("usuario", this.usuario),
    }).as("requestData");
  }

  setRequestBody(dataTable) {
    const body = dataTable.rowsHash();
    cy.get("@requestData").then((requestData) => {
      requestData.body = body;
      cy.wrap(requestData).as("requestData");
    });
  }

  sendRequest() {
    cy.get("@requestData").then((requestData) => {
      const options = {
        ...requestData,
        failOnStatusCode: false,
      };
      return cy.request(options).then((res) => {
        return cy.wrap(res);
      });
    });
  }
}

export default new ApiRequests();
