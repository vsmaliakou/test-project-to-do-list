import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input
                value={title}
                autoFocus
                onBlur={activateViewMode}
                onChange={changeTitle}
            />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}