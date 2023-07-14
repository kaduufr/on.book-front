import { GetServerSidePropsContext } from 'next'
import CookieProvider from '@providers/CookieProvider'
import { COOKIE_APP } from '@data/constants'
import routes from '@data/routes'
import { decodeToken } from '@helpers/decodeToken'
import { UserTypeEnum } from '@features/userSlice'

export const verifyTokenAdmin = (ctx: GetServerSidePropsContext) => {
  const token = CookieProvider.getCookie({ cookieName: COOKIE_APP, ctx })
  const decodedToken = decodeToken(token)
  const isAdmin = decodedToken?.role === UserTypeEnum.admin

  if (!token) {
    return {
      redirect: {
        destination: routes.login,
        permanent: false,
      },
    }
  }
  if (!isAdmin) {
    return {
      redirect: {
        destination: routes.home,
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}
