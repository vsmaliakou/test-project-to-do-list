import React, {useCallback, useEffect} from 'react'
import {Search} from "../Common/Search/Search";
import {AddItemForm} from "../Common/AddItemForm/AddItemForm";
import {ToDoList} from "./ToDoList";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../Task/tasks-reducer";
import {TaskStatuses} from "../Task/task-api";
import {addTodolistTC, changeTodolistTitleTC, fetchTodolistsTC, removeTodolistTC} from "./todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {TasksStateType, ToDoListType} from "../App/App";
import { Redirect } from 'react-router-dom';

export const TodolistList = () => {

    const todolists = useSelector<AppRootStateType, Array<ToDoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
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

    if(!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return (
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
    )
}