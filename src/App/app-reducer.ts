import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../Todolist/todolist-api";
import {Dispatch} from "redux";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
    isLoggedIn: false,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = action.payload.value
        },
        setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})
export const appReducer = slice.reducer

export const {setAppStatusAC, setAppErrorAC, setIsLoggedInAC, setAppInitializedAC} = slice.actions

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}));
                dispatch(setAppStatusAC({status: 'succeeded'}))
            }
        })
        .finally(() => {
            dispatch(setAppInitializedAC({isInitialized: true}));
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            }  else {
                dispatch(setAppErrorAC({error: 'Some error occurred'}))
                dispatch(setAppStatusAC({status: 'failed'}))
            }
        })
        .catch((error) => {
            dispatch(setAppErrorAC({error: error.message}))
            dispatch(setAppStatusAC({status: 'failed'}))
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                dispatch(setAppErrorAC({error: 'Some error occurred'}))
                dispatch(setAppStatusAC({status: 'failed'}))
            }
        })
        .catch((error) => {
            dispatch(setAppErrorAC({error: error.message}))
            dispatch(setAppStatusAC({status: 'failed'}))
        })
}