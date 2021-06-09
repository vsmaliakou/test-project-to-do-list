import {TasksStateType} from "../App/App";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "../Todolist/todolists-reducer";
import {Dispatch} from "redux";
import {tasksAPI, TaskType, UpdateTaskModelType} from "./task-api";
import {AppRootStateType} from "../store";
import {setAppErrorAC, setAppStatusAC} from "../App/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodolistType} from "../Todolist/todolist-api";

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTaskAC: (state, action: PayloadAction<{ taskId: string, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC: (state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC: (state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) => {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((t: TodolistType) => state[t.id] = [])
        })
    }
})
export const tasksReducer = slice.reducer

export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions

export const fetchTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksAPI.getTasks(todolistId)
        .then(response => {
            dispatch(setTasksAC({tasks: response.data.items, todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC({status: 'failed'}))
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksAPI.deleteTask(taskId, todolistId)
        .then(response => {
            dispatch(removeTaskAC({taskId, todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC({status: 'failed'}))
        })
}
export const addTaskTC = (taskTitle: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksAPI.createTask(taskTitle, todolistId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTaskAC({task: response.data.data.item}))
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
export const updateTaskTC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
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

    dispatch(setAppStatusAC({status: 'loading'}))
    tasksAPI.updateTask(taskId, apiModel, todolistId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(updateTaskAC({taskId, model, todolistId}))
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

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
