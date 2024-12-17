import { TasksStateType } from '../App'

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case '': {
            return state
        }

        default:
            return state
    }
}

// Action creators
export const removeTaskAC = (taskID: string, todolistId: string) => {
    return { type: '', payload: {} } as const
}

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

type ActionsType = RemoveTaskActionType