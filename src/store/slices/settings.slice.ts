import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsStoreState {
  scheme: 'dark' | 'light';
  primaryColor: string;
}

const initialState: SettingsStoreState = {
  scheme: 'light',
  primaryColor: 'green',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleScheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.scheme = action.payload;
    },
    changePrimary: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload;
    },
  },
});

export const { toggleScheme , changePrimary} = settingsSlice.actions;
export default settingsSlice.reducer;
