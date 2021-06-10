import React, {ChangeEvent, useState} from "react";
import s from './Search.module.css'
import {useSelector} from "react-redux";
import {selectAllTasks} from "./selectors";
import {AppRootStateType} from "../../store";

export const Search = () => {

    const allTasks = useSelector((state: AppRootStateType) => selectAllTasks(state))

    const [taskTitle, setTaskTitle] = useState('')
    const [display, setDisplay] = useState(false)

    const filteredTasks = allTasks.filter(at => {
        return at.title.toLowerCase().includes(taskTitle.toLowerCase())
    })

    const searchTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setDisplay(true)
    }

    return (
        <div className={s.searchContainer}>
            <input type={'text'}
                   placeholder='Search...'
                   onChange={searchTaskTitle}
                   onBlur={() => {taskTitle === "" && setDisplay(false)}}
            />
            {
                filteredTasks.map(ft => <div className={display ? `${s.search}` : `${s.searchNone}`}>{ft.title}</div>)
            }
        </div>
    )
}