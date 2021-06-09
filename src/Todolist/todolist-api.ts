import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '15f7a0a9-64c3-4a6a-9f8f-a55a7d8541a6'
    }
})

export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists');
    }
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
