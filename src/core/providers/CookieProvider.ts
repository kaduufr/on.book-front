import {GetServerSidePropsContext, NextPageContext} from "next";
import {setCookie as setNookies, destroyCookie as destroyNookies, parseCookies} from "nookies";

type SetCookieType = {
  cookieName: string;
  value: string;
  expires?: number;
  path?: string;
  ctx?: Pick<NextPageContext, 'res'>
}

type GetCookieType = {
  cookieName: string;
  ctx?: GetServerSidePropsContext | null
}

type DestroyCookieType = {
  cookieName: string;
  ctx?: GetServerSidePropsContext | null
  path?: string;
}

export default class CookieProvider {
  static setCookie = (data: SetCookieType) => {
    const {cookieName, ctx, path, value, expires} = data

    setNookies(ctx, cookieName, value, {
      expires: expires,
      path: path ?? '/'
    })
  }

  static getCookie = (data: GetCookieType) => {
    const {cookieName, ctx} = data

    const cookies = parseCookies(ctx)
    return cookies[cookieName]

  }

  static destroyCookie = (data: DestroyCookieType) => {
    const {cookieName, ctx, path} = data

    destroyNookies(ctx, cookieName, {
      path: path ?? '/'
    })
  }
}
