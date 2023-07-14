import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

export enum UserTypeEnum {
  user = 'user',
  admin = 'admin',
}

export interface IUser {
  name: string
  type?: UserTypeEnum
  email?: string
  document?: string
  id?: number
}

const initialState: IUser = {
  name: '',
  type: undefined,
  email: undefined,
  document: undefined,
  id: undefined,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: Draft<IUser>, action: PayloadAction<IUser>) => {
      Object.assign(state, action.payload)
    },
    logoff: (state: Draft<IUser>) => {
      Object.assign(state, initialState)
    }
  },
})

export const { setUser, logoff } = userSlice.actions

export default userSlice
