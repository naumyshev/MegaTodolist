import React from 'react'
import {Button} from "./Button";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    data?: string
}

export const Todolist = ({title, tasks, data}: PropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <Button title={'+'} />
            </div>
            {tasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <ul>
                    {tasks.map(t=>{
                        return(
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <Button title={'All'} />
                <Button title={'Active'} />
                <Button title={'Completed'} />
            </div>
            <div>{data}</div>
        </div>
    )
}