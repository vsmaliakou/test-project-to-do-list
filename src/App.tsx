import React from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";

export const App = () => {

    const tasks1 = [
        {id: 1, title: "Olive oil", isDone: true},
        {id: 2, title: "Canned tomatoes", isDone: true},
        {id: 3, title: "Bathroom cleaner", isDone: false}
    ]
    const tasks2 = [
        {id: 1, title: "Blog post", isDone: true},
        {id: 2, title: "Edit video", isDone: false},
        {id: 3, title: "Go to swim", isDone: true}
    ]

    return (
        <div className="App">
            <ToDoList title="Shopping List" tasks={tasks1}/>
            <ToDoList title="Things to do" tasks={tasks2}/>
        </div>
    );
}