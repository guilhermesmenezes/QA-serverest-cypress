export const MESSAGES = {
  // validations
  requiredName: 'Nome é obrigatório',
  requiredEmail: 'Email é obrigatório',
  requiredPassword: 'Password é obrigatório',
  requiredAdministrador: 'administrador é obrigatório',

  // users
  registerSuccess: 'Cadastro realizado com sucesso',
  duplicateEmail: 'Este email já está sendo usado',
  userNotFound: 'Usuário não encontrado',
  userDeleted: 'Registro excluído com sucesso',
  userUpdated: 'Registro alterado com sucesso',
  invalidCredentials: 'Email e/ou senha inválidos',

  // products
  productNotFound: 'Produto não encontrado',
  productDeleted: 'Registro excluído com sucesso',
  productUpdated: 'Registro alterado com sucesso',
  duplicateProduct: 'Já existe produto com esse nome',
  missingToken: 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais',
}

export const ROUTES = {
  login: '/login',
  register: '/cadastrarusuarios',
  home: '/home'
}