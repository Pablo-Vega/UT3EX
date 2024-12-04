import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  nombreUsuario: string;
  rol: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  nombreUsuario: '',
  rol: '',
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'authenticator',
  initialState,
  reducers: {
    login(state, action) {
      state.nombreUsuario = action.payload.nombreUsuario;
      state.rol = action.payload.rol;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.nombreUsuario = '';
      state.rol = '';
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;