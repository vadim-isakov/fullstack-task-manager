context("Main functional checking flow", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
  });

  it("should create task, create and delete comment", function() {
    cy.get('[href="/create-task"]').click();

    //Create task
    cy.get('[type="submit"]').click();
    cy.contains("Title is required");

    const title = "task " + new Date().getTime().toString();
    let description = "";
    for (let i = 0; i < 30; i++) {
      description += "Some description! ";
    }
    cy.get('[name="title"]').type(title);
    cy.get('[name="description"]').type(description);
    cy.get('[type="submit"]').click();
    cy.contains(title);
    cy.contains(description);

    //Create comment
    cy.contains("No Data");
    cy.get('[type="submit"]').click();
    cy.contains("Text is empty");
    const comment = "Some comment!";
    cy.get("textarea").type(comment);
    cy.get('[type="submit"]').click();
    const comments = cy.get("#comments");
    comments.contains(comment);

    //Delete comment
    comments.get("#deleteButton").click();
    comments.get("#confirmDelete").click();
    cy.contains("No Data");

    //Edit task
    cy.get("#editButton").click();
    const newTitle = "new " + title;
    cy.get('[name="title"]').clear().type(newTitle);
    cy.get("#status").click();
    cy.contains("archived").click();
    cy.get('[type="submit"]').click();

    cy.contains("Add Comment");
    cy.contains("Backward").click();

    //Check main list
    cy.contains(newTitle).should("not.exist");

    //Check archive
    cy.contains("Archived tasks").click();
    cy.contains(newTitle);

    //Depends on screen resolution
    cy.contains("Read more").click();
    cy.contains(newTitle);
    cy.contains(description);
    cy.wait(1000);
  });
});
