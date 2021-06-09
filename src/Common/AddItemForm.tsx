import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo((props) => {

    const [taskTitle, setTaskTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (taskTitle.trim() !== "") {
            if(taskTitle.length < 20) {
                props.addItem(taskTitle)
                setTaskTitle("")
            } else {
                setError("No more than 20 characters")
            }
        } else {
            setError("Title is required")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addTask()
        }
    }

    return (
        <div>
            <input
                value={taskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addTask}>Add</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
})