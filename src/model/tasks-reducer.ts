import {TasksStateType} from '../App'
import {v1} from "uuid";

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }

        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: [{id: v1(), title: action.payload.title, isDone: false},
                    ...state[action.payload.todolistId]]
            }
        }

        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)
            }
        }

        default:
            return state
    }
}

// Action creators
export const removeTaskAC = (payload: { taskId: string, todolistId: string }) => {
    return {type: 'REMOVE-TASK', payload} as const
}

export const addTaskAC = (payload: { title: string, todolistId: string }) => {
    return {type: 'ADD-TASK', payload} as const
}

export const changeTaskStatusAC = (payload: { taskId: string, todolistId: string, isDone: boolean }) => {
    return {type: 'CHANGE-TASK-STATUS', payload} as const
}

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType