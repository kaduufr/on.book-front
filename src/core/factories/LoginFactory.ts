type DataApi = {
  token: string
  message: string
}

export interface ILoginFactory {
  token: string
}

export default class LoginFactory {
  static builder(data: DataApi): ILoginFactory {
    return {
      token: data.token,
    }
  }
}
