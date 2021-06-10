import React, {ChangeEvent, useState} from "react";
import s from './EditableSpan.module.css'

type EditableSpanPropsType = {
    className: string
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo((props) => {

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
                className={s.input}
                value={title}
                autoFocus
                onBlur={activateViewMode}
                onChange={changeTitle}
            />
            : <span className={props.className} onDoubleClick={activateEditMode}>{props.title}</span>
    )
})