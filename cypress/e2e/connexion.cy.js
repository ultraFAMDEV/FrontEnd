describe("Connexion Page", () => {
  it("Chargement de la page avec succès", () => {
    cy.visit("http://localhost:3000/connexion");

    cy.contains("Pas encore inscrit ? Inscrivez-vous !");
    cy.contains("Connexion");
    cy.contains("Se connecter");
    cy.contains("Continuer en tant qu'invité");
    cy.contains("Annuler, revenir à l'accueil");
  });

  it("Connexion avec un utilisateur valide", () => {
    cy.visit("http://localhost:3000/connexion");

    cy.get('input[placeholder="Adresse mail"]').type("cedric@mail.fr");
    cy.get('input[placeholder="Mot de passe"]').type("cedric");

    cy.get("div").contains("Se connecter").click();

    cy.url().should("eq", "http://localhost:3000/");
  });

  it("Connexion avec un mauvais login", () => {
    cy.visit("http://localhost:3000/connexion");

    cy.get('input[placeholder="Adresse mail"]').type("wrong@example.com");
    cy.get('input[placeholder="Mot de passe"]').type("wrongpassword");

    cy.get("div").contains("Se connecter").click();

    cy.contains("Mot de passe incorrect");
  });

  it("should allow navigation to the registration page", () => {
    cy.visit("http://localhost:3000/connexion");

    cy.get("a").contains("Pas encore inscrit ? Inscrivez-vous !").click();

    cy.url().should("include", "/inscription");
  });

  it("Bouton 'Continuer la nivigation en tant qu'invité'", () => {
    cy.visit("http://localhost:3000/connexion");

    cy.get("a").contains("Continuer en tant qu'invité").click();

    cy.url().should("eq", "http://localhost:3000/");
  });

  it("Bouton 'Annuler et revenir à l'acceuil'", () => {
    cy.visit("http://localhost:3000/connexion");

    cy.get("a").contains("Annuler, revenir à l'accueil").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});
