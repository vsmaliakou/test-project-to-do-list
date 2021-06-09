import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../Common/EditableSpan";
import {TaskStatuses, TaskType} from "./task-api";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTasksStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
}

export const Task: React.FC<TaskPropsType> = (props) => {
    const removeTask = () => props.removeTask(props.task.id, props.todolistId)
    const changeTasksStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTasksStatus(props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    const changeTaskTitle = useCallback((newTitle: string) => props.changeTaskTitle(props.task.id, newTitle, props.todolistId), [props.task.id, props.changeTaskTitle, props.todolistId])

    return <div className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
        <input
            type="checkbox"
            checked={props.task.status === TaskStatuses.Completed}
            onChange={changeTasksStatus}
        />
        <EditableSpan title={props.task.title} onChange={changeTaskTitle}/>
        <button onClick={removeTask}>X</button>
    </div>
}