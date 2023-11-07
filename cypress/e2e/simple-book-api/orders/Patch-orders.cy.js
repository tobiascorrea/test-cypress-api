import Chance from "chance";

const chance = new Chance();

it("Deve atualizar informações sobre uma ordem específica", async () => {
  cy.fixture("authToken.json").then(async (fixtureData) => {
    const authToken = fixtureData.authToken;

    const orderIdToUpdate = "PF6MflPDcuhWobZcgmJy5";

    const updatedOrderData = {
      customerName: chance.name(),
    };

    const updateOrderResponse = await cy.request({
      method: "PATCH",
      url: `/orders/${orderIdToUpdate}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: updatedOrderData,
      failOnStatusCode: false,
    });

    expect(updateOrderResponse.status).to.equal(204);
  });
});
