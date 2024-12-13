describe('TODO', () => {
  it('should create a new todo', () => {
    // Goes to the page to register
    cy.visit('http://localhost:5173/register')

    // Puts the information
    cy.get('input[name="email"]')
      .type('test@test.ch')

    cy.get('input[name="password"]')
      .type('12345678')

    cy.get('input[name="confirmation"]')
      .type('12345678')

    // Submits and goes to the login page
    cy.get('button[type="submit"]').click();

    cy.visit('http://localhost:5173/login');

    // Enters the credentials
    cy.get('input[name="email"]')
      .type('test@test.ch')

    cy.get('input[name="password"]')
      .type('12345678')

    cy.get('button[type="submit"]')
      .click()

    // Creates the todo
    cy.get('input[type="text"]')
      .type('my first todo')

    cy.get('button[type="submit"]')
      .click()
  })

  it('changes status of the todo', () => {

    // Goes to the page to register
    cy.visit('http://localhost:5173/register')

    // Puts the information
    cy.get('input[name="email"]')
      .type('test2@test.ch')

    cy.get('input[name="password"]')
      .type('12345678')

    cy.get('input[name="confirmation"]')
      .type('12345678')

    // Sumbits the new user
    cy.get('button[type="submit"]').click();

    cy.visit('http://localhost:5173/login');

    // Login with credentials
    cy.get('input[name="email"]')
      .type('test2@test.ch')

    cy.get('input[name="password"]')
      .type('12345678')

    // Submits credentials and goes to the todo page
    cy.get('button[type="submit"]')
      .click()

    // Creating a todo
    cy.get('input[type="text"]')
      .type('my first todo')

    cy.get('button[type="submit"]')
      .click()

    // Changing the status
    cy.get('input[type="checkbox"]')
      .first()
      .click()
  })
})
