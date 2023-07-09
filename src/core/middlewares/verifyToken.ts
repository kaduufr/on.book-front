import { GetServerSidePropsContext } from 'next'
import CookieProvider from '@providers/CookieProvider'
import { COOKIE_APP } from '@data/constants'
import routes from '@data/routes'

export const verifyToken = (ctx: GetServerSidePropsContext) => {
  const token = CookieProvider.getCookie({ cookieName: COOKIE_APP, ctx })

  if (!token) {
    return {
      redirect: {
        destination: routes.login,
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}
