import { useAppDispatch, useAppSelector } from '@redux/hooks'
import {useEffect, useState} from 'react'
import CookieProvider from '@providers/CookieProvider'
import { COOKIE_APP } from '@data/constants'
import { useRouter } from 'next/router'
import UserProvider from '@providers/UserProvider'
import routes from '@data/routes'
import { decodeToken } from '@helpers/decodeToken'
import {logoff, setUser} from '@features/userSlice'
import { RootState } from '@redux/store'
import { createSelector } from '@reduxjs/toolkit'

const selectUserLogged = (state: RootState) => state.user
const userSelector = createSelector(selectUserLogged, (user) => user)

export default function useUserLogged() {
  const { type, name } = useAppSelector(userSelector)
  const token = CookieProvider.getCookie({ cookieName: COOKIE_APP, ctx: null })
  const [isLogged, setIsLogged] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const { push } = useRouter()

  useEffect(() => {
    if (!token) {
      UserProvider.logout()
      push(routes.login).then(() => {
        setIsLogged(false)
      })
      return
    }

    if (name && type) {
      setIsLogged(true)
      return
    }

    const tokenDecoded = decodeToken(token)

    dispatch(
      setUser({
        name: tokenDecoded.name,
        type: tokenDecoded.role,
      })
    )

    setIsLogged(true)
  }, [])

  return {
    isLogged,
    name,
    logoff: () => dispatch(logoff())
  }
}
