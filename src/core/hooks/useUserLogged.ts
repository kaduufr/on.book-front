import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { useEffect, useState } from 'react'
import CookieProvider from '@providers/CookieProvider'
import { COOKIE_APP } from '@data/constants'
import { decodeToken } from '@helpers/decodeToken'
import { IUser, logoff, setUser, UserTypeEnum } from '@features/userSlice'
import { RootState } from '@redux/store'
import { createSelector } from '@reduxjs/toolkit'

const selectUserLogged = (state: RootState) => state.user
const userSelector = createSelector(selectUserLogged, (user: IUser) => user)

export default function useUserLogged() {
  const { type, name, email, document, id } = useAppSelector(userSelector)
  const token = CookieProvider.getCookie({ cookieName: COOKIE_APP, ctx: null })
  const [isLogged, setIsLogged] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (name && type) {
      setIsLogged(true)
      return
    }

    if (token) {
      const tokenDecoded = decodeToken(token)

      dispatch(
        setUser({
          name: tokenDecoded.name,
          type: tokenDecoded.role,
          email: tokenDecoded.email,
          document: tokenDecoded.document,
          id: tokenDecoded.id,
        })
      )

      setIsLogged(true)
      return
    }

    setIsLogged(false)
  }, [name, token, type])

  return {
    isLogged,
    name,
    type,
    email,
    document,
    user_id: id,
    isAdmin: type === UserTypeEnum.admin,
    logoff: () => dispatch(logoff()),
  }
}
