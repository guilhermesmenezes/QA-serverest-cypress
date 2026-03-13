const apiUrl = () => Cypress.env('apiUrl')

const UsersService = {
  create(user) {
    return cy.request({
      method: 'POST',
      url: `${apiUrl()}/usuarios`,
      body: user,
      failOnStatusCode: false,
    })
  },

  list() {
    return cy.request({
      method: 'GET',
      url: `${apiUrl()}/usuarios`,
      failOnStatusCode: false,
    })
  },

  getById(id) {
    return cy.request({
      method: 'GET',
      url: `${apiUrl()}/usuarios/${id}`,
      failOnStatusCode: false,
    })
  },

  update(id, user) {
    return cy.request({
      method: 'PUT',
      url: `${apiUrl()}/usuarios/${id}`,
      body: user,
      failOnStatusCode: false,
    })
  },

  delete(id) {
    return cy.request({
      method: 'DELETE',
      url: `${apiUrl()}/usuarios/${id}`,
      failOnStatusCode: false,
    })
  },
}

export default UsersService