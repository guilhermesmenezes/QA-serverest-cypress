import UsersService from '../../services/UsersService'

describe('API | Users (/usuarios)', () => {
  let userId, userEmail

  before(() => {
    userEmail = `api_user_${Date.now()}@test.com`
  })

  after(() => {
    if (userId) UsersService.delete(userId)
  })

  context('POST /usuarios', () => {
    it('should create a user successfully (201)', () => {
      UsersService.create({
        nome: 'API Test User',
        email: userEmail,
        password: 'test@123',
        administrador: 'true',
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
        expect(response.body._id).to.be.a('string').and.not.be.empty
        userId = response.body._id
      })
    })

    it('should return 400 when registering an already existing email', () => {
      UsersService.create({
        nome: 'Duplicate User',
        email: userEmail,
        password: 'test@123',
        administrador: 'false',
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('message', 'Este email já está sendo usado')
      })
    })

    it('should return 400 when sending empty body', () => {
      UsersService.create({}).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('nome', 'nome é obrigatório')
        expect(response.body).to.have.property('email', 'email é obrigatório')
        expect(response.body).to.have.property('password', 'password é obrigatório')
        expect(response.body).to.have.property('administrador', 'administrador é obrigatório')
      })
    })
  })

  context('GET /usuarios', () => {
    it('should list users with correct structure (200)', () => {
      UsersService.list().then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.quantidade).to.be.a('number').and.be.gte(1)
        expect(response.body.usuarios).to.be.an('array')
        expect(response.body.usuarios[0]).to.have.all.keys(
          '_id',
          'nome',
          'email',
          'password',
          'administrador'
        )
      })
    })

    it('should return user by ID (200)', () => {
      expect(userId, 'userId must be defined — POST test must run first').to.be.a('string')

      UsersService.getById(userId).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.all.keys(
          '_id',
          'nome',
          'email',
          'password',
          'administrador'
        )
        expect(response.body._id).to.eq(userId)
        expect(response.body.email).to.eq(userEmail)
        expect(response.body.administrador).to.eq('true')
      })
    })

    it('should return 400 for non-existing ID', () => {
      UsersService.getById('nonexistingid123').then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('message', 'Usuário não encontrado')
      })
    })
  })

  context('PUT /usuarios/:id', () => {
    it('should update user and confirm change with GET (200)', () => {
      expect(userId, 'userId must be defined — POST test must run first').to.be.a('string')

      const updatedData = {
        nome: `Updated User ${Date.now()}`,
        email: `updated_${Date.now()}@test.com`,
        password: 'newpassword@123',
        administrador: 'false',
      }

      UsersService.update(userId, updatedData).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso')

        UsersService.getById(userId).then((getResponse) => {
          expect(getResponse.body.nome).to.eq(updatedData.nome)
          expect(getResponse.body.email).to.eq(updatedData.email)
          expect(getResponse.body.administrador).to.eq(updatedData.administrador)
        })
      })
    })
  })

  context('DELETE /usuarios/:id', () => {
    it('should delete the user and confirm removal with GET (200)', () => {
      expect(userId, 'userId must be defined — POST test must run first').to.be.a('string')

      UsersService.delete(userId).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('message', 'Registro excluído com sucesso')
      })

      UsersService.getById(userId).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('message', 'Usuário não encontrado')
        userId = null
      })
    })
  })
})
