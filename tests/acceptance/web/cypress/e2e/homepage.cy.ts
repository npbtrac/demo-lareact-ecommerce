describe('Homepage', () => {
  it('loads the homepage', () => {
    cy.visit('/')
    cy.contains('LaReact E-Commerce')
  })

  it('has navigation to products', () => {
    cy.visit('/')
    cy.contains('Products').click()
    cy.url().should('include', '/products')
  })
})
