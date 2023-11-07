// commands.js
import Chance from "chance";

const chance = new Chance();

Cypress.Commands.add("generateToken", () => {
  const dynamicData = {
    clientName: chance.name(),
    clientEmail: chance.email(),
  };

  cy.request({
    method: "POST",
    url: "/api-clients",
    body: dynamicData,
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.equal(201);
    expect(response.body).to.not.be.undefined;

    Cypress.env("authToken", response.body.accessToken);

    console.log("Generated Token:", Cypress.env("authToken"));
  });
});
