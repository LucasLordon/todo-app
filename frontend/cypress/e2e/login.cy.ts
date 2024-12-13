describe('Login', () => {
  it('should login as a newly created user', () => {
    cy.visit('http://localhost:5173/register')
    cy.get('input[name="email"]')
      .type('test@test.ch')

    cy.get('input[name="password"]')
      .type('12345678')

    cy.get('input[name="confirmation"]')
      .type('12345678')


    cy.get('button[type="submit"]').click();

    cy.visit('http://localhost:5173/login');
    cy.get('input[name="email"]')
      .type('test@test.ch')

    cy.get('input[name="password"]')
      .type('12345678')

    cy.get('button[type="submit"]')
      .click()
  })

  it('should get an error because user not found user', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[name="email"]')
      .type('user@notcreated.ch')

    cy.get('input[name="password"]')
      .type('12345678')

    cy.get('button[type="submit"]')
      .click()

    cy.get('div:has(form)')
      .find('span').contains('Utilisateur non trouvé')
  })
})
