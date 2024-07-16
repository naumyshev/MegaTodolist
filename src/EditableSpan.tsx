import React from 'react';

type EditableSpanPropsType = {
    value: string
}

export const EditableSpan = ({value}: EditableSpanPropsType) => {
    return (
        <span>{value}</span>
    );
};

