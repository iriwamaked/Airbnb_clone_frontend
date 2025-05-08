import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../api";
import { endpoints } from "../../api/endpoints";
import axios from "axios";
import { parseJwt } from "@/utils/jwt";

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await api.post(endpoints.login, null, {
        params: {
          Email: username,
          Password: password
        },
        headers: {
          Accept: "text/plain",
        }
      });
      const token = response.data;
      const decoded = parseJwt(token);
      const userId = decoded?.sub;

      const userResponse = await api.get(endpoints.getUserById, {
        params: { id: userId },
        headers: { Accept: "text/plain" },
      });
      
      if (userResponse.status === 204 || !userResponse.data) {
        console.warn("⚠️ Пользователь не найден по id:", userId);
        return thunkAPI.rejectWithValue(" Пользователь не найден");
      }
      
      let user = userResponse.data;
      if (typeof user === "string") {
        try {
          user = JSON.parse(user);
        } catch (e) {
          console.error("❌ Не удалось распарсить userResponse как JSON:", user);
          throw e;
        }
      }



      
      return { token, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);
const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/Auth/Register", null, {
        params: {
          FullName: username,
          Email: username,
          Password: password,
          DateOfBirth: "12.12.1212", // временно хардкодим
          Roles: "user",             // можно строкой, если сервер не ожидает массив
        },
        headers: {
          Accept: "text/plain",
        },
      });
      return response.data;
    } catch (err) {
      console.error("Регистрация: ошибка", err.response || err.message);
      return rejectWithValue(err.response?.data?.message || "Ошибка регистрации");
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export { registerUser };
export default authSlice.reducer;
