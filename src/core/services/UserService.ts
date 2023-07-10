import OnBookApi from '@http/OnBookApi'
import LoginFactory, { ILoginFactory } from '@factories/LoginFactory'

export type FormLoginType = {
  email: string
  password: string
}

export default class UserService {
  static login(data: FormLoginType): Promise<ILoginFactory> {
    return OnBookApi.post('/users/login', {
      user: data,
    }).then((response) => LoginFactory.builder(response.data))
  }
}
