import React from 'react'

type PropsTYpe = {
    title: string
}

export const Todolist = ({title}: PropsTYpe) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                <li>
                    <input type="checkbox" checked={true} /> <span>HTML&CSS</span>
                </li>
                <li>
                    <input type="checkbox" checked={true} /> <span>JS</span>
                </li>
                <li>
                    <input type="checkbox" checked={false} /> <span>React</span>
                </li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}