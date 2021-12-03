describe("Navigation", () => {
	it("should visit root", () => {
		cy.visit("/");
	});

	it("should navigate to Tuesday", () => {
		cy.visit("/");
		cy.get(".day-list__item").contains("Tuesday").click();
	});
});
