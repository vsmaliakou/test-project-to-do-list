import {AppRootStateType} from "../../store";
import {TaskType} from "../../Task/task-api";

function hasOwnProperty<X extends {}, Y extends PropertyKey>
(obj: X, prop: Y): obj is X & Record<Y, unknown> {
    return obj.hasOwnProperty(prop)
}

export const selectAllTasks = (state: AppRootStateType): TaskType[] => {
    let res: TaskType[] = [];
    Object.keys(state.tasks).forEach((key: string) => {
        if (hasOwnProperty(state.tasks, key)) {
            let tsks = state.tasks[key] as TaskType[];
            res = [...res, ...tsks]
        }
    })
    return res;
}