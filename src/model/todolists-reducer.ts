
import { TodolistType } from '../App'
import { v1 } from 'uuid'

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
]


export const todolistsReducer = (state: TodolistType[] = initialState, action: any) => {
    return state
}