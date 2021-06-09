import {TasksStateType} from "../App/App";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "../Todolist/todolists-reducer";
import {Dispatch} from "redux";
import {tasksAPI, TaskType, UpdateTaskModelType} from "./task-api";
import {AppRootStateType} from "../store";
import {setAppErrorAC, setAppStatusAC} from "../App/app-reducer";

type TodolistActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>

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
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId]
            stateCopy[newTask.todoListId] = [newTask, ...tasks]
            return stateCopy
        }
        case 'TEST/TASK/UPDATE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            return stateCopy
        }
        case 'TEST/TODOLIST/ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'TEST/TODOLIST/REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        case 'TEST/TODOLIST/SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach(t => stateCopy[t.id] = [])
            return stateCopy
        }
        case 'TEST/TASK/SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'TEST/TASKS/REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'TEST/TASK/ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({type: 'TEST/TASK/UPDATE-TASK', taskId, model, todolistId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({type: 'TEST/TASK/SET-TASKS', tasks, todolistId} as const)

export const fetchTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.getTasks(todolistId)
        .then(response => {
            dispatch(setTasksAC(response.data.items, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC('failed'))
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.deleteTask(taskId, todolistId)
        .then(response => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC('failed'))
        })
}
export const addTaskTC = (taskTitle: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.createTask(taskTitle, todolistId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTaskAC(response.data.data.item))
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

export const updateTaskTC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if(!task){
        console.warn("task not found in the state")
        return
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline
    }

    dispatch(setAppStatusAC('loading'))
    tasksAPI.updateTask(taskId, apiModel, todolistId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(updateTaskAC(taskId, model, todolistId))
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

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
