import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type ToDoListType = {
    id: string
    title: string
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

export const App = () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todolists, setTodolists] = useState<ToDoListType[]>([
        {id: todolistId1, title: "Shopping List"},
        {id: todolistId2, title: "Things To Do"}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
            [todolistId1]: [
                {id: v1(), title: "Olive oil", isDone: true},
                {id: v1(), title: "Canned tomatoes", isDone: true},
                {id: v1(), title: "Bathroom cleaner", isDone: false}
            ],
            [todolistId2]: [
                {id: v1(), title: "Blog post", isDone: true},
                {id: v1(), title: "Edit video", isDone: true},
                {id: v1(), title: "Go to swim", isDone: false}
            ]
        }
    )

    const removeTask = (taskId: string, todolistId: string) => {
        const todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }
    const addTask = (taskTitle: string, todolistId: string) => {
        const task = {id: v1(), title: taskTitle, isDone: false}
        const todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }
    const changeTasksStatus = (taskId: string, newIsDone: boolean, todolistId: string) => {
        const todolistTasks = tasks[todolistId]
        const task = todolistTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = newIsDone
            setTasks({...tasks})
        }
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        const todolistTasks = tasks[todolistId]
        const task = todolistTasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist = {id: newTodolistId, title}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }
    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        const todolist = todolists.find(t => t.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(t => {
                    const tasksForTodolist = tasks[t.id]
                    return <ToDoList
                        key={t.id}
                        id={t.id}
                        title={t.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTasksStatus={changeTasksStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }
        </div>
    );
}