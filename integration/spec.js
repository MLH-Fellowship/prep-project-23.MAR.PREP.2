describe('Weather app', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('searches for location and shows weather', () => {
      cy.get('#search-input').type('New York').type('{enter}')
      cy.get('#current-weather').should('be.visible')
    })
  
    it('can view articles', () => {
      cy.get('#articles-link').click()
      cy.url().should('include', '/articles')
      cy.get('.article-card').should('have.length.gt', 0)
      cy.get('.article-card:first').click()
      cy.url().should('include', '/articles/')
      cy.get('.article-details').should('be.visible')
    })
  })
  