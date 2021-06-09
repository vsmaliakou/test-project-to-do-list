import React, {useCallback, useEffect} from 'react';
import './App.css';
import {ToDoList} from "./Todolist/ToDoList";
import {AddItemForm} from "./Common/AddItemForm";
import {
    addTodolistAC,
    changeTodolistTitleAC,
    fetchTodolistsTC,
    removeTodolistAC
} from "./Todolist/todolists-reducer";
import {addTaskAC, changeTasksStatusAC, changeTasksTitleAC, removeTaskAC} from "./Task/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {TaskType} from "./Task/task-api";

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

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }, [])
    const addTask = useCallback((taskTitle: string, todolistId: string) => {
        dispatch(addTaskAC(taskTitle, todolistId))
    }, [])
    const changeTasksStatus = useCallback((taskId: string, newIsDone: boolean, todolistId: string) => {
        dispatch(changeTasksStatusAC(taskId, newIsDone, todolistId))
    }, [])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTasksTitleAC(taskId, newTitle, todolistId))
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [])
    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }, [])

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
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
    )
}