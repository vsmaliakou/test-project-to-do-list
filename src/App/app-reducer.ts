export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type AppActionsType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null
}

type AppInitialStateType = typeof initialState

export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'TEST/APP/SET-STATUS':
            return {...state, status: action.status}
        case 'TEST/APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'TEST/APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'TEST/APP/SET-ERROR', error} as const)