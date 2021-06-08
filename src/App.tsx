import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const App = () => {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "Olive oil", isDone: true},
        {id: 2, title: "Canned tomatoes", isDone: true},
        {id: 3, title: "Bathroom cleaner", isDone: false}
    ])

    const removeTask = (taskId: number) => {
        let tasks1 = tasks.filter(t => t.id !== taskId)
        setTasks(tasks1)
    }

    return (
        <div className="App">
            <ToDoList
                title="Shopping List"
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    );
}