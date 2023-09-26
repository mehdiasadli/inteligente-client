import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, USER_ROLE } from '../../lib/types';

interface UserStoreState {
  user: User | null;
  id: string | null;
  role: USER_ROLE | null;
}

const initialState: UserStoreState = {
  user: null,
  id: null,
  role: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      const data = action.payload;
      const { token, _id, role } = data;

      localStorage.setItem('access_token', token);

      state.user = data;
      state.role = role;
      state.id = _id;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const data = action.payload;

      state.user = data;
    },
    logoutUser: (state) => {
      localStorage.removeItem('access_token');

      state.user = null;
      state.role = null;
      state.id = null;
    },
  },
});

export const { loginUser, logoutUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
