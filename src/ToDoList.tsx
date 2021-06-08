import React, {ChangeEvent} from "react";
import {TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


type ToDoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    addTask: (taskTitle: string, todolistId: string) => void
    changeTasksStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}


export const ToDoList: React.FC<ToDoListPropsType> = (props) => {

    const addTask = (title: string) => props.addTask(title, props.id)
    const removeTodolist = () => props.removeTodolist(props.id)
    const changeTodolistTitle = (newTitle: string) => props.changeTodolistTitle(props.id, newTitle)

    return (
        <div>
            <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <button onClick={removeTodolist}>X</button>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {

                        const removeTask = () => props.removeTask(t.id, props.id)
                        const changeTasksStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTasksStatus(t.id, e.currentTarget.checked, props.id)
                        const changeTaskTitle = (newTitle: string) => props.changeTaskTitle(t.id, newTitle, props.id)

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={changeTasksStatus}
                            />
                            <EditableSpan title={t.title} onChange={changeTaskTitle}/>
                            <button onClick={removeTask}>X</button>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}