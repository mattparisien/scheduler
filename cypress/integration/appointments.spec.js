describe("Appointments", () => {
	it("should book an interview", () => {
		cy.visit("/").contains("li", "Monday");
		cy.get('[alt="Add"]').first().click();
	});
});
