import { TasksStateType } from '../App'

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskID)}
        }

        default:
            return state
    }
}

// Action creators
export const removeTaskAC = (taskID: string, todolistId: string) => {
    return { type: 'REMOVE-TASK', payload: {taskID, todolistId} } as const
}

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

type ActionsType = RemoveTaskActionType