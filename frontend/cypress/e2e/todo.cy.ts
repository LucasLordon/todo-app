describe('TODO', () => {
  it('should create a new todo', () => {
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

    cy.get('input[type="text"]')
      .type('my first todo')

    cy.get('button[type="submit"]')
      .click()
  })

  it('changes status of the todo', () => {
    cy.visit('http://localhost:5173/register')
    cy.get('input[name="email"]')
      .type('test2@test.ch')

    cy.get('input[name="password"]')
      .type('12345678')

    cy.get('input[name="confirmation"]')
      .type('12345678')


    cy.get('button[type="submit"]').click();

    cy.visit('http://localhost:5173/login');
    cy.get('input[name="email"]')
      .type('test2@test.ch')

    cy.get('input[name="password"]')
      .type('12345678')

    cy.get('button[type="submit"]')
      .click()

    cy.get('input[type="text"]')
      .type('my first todo')

    cy.get('button[type="submit"]')
      .click()

    cy.get('input[type="checkbox"]')
      .first()
      .click()
  })
})
