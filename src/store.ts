import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import kanbanBoardReducer from "./slices/kanbanBoardSlice"

export const store = configureStore({
  reducer: {
    kanbanBoard: kanbanBoardReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

