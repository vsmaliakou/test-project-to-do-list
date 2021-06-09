import {tasksReducer} from './Task/tasks-reducer';
import {todolistsReducer} from './Todolist/todolists-reducer';
import {combineReducers} from 'redux';
import thunk from "redux-thunk";
import {appReducer} from "./App/app-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type AppRootStateType = ReturnType<typeof rootReducer>
