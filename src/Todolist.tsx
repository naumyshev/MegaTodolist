import React, {ChangeEvent} from 'react'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from "@mui/material/Box";
import {filterButtonsContainerSx, getListItemSx} from './Todolist.styles'
import {FilterValuesType} from "./model/todolists-reducer";
import {TaskType} from "./model/tasks-reducer";

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (taskTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = ({
                             title, tasks, removeTask, changeFilter, addTask,
                             changeTaskStatus, filter, todolistId, removeTodolist,
                             updateTask, updateTodolist
                         }: PropsType) => {


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
                    <EditableSpan value={title} onChange={updateTodolistTitleHandler}/>
                </h3>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>

            <AddItemForm addItem={addTaskTitleCallback}/>

            {tasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <List>
                    {tasks.map(t => {
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

                        return (
                            <ListItem
                                key={t.id}
                                sx={getListItemSx(t.isDone)}
                            >
                                <div>
                                    <Checkbox checked={t.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan value={t.title} onChange={changeTaskTitleHandler}/>
                                </div>
                                <IconButton onClick={removeTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
            <Box
                sx={filterButtonsContainerSx}
            >
                <div>
                    <Button
                        variant={filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilterTasksHandler('all')}
                    >
                        All
                    </Button>
                    <Button
                        variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterTasksHandler('active')}
                    >
                        Active
                    </Button>
                    <Button
                        variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilterTasksHandler('completed')}
                    >
                        Completed
                    </Button>
                </div>
            </Box>
        </div>
    )
}