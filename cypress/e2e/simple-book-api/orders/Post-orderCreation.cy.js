// orderTest.js
import Chance from "chance";

const chance = new Chance();

describe("Criação de Ordem com Sucesso", () => {
  beforeEach(() => {
    cy.generateToken();
  });

  it("Deve criar uma ordem com sucesso", async () => {
    const orderData = {
      bookId: chance.integer({ min: 1, max: 6 }),
      customerName: chance.name(),
    };

    const createOrderResponse = await cy.request({
      method: "POST",
      url: "/orders/",
      body: orderData,
      headers: {
        Authorization: `Bearer ${Cypress.env("authToken")}`,
      },
      failOnStatusCode: false,
    });

    expect(createOrderResponse.status).to.equal(201);
    expect(createOrderResponse.body).to.deep.equal({
      created: true,
      orderId: createOrderResponse.body.orderId,
    });
  });

  it("Deve tentar criar uma ordem com campo bookId vazio", async () => {
    const orderWithEmptyBookId = {
      bookId: "",
      customerName: chance.name(),
    };

    const createOrderResponse = await cy.request({
      method: "POST",
      url: "/orders/",
      body: orderWithEmptyBookId,
      headers: {
        Authorization: `Bearer ${Cypress.env("authToken")}`,
      },
      failOnStatusCode: false,
    });

    expect(createOrderResponse.status).to.equal(400);
    expect(createOrderResponse.body).to.deep.equal({
      error: "Invalid or missing bookId.",
    });
  });
});
