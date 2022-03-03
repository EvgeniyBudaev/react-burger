describe("should drag & drop successfully", function () {
    before(function () {
        cy.visit("http://localhost:3000");
    });

    it("should drag & drop an ingredients", () => {
        cy.get('[alt="Флюоресцентная булка R2-D3"]').trigger("dragstart");
        cy.get('[data-cy="constructor"]').trigger("drop");
        cy.get('[alt="Филе Люминесцентного тетраодонтимформа"]').trigger(
            "dragstart"
        );
        cy.get('[data-cy="constructor-main"]').trigger("drop");
        cy.get('[alt="Биокотлета из марсианской Магнолии"]').trigger(
            "dragstart"
        );
        cy.get('[data-cy="constructor-main"]').trigger("drop");
        cy.get('[alt="Соус традиционный галактический"]').trigger("dragstart");
        cy.get('[data-cy="constructor-main"]').trigger("drop");
    });
});
