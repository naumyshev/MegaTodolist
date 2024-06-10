import React, {useState} from 'react'
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
    addTask:(taskTitle: string) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask}: PropsType) => {

    const [taskTitle, setTaskTitle] = useState('')

    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={event => setTaskTitle(event.currentTarget.value)}
                    onKeyUp={event => {
                        if(event.key==='Enter') {
                            addTaskHandler()
                        }
                    }}
                />
                <Button
                    title={'+'}
                    onClick={addTaskHandler}
                />
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