import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "./api.backend";
import { initializeLogin } from "../store/authSlice";

export const login = createAsyncThunk(
    "auth/login",
    async ({body}, {rejectWithValue, dispatch}) => {
        try {
            const response = await authApi.post("/login", body)
            dispatch(initializeLogin(response.token))
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const register = createAsyncThunk(
    "auth/register",
    async ({body}, {rejectWithValue}) => {
        try {
            await authApi.post("/register", body)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)