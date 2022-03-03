describe("the modal window of the ingredient with all the data opens/closes correctly", function () {
    before(function () {
        cy.visit("http://localhost:3000");
    });

    it("should open the modal", () => {
        cy.get('[alt="Соус фирменный Space Sauce"]').click();
        cy.get('[data-cy="ingredient-modal-name"]').contains(
            "Соус фирменный Space Sauce"
        );
        cy.get('[data-cy="ingredient-modal-item"]').contains("Белки,г");
    });
});
