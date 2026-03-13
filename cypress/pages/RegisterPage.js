class RegisterPage {
  get nameInput()      { return cy.get('[data-testid="nome"]') }
  get emailInput()     { return cy.get('[data-testid="email"]') }
  get passwordInput()  { return cy.get('[data-testid="password"]') }
  get registerButton() { return cy.get('[data-testid="cadastrar"]') }

  visit() {
    cy.visit('/cadastrarusuarios')
  }

  fillForm({ name, email, password }) {
    this.nameInput.type(name)
    this.emailInput.type(email)
    this.passwordInput.type(password)
  }

  submit() {
    this.registerButton.click()
  }

  register(user) {
    this.visit()
    this.fillForm(user)
    this.submit()
  }

  goBack() {
    this.loginLink.click()  
  }
}

export default new RegisterPage()