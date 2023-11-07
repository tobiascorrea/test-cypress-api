describe("Consultando um livro por ID", () => {
  let bookId;

  it("Deve obter um ID válido", () => {
    cy.request("/books").then((response) => {
      expect(response.body).to.have.length.greaterThan(0);

      bookId = response.body[0].id;

      cy.log(`ID do livro obtido: ${bookId}`);
    });
  });

  it("Deve consultar um book por ID", () => {
    if (!bookId) {
      throw new Error(
        "ID do livro não encontrado. Certifique-se de que a primeira requisição foi bem-sucedida."
      );
    }

    cy.request(`/books/${bookId}`).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("id", bookId);
      expect(response.body).to.have.property("name");
      expect(response.body).to.have.property("author");
      expect(response.body).to.have.property("type");
      expect(response.body).to.have.property("price");
      expect(response.body).to.have.property("current-stock");
      expect(response.body).to.have.property("available");
    });
  });

  it("Deve retornar erro ao tentar obter livro com ID inexistente", async () => {
    const nonExistentBookId = 1000000001;

    const nonExistentBookResponse = await cy.request({
      method: "GET",
      url: `/books/${nonExistentBookId}`,
      failOnStatusCode: false,
    });

    cy.log(`Status da resposta: ${nonExistentBookResponse.status}`);

    expect(nonExistentBookResponse.status).to.equal(404);
    expect(nonExistentBookResponse.body).to.deep.equal({
      error: `No book with id ${nonExistentBookId}`,
    });

    cy.log(
      `Status da resposta após a asserção: ${nonExistentBookResponse.status}`
    );
  });
});
