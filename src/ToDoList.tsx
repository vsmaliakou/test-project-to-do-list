import React from "react";
import {TaskType} from "./App";

type ToDoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
}

export const ToDoList: React.FC<ToDoListPropsType> = (props) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>Add task</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => {props.removeTask(t.id)}}>X</button>
                    </li>)
                }
            </ul>
        </div>
    )
}