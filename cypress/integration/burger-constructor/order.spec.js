describe("should order checkout successfully", function () {
    before(function () {
        cy.visit("http://localhost:3000");
    });

    it("should order checkout successfully", () => {
        cy.get('[alt="Флюоресцентная булка R2-D3"]').trigger("dragstart");
        cy.get('[data-cy="constructor"]').trigger("drop");
        cy.get('[alt="Филе Люминесцентного тетраодонтимформа"]').trigger(
            "dragstart"
        );
        cy.get('[data-cy="constructor-main"]').trigger("drop");
        cy.get("button").contains("Оформить заказ").click();
        cy.get('[name="email"]').type("ivan@gmail.com");
        cy.get('[name="password"]').type("test12345");
        cy.get("button").contains("Войти").click();
        cy.get("button").contains("Оформить заказ").click();
        cy.wait(17000);
        cy.get('[data-cy="order-details-title"]').contains(
            "идентификатор заказа"
        );
    });
});
