import {ToDoListType} from "../App/App";
import {todolistsAPI, TodolistType} from "./todolist-api";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../App/app-reducer";

type TodolistActionType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof setTodolistsAC>

const initialState: Array<ToDoListType> = []

export const todolistsReducer = (state = initialState, action: TodolistActionType): Array<ToDoListType> => {
    switch (action.type) {
        case 'TEST/TODOLIST/REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todolistId)
        case 'TEST/TODOLIST/ADD-TODOLIST':
            return [action.todolist, ...state]
        case 'TEST/TODOLIST/CHANGE-TODOLIST-TITLE':
            const todolist = state.find(t => t.id === action.todolistId)
            if (todolist) {
                todolist.title = action.newTitle
            }
            return [ ...state]
        case 'TEST/TODOLIST/SET-TODOLISTS':
            return action.todolists
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => ({type: 'TEST/TODOLIST/REMOVE-TODOLIST', todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'TEST/TODOLIST/ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => ({type: 'TEST/TODOLIST/CHANGE-TODOLIST-TITLE', todolistId, newTitle} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'TEST/TODOLIST/SET-TODOLISTS', todolists} as const)

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then(response => {
            dispatch(setTodolistsAC(response.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC('failed'))
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then(response => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC('failed'))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTodolistAC(response.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                dispatch(setAppErrorAC('Some error occurred'))
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC('failed'))
        })
}
export const changeTodolistTitleTC = (todolistId: string, newTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTodolist(todolistId, newTitle)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, newTitle))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                dispatch(setAppErrorAC('Some error occurred'))
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC('failed'))
        })
}
