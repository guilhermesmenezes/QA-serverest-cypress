import RegisterPage from '../../pages/RegisterPage'

describe('Frontend | User Registration', () => {
  context('Registration with valid data', () => {
    it('should register a new user, show success message and redirect to home', () => {
      const timestamp = Date.now()

      RegisterPage.register({
        name: `Test User ${timestamp}`,
        email: `user_${timestamp}@test.com`,
        password: 'Password@123',
      })
      
      cy.contains('Cadastro realizado com sucesso').should('be.visible')
      cy.url().should('include', '/home')
    })
  })

  context('Registration with invalid data', () => {
    it('should display error when registering an already existing email', () => {
      RegisterPage.register({
        name: 'Duplicate User',
        email: Cypress.env('adminEmail'),
        password: 'anypassword',
      })

      cy.contains('Este email já está sendo usado').should('be.visible')
    })

    it('should display validation messages when required fields are empty', () => {
      RegisterPage.visit()
      RegisterPage.submit()

      cy.contains('Nome é obrigatório').should('be.visible')
      cy.contains('Email é obrigatório').should('be.visible')
      cy.contains('Password é obrigatório').should('be.visible')
    })
  })
})
