import React, {useState} from 'react';

type EditableSpanPropsType = {
    value: string
}

export const EditableSpan = ({value}: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)

    const activatedEditModeHandler = () => {
        setEditMode(true)
    }

    const deactivatedEditModeHandler = () => {
        setEditMode(false)
    }

    return (
        <>
            {editMode ? (
                <input value={value}
                       onBlur={deactivatedEditModeHandler}
                       autoFocus/>
            ) : (
                <span onDoubleClick={activatedEditModeHandler}>{value}</span>
            )}
        </>
    )
}