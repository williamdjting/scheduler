describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    // cy.get("h2").contains("Tuesday").click();
    // cy.get("li")
    //   .contains("h2", "Tuesday")
    //   .should("have.css", "background-color", "rgb(242, 242, 242)");

    // cy.get("h2").contains("Tuesday").click();
    // cy.contains("h2", "Tuesday").should(
    //   "have.css",
    //   "background-color",
    //   "rgb(242, 242, 242)"
    // );

    // cy.contains("h2", "Tuesday")
    //   .click()
    //   .should("have.css", "background-color", "rgb(242, 242, 242)");

    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected")
  });
});
