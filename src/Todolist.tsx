import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {Button} from "./Button";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask,
                             changeTaskStatus, filter, todolistId, removeTodolist,
                             updateTask, updateTodolist}: PropsType) => {


    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, todolistId)
    }

    const addTaskTitleCallback = (title: string) => {
        addTask(title, todolistId)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const updateTodolistTitleHandler = (newTitle: string) => {
        updateTodolist(todolistId, newTitle)
    }

    return (
        <div>
            <div className={'todolist-title-container'}>
                <h3>
                    <EditableSpan value={title} onChange={updateTodolistTitleHandler} />
                </h3>
                <Button title='x' onClick={removeTodolistHandler} />
            </div>

            <AddItemForm addItem={addTaskTitleCallback}/>

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

                        const changeTaskTitleHandler = (title: string) => {
                            updateTask(todolistId, t.id, title)
                        }

                        return(
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input
                                    type="checkbox"
                                    checked={t.isDone}
                                    onChange={changeTaskStatusHandler}
                                />
                                <EditableSpan value={t.title} onChange={changeTaskTitleHandler} />
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