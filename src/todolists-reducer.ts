import {ToDoListType} from "./App";
import {v1} from "uuid";

type TodolistActionType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>

const initialState: Array<ToDoListType> = []

export const todolistsReducer = (state = initialState, action: TodolistActionType): Array<ToDoListType> => {
    switch (action.type) {
        case 'TEST/TODOLIST/REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.todolistId)
        case 'TEST/TODOLIST/ADD-TODOLIST':
            return [{
                id: action.todolistId,
                title: action.title
            }, ...state]
        case 'TEST/TODOLIST/CHANGE-TODOLIST-TITLE':
            const todolist = state.find(t => t.id === action.todolistId)
            if (todolist) {
                todolist.title = action.newTitle
            }
            return [ ...state]
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => ({type: 'TEST/TODOLIST/REMOVE-TODOLIST', todolistId} as const)
export const addTodolistAC = (title: string) => ({type: 'TEST/TODOLIST/ADD-TODOLIST', title, todolistId: v1()} as const)
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => ({type: 'TEST/TODOLIST/CHANGE-TODOLIST-TITLE', todolistId, newTitle} as const)