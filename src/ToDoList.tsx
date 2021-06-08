import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TaskType} from "./App";

type ToDoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    addTask: (taskTitle: string) => void
}


export const ToDoList: React.FC<ToDoListPropsType> = (props) => {

    const [taskTitle, setTaskTitle] = useState<string>("")

    const addTask = () => {
        props.addTask(taskTitle)
        setTaskTitle("")
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.charCode === 13 && addTask()

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>Add task</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                        const removeTask = () => props.removeTask(t.id)

                        return <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={removeTask}>X</button>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}