let createdOrderId;
let authToken;

describe("Criação de Ordem e Exclusão", () => {
  before(() => {
    cy.fixture("authToken.json").then((fixtureData) => {
      authToken = fixtureData.authToken;
    });
  });

  it("Deve criar uma ordem com sucesso", async () => {
    const orderData = {
      bookId: chance.integer({ min: 1, max: 6 }),
      customerName: chance.name(),
    };

    const orderResponse = await cy.request({
      method: "POST",
      url: "/orders/",
      body: orderData,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      failOnStatusCode: false,
    });

    expect(orderResponse.status).to.equal(201);

    createdOrderId = orderResponse.body.orderId;
    cy.log(`Ordem criada com ID: ${createdOrderId}`);
  });

  it("Deve deletar a ordem com sucesso", async () => {
    expect(createdOrderId).to.not.be.undefined;

    const deleteOrderResponse = await cy.request({
      method: "DELETE",
      url: `/orders/${createdOrderId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      failOnStatusCode: false,
    });

    expect(deleteOrderResponse.status).to.equal(204);
    cy.log(`Ordem com ID ${createdOrderId} deletada com sucesso`);
  });

  it("Deve retornar erro ao tentar deletar uma ordem inexistente", async () => {
    if (createdOrderId) {
      const deleteOrderResponse = await cy.request({
        method: "DELETE",
        url: `/orders/${createdOrderId}`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        failOnStatusCode: false,
      });

      expect(deleteOrderResponse.status).to.equal(404);

      expect(deleteOrderResponse.body).to.deep.equal({
        error: `No order with id ${createdOrderId}.`,
      });

      cy.log(`Tentativa de deletar ordem inexistente retornou status code 404`);
    } else {
      cy.log("Nenhuma ordem criada anteriormente para este teste");
    }
  });
});
