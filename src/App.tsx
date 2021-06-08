import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const App = () => {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "Olive oil", isDone: true},
        {id: v1(), title: "Canned tomatoes", isDone: true},
        {id: v1(), title: "Bathroom cleaner", isDone: false}
    ])

    const removeTask = (taskId: string) => {
        const tasks1 = tasks.filter(t => t.id !== taskId)
        setTasks(tasks1)
    }
    const addTask = (taskTitle: string) => {
        const task = {id: v1(), title: taskTitle, isDone: false}
        const newTasks = [task, ...tasks]
        setTasks(newTasks)
    }
    const changeTasksStatus = (taskId: string, newIsDone: boolean) => {
        const task = tasks.find(t => t.id === taskId)
        if(task) {
            task.isDone = newIsDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <ToDoList
                title="Shopping List"
                tasks={tasks}
                removeTask={removeTask}
                addTask={addTask}
                changeTasksStatus={changeTasksStatus}
            />
        </div>
    );
}