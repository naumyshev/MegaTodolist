import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {Button} from "./Button";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask:(taskTitle: string, todolistId: string) => void
    changeTaskStatus:(taskId: string, newStatus: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask,
                             changeTaskStatus, filter, todolistId, removeTodolist}: PropsType) => {





    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, todolistId)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    return (
        <div>
            <div className={'todolist-title-container'}>
                <h3>{title}</h3>
                <Button title='x' onClick={removeTodolistHandler} />
            </div>

            <AddItemForm addItem={()=>{}}/>
            {tasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <ul>
                    {tasks.map(t=>{
                        const removeTaskHandler = () => {
                            removeTask(t.id, todolistId)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(t.id, newStatusValue, todolistId)
                        }
                        return(
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
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
                <Button
                    className={filter === 'all' ? 'active-filter' : ''}
                    title={'All'}
                    onClick={()=>changeFilterTasksHandler('all')}
                />
                <Button
                    className={filter === 'active' ? 'active-filter' : ''}
                    title={'Active'}
                    onClick={()=>changeFilterTasksHandler('active')}
                />
                <Button
                    className={filter === 'completed' ? 'active-filter' : ''}
                    title={'Completed'}
                    onClick={()=>changeFilterTasksHandler('completed')}
                />
            </div>
        </div>
    )
}