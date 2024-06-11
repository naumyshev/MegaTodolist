import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ]
    )

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t=>t.id !== taskId))
        console.log(tasks)
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const addTask = (taskTitle: string) => {
        const newTask = { id: v1(), title: taskTitle, isDone: false }
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, newTaskStatus: boolean) => {
        setTasks(tasks.map(t=>t.id == taskId ? {...t, isDone: newTaskStatus} : t))
    }

    let tasksForTodolist = tasks
    if(filter==='active') {
        tasksForTodolist = tasks.filter(t=>!t.isDone)
    }
    if(filter==='completed') {
        tasksForTodolist = tasks.filter(t=>t.isDone)
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    )
}

export default App;
