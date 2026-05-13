describe('Products Page', () => {
  it('displays the products page', () => {
    cy.visit('/products')
    cy.contains('Products')
  })

  it('shows loading state initially', () => {
    cy.intercept('GET', '**/api/products', { delay: 1000, body: { data: [] } }).as('getProducts')
    cy.visit('/products')
    cy.get('[data-testid="loading"]').should('exist')
  })

  it('shows product list when API returns data', () => {
    cy.intercept('GET', '**/api/products', {
      body: {
        data: [
          { id: 1, name: 'Widget', description: 'A widget', price: '9.99', stock: 5 },
          { id: 2, name: 'Gadget', description: 'A gadget', price: '19.99', stock: 10 },
        ],
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 2,
      },
    }).as('getProducts')

    cy.visit('/products')
    cy.wait('@getProducts')
    cy.contains('Widget')
    cy.contains('Gadget')
  })
})
