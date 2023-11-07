import Chance from "chance";
const chance = new Chance();

const generateFakeData = () => ({
  clientName: chance.name(),
  clientEmail: chance.email(),
});

const getAuthToken = async () => {
  if (!Cypress.env("CYPRESS_AUTH_TOKEN")) {
    const response = await cy.request({
      method: "POST",
      url: "/api-clients",
      body: generateFakeData(),
      failOnStatusCode: false,
    });

    Cypress.env("CYPRESS_AUTH_TOKEN", response.body.accessToken);
  }

  return Cypress.env("CYPRESS_AUTH_TOKEN");
};

describe("Gera token", () => {
  it("Deve gerar um token com sucesso", async () => {
    // Obtém o token
    const authToken = await getAuthToken();

    expect(authToken).to.not.be.undefined;

    cy.log(`Token obtido: ${authToken}`);
  });

  it("Deve retornar erro ao tentar gerar token com email já existente", async () => {
    const duplicateEmailData = {
      clientName: chance.name(),
      clientEmail: "thiago@teste1.com",
    };

    const duplicateResponse = await cy.request({
      method: "POST",
      url: "/api-clients",
      body: duplicateEmailData,
      failOnStatusCode: false,
    });

    expect(duplicateResponse.status).to.equal(409);
    expect(duplicateResponse.body).to.deep.equal({
      error: "API client already registered. Try a different email.",
    });
  });

  it("Deve retornar erro ao tentar gerar token com campo name vazio", async () => {
    const nameEmpty = {
      clientName: "",
      clientEmail: "thiago@teste1.com",
    };

    const nameEmptyResponse = await cy.request({
      method: "POST",
      url: "/api-clients",
      body: nameEmpty,
      failOnStatusCode: false,
    });

    expect(nameEmptyResponse.status).to.equal(400);
    expect(nameEmptyResponse.body).to.deep.equal({
      error: "Invalid or missing client name.",
    });
  });

  it("Deve retornar erro ao tentar gerar token com campo email vazio", async () => {
    const emailEmpty = {
      clientName: chance.name(),
      clientEmail: "",
    };

    const emailEmptyResponse = await cy.request({
      method: "POST",
      url: "/api-clients",
      body: emailEmpty,
      failOnStatusCode: false,
    });

    expect(emailEmptyResponse.status).to.equal(400);
    expect(emailEmptyResponse.body).to.deep.equal({
      error: "Invalid or missing client email.",
    });
  });
});
