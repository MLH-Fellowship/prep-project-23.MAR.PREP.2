describe('News Articles', () => {
    beforeEach(() => {
        cy.fixture('articles').as('articlesJSON')
        cy.server()
        cy.route('GET', '**/everything**', '@articlesJSON').as('getArticles')
    })

    it('should display news articles for a valid city', () => {
        cy.visit('/')
        cy.get('input[type="text"]').type('New York City')
        cy.get('button').click()

        cy.wait('@getArticles')

        cy.get('.news-card').should('have.length', 2)
        cy.get('.news-card').first().contains('Article 1 Title').should('exist')
    })

    it('should display "No News Found" for an invalid city', () => {
        cy.visit('/')
        cy.get('input[type="text"]').type('Not a real city')
        cy.get('button').click()

        cy.wait('@getArticles')

        cy.contains('No News Found').should('exist')
    })
})
