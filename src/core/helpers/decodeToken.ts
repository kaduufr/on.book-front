import JWT from 'jsonwebtoken'

type TokenDecoded = {
  role: string
  name: string
  document: string
  exp: number
}

export function decodeToken(token): TokenDecoded {
  return <TokenDecoded>JWT.decode(token)
}
