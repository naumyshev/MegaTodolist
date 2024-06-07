import React from 'react'
import {Button} from "./Button";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask:() => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask}: PropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <Button title={'+'} onClick={addTask}/>
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
                                <Button title={'x'} onClick={()=>{removeTask(t.id)}} />
                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <Button title={'All'}  onClick={()=>changeFilter('all')}/>
                <Button title={'Active'} onClick={()=>changeFilter('active')}/>
                <Button title={'Completed'} onClick={()=>changeFilter('completed')}/>
            </div>
        </div>
    )
}