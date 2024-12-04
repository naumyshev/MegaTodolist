import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    value: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = ({value, onChange}: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState<string>(value)

    const activatedEditModeHandler = () => {
        setEditMode(true)
    }

    const deactivatedEditModeHandler = () => {
        setEditMode(false)
        onChange(title)
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <>
            {editMode ? (
                <TextField
                    variant={'outlined'}
                    value={title}
                    size={'small'}
                    onChange={changeTitleHandler}
                    onBlur={deactivatedEditModeHandler}
                    autoFocus
                />


            ) : (
                <span onDoubleClick={activatedEditModeHandler}>{value}</span>
            )}
        </>
    )
}