import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: "all"},
        {id: todolistId2, title: 'What to buy', filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'Bread', isDone: true },
            { id: v1(), title: 'Milk', isDone: false },
        ]
    })

    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({ ...tasks, [todolistId]:tasks[todolistId].filter(t => t.id !== taskId) })
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl))
    }

    const addTask = (taskTitle: string, todolistId: string) => {
        const newTask = {id: v1(), title: taskTitle, isDone: false}
        setTasks({...tasks, [todolistId]:[newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (taskId: string, newTaskStatus: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t=>t.id === taskId ? {...t, isDone: newTaskStatus} : t)})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(td=>td.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: TodolistType = {id: todolistId, title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [todolistId]: []})
    }

    return (
        <div className="App">
            <div>
                <h3>Add New Todolist</h3>
                <AddItemForm addItem={addTodolist} />
            </div>

            {todolists.map(td => {

                let tasksForTodolist = tasks[td.id]
                if (td.filter === 'active') {
                    tasksForTodolist = tasks[td.id].filter(t => !t.isDone)
                }
                if (td.filter === 'completed') {
                    tasksForTodolist = tasks[td.id].filter(t => t.isDone)
                }

                return (
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
                    />
                )
            })}


        </div>
    )
}

export default App;
