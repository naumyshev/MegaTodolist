import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: v1(), title: 'What to learn', filter: "all"},
        {id: v1(), title: 'What to buy', filter: "all"}
    ])

    const [tasks, setTasks] = useState<Array<TaskType>>([
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ]
    )

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
        console.log(tasks)
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl=>tl.id === todolistId ? {...tl, filter: filter} : tl))
    }

    const addTask = (taskTitle: string) => {
        const newTask = {id: v1(), title: taskTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, newTaskStatus: boolean) => {
        setTasks(tasks.map(t => t.id == taskId ? {...t, isDone: newTaskStatus} : t))
    }

    return (
        <div className="App">
            {todolists.map(td => {

                let tasksForTodolist = tasks
                if (td.filter === 'active') {
                    tasksForTodolist = tasks.filter(t => !t.isDone)
                }
                if (td.filter === 'completed') {
                    tasksForTodolist = tasks.filter(t => t.isDone)
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
                    />
                )
            })}


        </div>
    )
}

export default App;
