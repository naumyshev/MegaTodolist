import React, {useState} from 'react';

type EditableSpanPropsType = {
    value: string
}

export const EditableSpan = ({value}: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)

    const activatedEditModeHandler = () => {
        setEditMode(true)
    }

    return (
        <>
            {editMode ? (
                <input value={value} autoFocus/>
            ) : (
                <span onDoubleClick={activatedEditModeHandler}>{value}</span>
            )}
        </>
    )
}