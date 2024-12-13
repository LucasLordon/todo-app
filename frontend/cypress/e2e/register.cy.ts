describe('Register', () => {
  it('should create a new user', () => {
    // Goes to the page to register
    cy.visit('http://localhost:5173/register')
    // Puts the information
    cy.get('input[name="email"]')
      .type('test@test.ch')

    cy.get('input[name="password"]')
      .type('12345678')

    cy.get('input[name="confirmation"]')
      .type('12345678')
 
    cy.get('button[type="submit"]').click()

    // If it got redirected than the request went well
    cy.url().should('eq', 'http://localhost:5173/login')
  })
  // Not working because message error is 5 caracters long
  it('should say the password isnt long enough', () => {
    cy.visit('http://localhost:5173/register')
    cy.get('input[name="email"]')
      .type('test2@test.ch')

    cy.get('input[name="password"]')
      .type('123')

      // Checks if a good message error appears
    cy.get('div:has(input[name="password"])')
      .find('p').contains('Le mot de passe doit faire au moins 8 caractères')
  })

  it('should say that the passwords are not equal', () => {
    cy.visit('http://localhost:5173/register')
    cy.get('input[name="email"]')
      .type('test@test.ch')

    cy.get('input[name="password"]')
      .type('12345678')

    cy.get('input[name="confirmation"]')
      .type('123456789')

      // Checks if message of password not equal appears
    cy.get('div:has(input[name="confirmation"])')
      .find('p').contains('Les mots de passe ne correspondent pas')
  })
})
