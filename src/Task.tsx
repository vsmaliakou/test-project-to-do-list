import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./App";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTasksStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
}

export const Task: React.FC<TaskPropsType> = (props) => {
    const removeTask = () => props.removeTask(props.task.id, props.todolistId)
    const changeTasksStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTasksStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    const changeTaskTitle = useCallback((newTitle: string) => props.changeTaskTitle(props.task.id, newTitle, props.todolistId), [props.task.id, props.changeTaskTitle, props.todolistId])

    return <li className={props.task.isDone ? "is-done" : ""}>
        <input
            type="checkbox"
            checked={props.task.isDone}
            onChange={changeTasksStatus}
        />
        <EditableSpan title={props.task.title} onChange={changeTaskTitle}/>
        <button onClick={removeTask}>X</button>
    </li>
}