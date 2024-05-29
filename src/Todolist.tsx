import React from 'react'

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    data?: string
}

export const Todolist = ({title, tasks, data}: PropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {tasks.map(t=>{
                    return(
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                        </li>
                    )
                })}



                {/*<li>*/}
                {/*    <input type="checkbox" checked={tasks[0].isDone} />*/}
                {/*    <span>{tasks[0].title}</span>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <input type="checkbox" checked={tasks[1].isDone} />*/}
                {/*    <span>{tasks[1].title}</span>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <input type="checkbox" checked={tasks[2].isDone} />*/}
                {/*    <span>{tasks[2].title}</span>*/}
                {/*</li>*/}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
            <div>{data}</div>
        </div>
    )
}