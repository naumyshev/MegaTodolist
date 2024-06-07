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

    const addTask = () => {
        const newTask = { id: v1(), title: 'NEW', isDone: false }
        setTasks([newTask, ...tasks])
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
            />
        </div>
    )
}

export default App;
