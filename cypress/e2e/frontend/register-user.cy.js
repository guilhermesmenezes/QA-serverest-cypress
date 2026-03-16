import RegisterPage from '../../pages/RegisterPage'
import { MESSAGES, ROUTES } from '../../support/constants'

describe('Frontend | User Registration', () => {
  context('Registration with valid data', () => {
    it('should register a new user, show success message and redirect to home', () => {
      const timestamp = Date.now()

      RegisterPage.register({
        name: `Test User ${timestamp}`,
        email: `user_${timestamp}@test.com`,
        password: 'Password@123',
      })
      
      cy.contains(MESSAGES.registerSuccess).should('be.visible')
      cy.url().should('include', ROUTES.home)
    })
  })

  context('Registration with invalid data', () => {
    it('should display error when registering an already existing email', () => {
      RegisterPage.register({
        name: 'Duplicate User',
        email: Cypress.env('adminEmail'),
        password: 'anypassword',
      })

      cy.contains(MESSAGES.duplicateEmail).should('be.visible')
    })

    it('should display validation messages when required fields are empty', () => {
      RegisterPage.visit()
      RegisterPage.submit()

      cy.contains(MESSAGES.requiredName).should('be.visible')
      cy.contains(MESSAGES.requiredEmail).should('be.visible')
      cy.contains(MESSAGES.requiredPassword).should('be.visible')
    })
  })
})
