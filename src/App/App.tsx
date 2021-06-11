import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {TaskType} from "../Task/task-api";
import {initializeAppTC, RequestStatusType, setAppStatusAC} from "./app-reducer";
import {Loading} from "../Common/Loading/Loading";
import {Header} from '../Common/Header/Header';
import {TodolistList} from "../Todolist/TodolistList";
import {Login} from "../Login/Login";
import {Route, Switch} from 'react-router-dom';

export type ToDoListType = {
    id: string
    title: string
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

export const App = () => {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    })
    if (!isInitialized) {
        dispatch(setAppStatusAC({status: 'loading'}))
    }

    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route exact path={'/'} render={() => <TodolistList/>}/>
                <Route path={'/login'} render={() => <Login/>}/>
                <Route path={'*'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
            </Switch>
            {status === "loading" && <Loading/>}
            {error && <div className="app-error">{error}</div>}
        </div>
    )
}