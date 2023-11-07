describe("Teste de Requisição GET para /books", () => {
  it("Deve retornar um array não vazio com chaves específicas", () => {
    cy.request("/books").then((response) => {
      expect(response.status).to.equal(200);

      expect(response.body).to.be.an("array");

      expect(response.body).to.not.be.empty;

      response.body.forEach((book) => {
        expect(book).to.include.keys("id", "name", "type", "available");
      });
    });
  });
});
