describe('Weather App', () => {
    it('should load with no errors', () => {
        cy.visit('/')
    })

    it('should display weather for a valid city', () => {
        cy.get('input[type="text"]').type('New York City')
        cy.get('button').click()

        cy.get('.Results').contains('Loading...').should('not.exist')
        cy.get('.Results').contains('New York').should('exist')
    })

    it('should display an error message for an invalid city', () => {
        cy.get('input[type="text"]').type('Not a real city')
        cy.get('button').click()

        cy.get('.Results').contains('Loading...').should('not.exist')
        cy.get('.Results').contains('Error').should('exist')
    })
})
