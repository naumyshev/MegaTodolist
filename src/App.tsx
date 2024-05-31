import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {


    const [tasks, setTasks] = useState<Array<TaskType>>([
            { id: 1, title: 'HTML&CSS', isDone: true },
            { id: 2, title: 'JS', isDone: true },
            { id: 3, title: 'ReactJS', isDone: false },
        ]
    )

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t=>t.id !== taskId))
        console.log(tasks)
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
            />
        </div>
    )
}

export default App;
