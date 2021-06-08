import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TaskType} from "./App";


type ToDoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    addTask: (taskTitle: string, todolistId: string) => void
    changeTasksStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}


export const ToDoList: React.FC<ToDoListPropsType> = (props) => {

    const [taskTitle, setTaskTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const removeTodolist = () => props.removeTodolist(props.id)
    const addTask = () => {
        if (taskTitle.trim() !== "") {
            props.addTask(taskTitle, props.id)
            setTaskTitle("")
        } else {
            setError("Title is required")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        e.charCode === 13 && addTask()
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={removeTodolist}>X</button>
            <div>
                <input
                    value={taskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>Add task</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const removeTask = () => props.removeTask(t.id, props.id)
                        const changeTasksStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTasksStatus(t.id, e.currentTarget.checked, props.id)

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={changeTasksStatus}
                            />
                            <span>{t.title}</span>
                            <button onClick={removeTask}>X</button>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}