import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "../Todolist/todolists-reducer";
import {Dispatch} from "redux";
import {TaskPriorities, tasksAPI, TaskStatuses} from "./task-api";
import {TaskType} from "./task-api";

type TodolistActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTasksStatusAC>
    | ReturnType<typeof changeTasksTitleAC>
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
            const tasks = stateCopy[action.todolistId]
            const newTask: TaskType = {
                id: v1(),
                title: "new task",
                status: TaskStatuses.New,
                todoListId: action.todolistId, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
            stateCopy[action.todolistId] = [newTask, ...tasks]
            return stateCopy
        }
        case 'TEST/TASK/CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, isDone: action.newIsDone} : t)
            return stateCopy
        }
        case 'TEST/TASK/CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, title: action.newTitle} : t)
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
export const addTaskAC = (taskTitle: string, todolistId: string) => ({type: 'TEST/TASK/ADD-TASK', taskTitle, todolistId} as const)
export const changeTasksStatusAC = (taskId: string, newIsDone: boolean, todolistId: string) => ({type: 'TEST/TASK/CHANGE-TASK-STATUS', taskId, newIsDone, todolistId} as const)
export const changeTasksTitleAC = (taskId: string, newTitle: string, todolistId: string) => ({type: 'TEST/TASK/CHANGE-TASK-TITLE', taskId, newTitle, todolistId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({type: 'TEST/TASK/SET-TASKS', tasks, todolistId} as const)

export const fetchTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then(response => {
            dispatch(setTasksAC(response.data.items, todolistId))
        })
}