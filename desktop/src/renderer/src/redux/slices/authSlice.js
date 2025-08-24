import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosInstance.js";
import { SERVICES } from "../../api/services.js";

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async ({ formdata }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${SERVICES.AUTH}/admin/login`, formdata);
      console.log("Login Response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

const initialState = {
  admin: localStorage.getItem("admin")|| null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("admin");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.user;
        state.token = action.payload.token;

        // Save to localStorage
        localStorage.setItem("admin", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;


export const selectIsAuthenticated = (state) => !!state.auth.token;


export const selectAdmin = (state) => state.auth.admin;

