import React, {ChangeEvent} from "react";
import {TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";


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

    const addTask = (title: string) => props.addTask(title, props.id)

    const removeTodolist = () => props.removeTodolist(props.id)

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
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