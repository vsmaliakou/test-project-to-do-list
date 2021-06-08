import {TasksStateType} from "./App";
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

type TodolistActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTasksStatusAC>
    | ReturnType<typeof changeTasksTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TodolistActionType): TasksStateType => {
    switch (action.type) {
        case 'TEST/TASKS/REMOVE-TASK':{
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case 'TEST/TASK/ADD-TASK':{
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask = {id: v1(), title: action.taskTitle, isDone: false}
            stateCopy[action.todolistId] = [newTask, ...tasks]
            return stateCopy
        }
        case 'TEST/TASK/CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const task = tasks.map(t => t.id === action.taskId ? {...t, isDone: action.newIsDone} : t)
            stateCopy[action.todolistId] = task
            return stateCopy
        }
        case 'TEST/TASK/CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const task = tasks.map(t => t.id === action.taskId ? {...t, title: action.newTitle} : t)
            stateCopy[action.todolistId] = task
            // const task = tasks.find(t => t.id === action.taskId)
            // if (task) {
            //     task.title = action.newTitle
            // }
            return stateCopy
        }
        case 'TEST/TODOLIST/ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'TEST/TODOLIST/REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'TEST/TASKS/REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (taskTitle: string, todolistId: string) => ({type: 'TEST/TASK/ADD-TASK', taskTitle, todolistId} as const)
export const changeTasksStatusAC = (taskId: string, newIsDone: boolean, todolistId: string) => ({type: 'TEST/TASK/CHANGE-TASK-STATUS', taskId, newIsDone, todolistId} as const)
export const changeTasksTitleAC = (taskId: string, newTitle: string, todolistId: string) => ({type: 'TEST/TASK/CHANGE-TASK-TITLE', taskId, newTitle, todolistId} as const)