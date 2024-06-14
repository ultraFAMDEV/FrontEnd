describe("Inscription Page", () => {
  it("Chargement de la page avec succès", () => {
    cy.visit("http://localhost:3000/inscription");

    cy.contains("Vous êtes déjà inscrit ? Connectez-vous !");
    cy.contains("Suivant");
    cy.contains("Retour");
    cy.contains("Annuler, revenir à l'accueil");
  });

  it("Inscription avec un utilisateur valide", () => {
    cy.visit("http://localhost:3000/inscription");

    cy.get('input[placeholder="Adresse mail"]').type(
      "cedric@testintegration.fr"
    );
    cy.get('input[placeholder="Mot de passe"]').type("cedric");
    cy.get('input[placeholder="Confirmer le mot de passe"]').type("cedric");
    cy.get("div").contains("Suivant").click();

    cy.get('input[placeholder="Nom"]').type("cedric");
    cy.get('input[placeholder="Prénom"]').type("ans");
    cy.get('input[type="date"]').type("1999-12-31");
    cy.get("input[type=file]").selectFile("public/boy.png");

    cy.get("div").contains("Créer mon profil").click();
  });

  it("Inscription avec un mot de passe non valide valide", () => {
    cy.visit("http://localhost:3000/inscription");

    cy.get('input[placeholder="Adresse mail"]').type(
      "cedric@testintegration.fr"
    );
    cy.get('input[placeholder="Mot de passe"]').type("cedric");
    cy.get('input[placeholder="Confirmer le mot de passe"]').type("ceddeic");
    cy.get("div").contains("Suivant").click();
    cy.get("p").contains("Les mots de passe ne correspondent pas.");
  });

  it("Annuler de créer son compte", () => {
    cy.visit("http://localhost:3000/inscription");

    cy.get("a").contains("Annuler, revenir à l'accueil").click();
    cy.url().should("include", "/");
  });
});
