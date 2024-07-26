import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        id: 0,
        exp: 0,
        sub: null,
        isLogged: false,
        roles: [],
        isLoading: false,
        error: null
    },
    reducers: {
        initializeLogin: (state, {payload}) => {
            if (payload) {
                const decodedToken = jwtDecode(payload)
                state.token = payload
                localStorage.setItem("user_token", payload)
                state.id = decodedToken?.id
                state.exp = decodedToken?.exp
                state.sub = decodedToken?.sub
                state.isLogged = decodedToken.exp > new Date().getTime() / 1000
                state.roles = decodedToken?.roles.split(",")
            }
        },
        logout: (state) => {
            console.log("on logout")
            localStorage.removeItem("user_token")
            state.token = null
            state.id = 0
            state.exp = 0
            state.sub = null
            state.isLogged = false
        },
        unsetError: ({error}) => {
            error = null
        }

    },
    extraReducers: ({addMatcher}) => {
        addMatcher(({type}) => (type.endsWith('/fulfilled') && type.startsWith("auth")), (state) => {
            state.isLoading = false
            state.error = null
        })
        addMatcher(({type}) => (type.endsWith('/pending') && type.startsWith("auth")), (state) => {
            state.isLoading = true
        })
        addMatcher(({type}) => (type.endsWith('/rejected') && type.startsWith("auth")), (state, action) => {
            console.error(action.payload)
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export const {
    initializeLogin,
    logout,
    unsetError,
} = authSlice.actions

export default authSlice.reducer