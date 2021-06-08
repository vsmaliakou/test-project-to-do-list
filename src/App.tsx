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
        let tasks1 = tasks.filter(t => t.id !== taskId)
        setTasks(tasks1)
    }
    const addTask = (taskTitle: string) => {
        let task = {id: v1(), title: taskTitle, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <ToDoList
                title="Shopping List"
                tasks={tasks}
                removeTask={removeTask}
                addTask={addTask}
            />
        </div>
    );
}