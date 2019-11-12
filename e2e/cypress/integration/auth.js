context("Check authentication", () => {
  const timestamp = new Date().getTime().toString();
  const username = `username_${timestamp}`;
  const email = `username_${timestamp}@email.com`;
  const password = "1234";

  it("should send confirmation link", function() {
    cy.visit("/");
    cy.contains("register now!").click();
    cy.get('[name="username"]').type(username);
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(password);
    cy.get("button").click();
    cy.contains("Confirmation link sent to email");
    cy.wait(1000);
  });

  it("should confirm", function() {
    cy.getConfirmUrl(email).then(url => {
      cy.visit(url);
      cy.contains(email);
    });
  });

  it("should login and logout", function() {
    cy.visit("/");
    cy.get('[name="username"]').type(username);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.contains(email);
    cy.get('.ant-avatar').trigger('mouseover');
    cy.contains('Logout').click();
    cy.contains('Sign in');
  });

  it("shouldn't login", function() {
    cy.visit("/");
    cy.get('[name="username"]').type("fsdf");
    cy.get('[name="password"]').type("qwe");
    cy.get('[type="submit"]').click();
    cy.contains("Incorrect username or password");
    cy.wait(1000);
  });
});
