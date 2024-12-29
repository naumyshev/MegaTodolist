import React from 'react';
import Grid from "@mui/material/Grid2";
import {AddItemForm} from "./AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import Container from "@mui/material/Container";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store";

import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType} from "./model/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistType
} from "./model/todolists-reducer";

export const Main = () => {

    const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC({taskId, todolistId}))
    }

    const changeFilter = (filter: FilterValuesType, id: string) => {
        dispatch(changeTodolistFilterAC({id, filter}))

    }

    const addTask = (taskTitle: string, todolistId: string) => {
        dispatch(addTaskAC({title: taskTitle, todolistId}))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({taskId, todolistId, isDone}))
    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({taskId, todolistId, title}))
    }

    const updateTodolist = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)

    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }


    return (
        <Container fixed>
            <Grid container sx={{mb: '30px'}}>
                <div>
                    <h3>Add New Todolist</h3>
                    <AddItemForm addItem={addTodolist}/>
                </div>
            </Grid>
            <Grid container spacing={4}>
                {todolists.map(td => {

                    let tasksForTodolist = tasks[td.id]
                    if (td.filter === 'active') {
                        tasksForTodolist = tasks[td.id].filter(t => !t.isDone)
                    }
                    if (td.filter === 'completed') {
                        tasksForTodolist = tasks[td.id].filter(t => t.isDone)
                    }

                    return (
                        <Grid key={td.id}>
                            <Paper sx={{p: '0 20px 20px 20px'}}>
                                <Todolist
                                    key={td.id}
                                    todolistId={td.id}
                                    title={td.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={td.filter}
                                    removeTodolist={removeTodolist}
                                    updateTask={updateTask}
                                    updateTodolist={updateTodolist}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    );
};
