describe("Home Page", () => {
  it("should load successfully", () => {
    cy.visit("localhost:3000/");
    cy.contains("Connexion");
    cy.contains("Inscription");
    cy.contains("Consulter la ressource");
  });
});
