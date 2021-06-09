import {ToDoListType} from "../App/App";
import {todolistsAPI, TodolistType} from "./todolist-api";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../App/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<ToDoListType> = []

const slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        removeTodolistAC: (state, action: PayloadAction<{ todolistId: string }>) => {
            const index = state.findIndex(t => t.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state.unshift({...action.payload.todolist})
        },
        changeTodolistTitleAC: (state, action: PayloadAction<{ todolistId: string, newTitle: string }>) => {
            const index = state.findIndex(t => t.id === action.payload.todolistId)
            state[index].title = action.payload.newTitle
        },
        setTodolistsAC: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
            return action.payload.todolists
        }
    }
})
export const todolistsReducer = slice.reducer

export const {removeTodolistAC, addTodolistAC, changeTodolistTitleAC, setTodolistsAC} = slice.actions

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.getTodolists()
        .then(response => {
            dispatch(setTodolistsAC({todolists: response.data}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC({status: 'failed'}))
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.deleteTodolist(todolistId)
        .then(response => {
            dispatch(removeTodolistAC({todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC({status: 'failed'}))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTodolist(title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTodolistAC({todolist: response.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                dispatch(setAppErrorAC({error: 'Some error occurred'}))
                dispatch(setAppStatusAC({status: 'failed'}))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC({status: 'failed'}))
        })
}
export const changeTodolistTitleTC = (todolistId: string, newTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.updateTodolist(todolistId, newTitle)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC({todolistId, newTitle}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                dispatch(setAppErrorAC({error: 'Some error occurred'}))
                dispatch(setAppStatusAC({status: 'failed'}))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC({status: 'failed'}))
        })
}
