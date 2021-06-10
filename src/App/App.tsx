import React, {useCallback, useEffect} from 'react';
import './App.css';
import {ToDoList} from "../Todolist/ToDoList";
import {AddItemForm} from "../Common/AddItemForm/AddItemForm";
import {
    addTodolistTC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    removeTodolistTC
} from "../Todolist/todolists-reducer";
import {
    removeTaskTC,
    addTaskTC, updateTaskTC
} from "../Task/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {TaskStatuses, TaskType} from "../Task/task-api";
import {RequestStatusType} from "./app-reducer";
import {Loading} from "../Common/Loading/Loading";
import {Search} from "../Common/Search/Search";
import { Header } from '../Common/Header/Header';

export type ToDoListType = {
    id: string
    title: string
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

export const App = () => {

    const todolists = useSelector<AppRootStateType, Array<ToDoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskTC(taskId, todolistId))
    }, [])
    const addTask = useCallback((taskTitle: string, todolistId: string) => {
        dispatch(addTaskTC(taskTitle, todolistId))
    }, [])
    const changeTasksStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {status}, todolistId))
    }, [])
    const changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {title}, todolistId))
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])
    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(todolistId, newTitle))
    }, [])

    return (
        <div className="App">
            <Header/>
            <div className="app-container">
                <Search/>
                <div className="app-content">
                    <AddItemForm addItem={addTodolist} placeholder="To-do list title"/>
                    <div className="app-todolists">
                        {
                            todolists.map(t => {
                                const tasksForTodolist = tasks[t.id]
                                return <ToDoList
                                    key={t.id}
                                    id={t.id}
                                    title={t.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    addTask={addTask}
                                    changeTasksStatus={changeTasksStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
            {status === "loading" && <Loading/>}
            {error && <div className="app-error">{error}</div>}
        </div>
    )
}