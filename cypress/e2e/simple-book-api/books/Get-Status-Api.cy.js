/// <reference types="cypress" />

describe("Teste de Requisição GET para /status", () => {
  it("Deve retornar status 200 e mensagem OK", () => {
    cy.request("/status").then((response) => {
      expect(response.status).to.equal(200);

      expect(response.body).to.have.property("status", "OK");
    });
  });
});
