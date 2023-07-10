import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

enum UserTypeEnum {
  user = 'user',
  admin = 'admin',
}

interface IUser {
  name: string
  type?: UserTypeEnum
}

const initialState: IUser = {
  name: '',
  type: undefined,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: Draft<IUser>, action: PayloadAction<IUser>) => {
      Object.assign(state, action.payload)
    }
  },
})

export const { setUser } = userSlice.actions

export default userSlice
