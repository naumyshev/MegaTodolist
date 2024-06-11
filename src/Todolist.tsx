import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
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
    changeTaskStatus:(taskId: string, newStatus: boolean) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask, changeTaskStatus}: PropsType) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if(taskTitle.trim() !== '') {
            addTask(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if(event.key==='Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button
                    title={'+'}
                    onClick={addTaskHandler}
                />
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {tasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <ul>
                    {tasks.map(t=>{
                        const removeTaskHandler = () => {
                            removeTask(t.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(t.id, newStatusValue)
                        }
                        return(
                            <li key={t.id}>
                                <input
                                    type="checkbox"
                                    checked={t.isDone}
                                    onChange={changeTaskStatusHandler}
                                />
                                <span>{t.title}</span>
                                <Button title={'x'} onClick={removeTaskHandler} />
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