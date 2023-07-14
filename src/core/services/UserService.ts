import OnBookApi from '@http/OnBookApi'
import LoginFactory, { ILoginFactory } from '@factories/LoginFactory'

export type FormLoginType = {
  email: string
  password: string
}

export type FormRegisterType = {
  email: string
  password: string
  name: string
  document: string
}

export default class UserService {
  static login(data: FormLoginType): Promise<ILoginFactory> {
    return OnBookApi.post('/users/login', {
      user: data,
    }).then((response) => LoginFactory.builder(response.data))
  }

  static register(data: FormRegisterType): Promise<ILoginFactory> {
    return OnBookApi.post('/users/signup', {
      user: data,
    }).then((response) => LoginFactory.builder(response.data))
  }

  static getBooksBorrowed() {
    return OnBookApi.get('/livros-emprestados')
  }
}
