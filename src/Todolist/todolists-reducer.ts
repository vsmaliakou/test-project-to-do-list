import {ToDoListType} from "../App";
import {todolistsAPI, TodolistType} from "./todolist-api";
import {Dispatch} from "redux";

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
    todolistsAPI.getTodolists()
        .then(response => {
            dispatch(setTodolistsAC(response.data))
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(response => {
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then(response => {
            dispatch(addTodolistAC(response.data.data.item))
        })
}
export const changeTodolistTitleTC = (todolistId: string, newTitle: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(todolistId, newTitle)
        .then(response => {
            dispatch(changeTodolistTitleAC(todolistId, newTitle))
        })
}
