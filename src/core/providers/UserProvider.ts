import UserService, { FormLoginType } from '@services/UserService'
import CookieProvider, { SetCookieType } from '@providers/CookieProvider'
import { COOKIE_APP } from '@data/constants'

export default class UserProvider {
  static async login(data: FormLoginType) {
    try {
      const response = await UserService.login(data)

      const cookieUser: SetCookieType = {
        cookieName: COOKIE_APP,
        value: response.token,
        ctx: null,
      }

      CookieProvider.setCookie(cookieUser)

      return 'Login com sucesso'
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  static async register(data: FormLoginType) {
    try {
      const response = await UserService.register(data)

      const cookieUser: SetCookieType = {
        cookieName: COOKIE_APP,
        value: response.token,
        ctx: null,
      }

      CookieProvider.setCookie(cookieUser)

      return 'Cadastro com sucesso'

    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  static logout() {
    CookieProvider.destroyCookie({ cookieName: COOKIE_APP, ctx: null })
  }
}
