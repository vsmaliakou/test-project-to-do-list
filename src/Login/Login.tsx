import React, {ChangeEvent, useState} from 'react'
import s from './Login.module.css'
import {useDispatch, useSelector} from "react-redux";
import { Redirect } from 'react-router-dom';
import {loginTC} from "../App/app-reducer";
import {AppRootStateType} from "../store";

export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)

    const dispatch = useDispatch()

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const onSubmit = () => {
        dispatch(loginTC(email, password, true))
    }

    if(isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return (
        <div className={s.loginPage}>
            <p>Use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
            <input type="text" onChange={onChangeEmail}/>
            <input type="password" onChange={onChangePassword}/>
            <button onClick={onSubmit}>Login</button>
        </div>
    )
}