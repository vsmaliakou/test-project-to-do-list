import React from 'react';
import s from './Header.module.css'
import {useDispatch} from "react-redux";
import {logoutTC} from "../../App/app-reducer";

export const Header = () => {

    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logoutTC())
    }

    return (
        <div className={s.header}>
            <span>To-do List</span>
            <button onClick={logout}>Logout</button>
        </div>
    )
}
