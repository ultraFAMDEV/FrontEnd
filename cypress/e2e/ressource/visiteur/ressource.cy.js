describe("One Ressource Page", () => {
  it("should load successfully", () => {
    cy.visit("http://localhost:3000/ressources/35/");
    cy.contains("Cédric Ans");
  });
});
