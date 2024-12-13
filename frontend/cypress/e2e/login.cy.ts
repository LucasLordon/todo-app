describe('Login', () => {
  it('should login as a newly created user', () => {
    // Goes to the page to register
    cy.visit('http://localhost:5173/register')
    // Puts information
    cy.get('input[name="email"]')
      .type('test@test.ch')

    cy.get('input[name="password"]')
      .type('12345678')

    cy.get('input[name="confirmation"]')
      .type('12345678')


    cy.get('button[type="submit"]').click();

    cy.visit('http://localhost:5173/login');
    // puts credentials
    cy.get('input[name="email"]')
      .type('test@test.ch')

    cy.get('input[name="password"]')
      .type('12345678')

      // Sumbits information, if we get other than status 200 gets an error
    cy.get('button[type="submit"]')
      .click()
  })

  it('should get an error because user not found user', () => {
    // Goes to the page of login
    cy.visit('http://localhost:5173/login');
    // Puts wrong credentials
    cy.get('input[name="email"]')
      .type('user@notcreated.ch')

    cy.get('input[name="password"]')
      .type('12345678')

    cy.get('button[type="submit"]')
      .click()

      // Checks if message appears
    cy.get('div:has(form)')
      .find('span').contains('Utilisateur non trouvé')
  })
})
