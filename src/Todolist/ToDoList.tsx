import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../Common/AddItemForm";
import {EditableSpan} from "../Common/EditableSpan";
import {Task} from "../Task/Task";
import {useDispatch} from "react-redux";
import {fetchTaskTC} from "../Task/tasks-reducer";
import {TaskStatuses, TaskType} from "../Task/task-api";


type ToDoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    addTask: (taskTitle: string, todolistId: string) => void
    changeTasksStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}


export const ToDoList: React.FC<ToDoListPropsType> = React.memo((props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTaskTC(props.id))
    }, [])

    const addTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id])
    const removeTodolist = () => props.removeTodolist(props.id)
    const changeTodolistTitle = useCallback((newTitle: string) => props.changeTodolistTitle(props.id, newTitle), [props.changeTodolistTitle, props.id])

    return (
        <div>
            <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <button onClick={removeTodolist}>X</button>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => <Task
                            key={t.id}
                            task={t}
                            todolistId={props.id}
                            removeTask={props.removeTask}
                            changeTasksStatus={props.changeTasksStatus}
                            changeTaskTitle={props.changeTaskTitle}
                        />
                    )
                }
            </ul>
        </div>
    )
})