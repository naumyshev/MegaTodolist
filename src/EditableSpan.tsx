import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    value: string
}

export const EditableSpan = ({value}: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState<string>(value)

    const activatedEditModeHandler = () => {
        setEditMode(true)
    }

    const deactivatedEditModeHandler = () => {
        setEditMode(false)
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <>
            {editMode ? (
                <input value={title}
                       onBlur={deactivatedEditModeHandler}
                       autoFocus
                       onChange={changeTitleHandler}
                />
            ) : (
                <span onDoubleClick={activatedEditModeHandler}>{value}</span>
            )}
        </>
    )
}