import JWT from 'jsonwebtoken'
import {UserTypeEnum} from "@features/userSlice";

type TokenDecoded = {
  role: UserTypeEnum
  name: string
  document: string
  exp: number
  id: number
  email: string
}

export function decodeToken(token): TokenDecoded {
  return <TokenDecoded>JWT.decode(token)
}
