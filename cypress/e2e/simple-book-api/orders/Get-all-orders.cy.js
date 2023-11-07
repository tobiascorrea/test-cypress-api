describe("Consulta de Ordens", () => {
  let authToken;
  let firstOrderId;

  before(() => {
    cy.fixture("authToken").then((data) => {
      authToken = data.authToken;
    });
  });

  it("Deve retornar informações sobre as ordens", async () => {
    const getOrderListResponse = await cy.request({
      method: "GET",
      url: "/orders/",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      failOnStatusCode: false,
    });

    expect(getOrderListResponse.status).to.equal(200);

    expect(getOrderListResponse.body).to.be.an("array").that.is.not.empty;

    firstOrderId = getOrderListResponse.body[0].id;

    const order = getOrderListResponse.body[0];
    expect(order).to.have.property("id").that.is.not.null.and.not.empty;
    expect(order).to.have.property("bookId").that.is.a("number");
    expect(order).to.have.property("customerName").that.is.a("string");
    expect(order).to.have.property("createdBy").that.is.a("string");
    expect(order).to.have.property("quantity").that.is.a("number");
    expect(order).to.have.property("timestamp").that.is.a("number");
  });

  it("Deve retornar informações sobre uma ordem específica", async () => {
    const getSpecificOrderResponse = await cy.request({
      method: "GET",
      url: `/orders/${firstOrderId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      failOnStatusCode: false,
    });

    expect(getSpecificOrderResponse.status).to.equal(200);

    const expectedKeys = [
      "id",
      "bookId",
      "customerName",
      "createdBy",
      "quantity",
      "timestamp",
    ];
    expect(getSpecificOrderResponse.body).to.include.keys(expectedKeys);
    expect(getSpecificOrderResponse.body.id).to.be.a("string");
    expect(getSpecificOrderResponse.body.bookId).to.be.a("number");
    expect(getSpecificOrderResponse.body.customerName).to.be.a("string");
    expect(getSpecificOrderResponse.body.createdBy).to.be.a("string");
    expect(getSpecificOrderResponse.body.quantity).to.be.a("number");
    expect(getSpecificOrderResponse.body.timestamp).to.be.a("number");
  });
});
