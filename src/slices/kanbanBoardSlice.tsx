import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Subtask {
  id: number;
  name: string;
  done: boolean;
}

export interface Status {
  columnId: number;
  text: string;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  status: Status;
  subtasks: Subtask[];
}

export interface Column {
  id: number;
  name: string;
  tasks: Task[];
}

interface KanbanBoard {
  id: number;
  boardName: string;
  columns: Column[];
}

interface KanbanBoardState {
  kanbanBoards: KanbanBoard[];
  chosenBoard: number | null;
}

const initialState: KanbanBoardState = {
  kanbanBoards: [],
  chosenBoard: null,
};

const kanbanBoardSlice = createSlice({
  name: 'kanbanBoard',
  initialState,
  reducers: {
    chooseBoard: (state, action: PayloadAction<number>) => {
      state.chosenBoard = action.payload;
    },
    addKanbanBoard: (state, action: PayloadAction<string>) => {
      const columns = [
        {
          id: 0,
          name: 'TO DO',
          tasks: [],
        },
        {
          id: 1,
          name: 'DOING',
          tasks: [],
        },
        {
          id: 2,
          name: 'DONE',
          tasks: [],
        },
      ];

      const newBoard: KanbanBoard = {
        id: state.kanbanBoards.length,
        boardName: action.payload,
        columns: columns,
      };

      state.kanbanBoards.push(newBoard);
    },
    addColumn: (
      state,
      action: PayloadAction<{ boardId: number; columnName: string }>
    ) => {
      const { boardId, columnName } = action.payload;
      const board = state.kanbanBoards.find((board) => board.id === boardId);
      if (board) {
        const newColumn: Column = {
          id: Date.now(),
          name: columnName,
          tasks: [],
        };
        board.columns.push(newColumn);
      }
    },
    deleteColumn: (
      state,
      action: PayloadAction<{ boardId: number; columnId: number }>
    ) => {
      const { boardId, columnId } = action.payload;
      const board = state.kanbanBoards.find((board) => board.id === boardId);
      if (board) {
        const columnIndex = board.columns.findIndex(
          (column) => column.id === columnId
        );
        if (columnIndex !== -1) {
          board.columns.splice(columnIndex, 1);
        }
      }
    },
    addTask: (
      state,
      action: PayloadAction<{
        columnId: number;
        taskName: string;
        taskDescription: string;
        subtasks: Subtask[];
      }>
    ) => {
      const { columnId, taskName, taskDescription, subtasks } = action.payload;
      const board = state.kanbanBoards.find(
        (board) => board.id === state.chosenBoard
      );
      if (board) {
        const column = board.columns.find((column) => column.id === columnId);
        if (column) {
          const newTask: Task = {
            id: column.tasks.length,
            name: taskName,
            description: taskDescription,
            status: {
              columnId: columnId,
              text:
                columnId === 0 ? 'TO DO' : columnId === 1 ? 'DOING' : 'DONE',
            },
            subtasks: subtasks,
          };
          column.tasks.push(newTask);
        }
      }
    },
    deleteTask: (
      state,
      action: PayloadAction<{
        boardId: number;
        columnId: number;
        taskId: number;
      }>
    ) => {
      const { columnId, taskId } = action.payload;
      const board = state.kanbanBoards.find(
        (board) => board.id === state.chosenBoard
      );
      if (board) {
        const column = board.columns.find((column) => column.id === columnId);
        if (column) {
          const taskIndex = column.tasks.findIndex(
            (task) => task.id === taskId
          );
          if (taskIndex !== -1) {
            column.tasks.splice(taskIndex, 1);
          }
        }
      }
    },

    addSubtask: (
      state,
      action: PayloadAction<{
        columnId: number;
        taskId: number;
        subtaskName: string;
        done: boolean;
      }>
    ) => {
      const { columnId, taskId, subtaskName, done } = action.payload;
      const board = state.kanbanBoards.find(
        (board) => board.id === state.chosenBoard
      );
      if (board) {
        const column = board.columns.find((column) => column.id === columnId);
        if (column) {
          const task = column.tasks.find((task) => task.id === taskId);
          if (task) {
            const newSubtask: Subtask = {
              id: task.subtasks.length,
              name: subtaskName,
              done: done,
            };
            task.subtasks.push(newSubtask);
          }
        }
      }
    },
    deleteSubtask: (
      state,
      action: PayloadAction<{
        columnId: number;
        taskId: number;
        subtaskId: number;
      }>
    ) => {
      const { columnId, taskId, subtaskId } = action.payload;
      const board = state.kanbanBoards.find(
        (board) => board.id === state.chosenBoard
      );
      if (board) {
        const column = board.columns.find((column) => column.id === columnId);
        if (column) {
          const task = column.tasks.find((task) => task.id === taskId);
          if (task) {
            const subtaskIndex = task.subtasks.findIndex(
              (subtask) => subtask.id === subtaskId
            );
            if (subtaskIndex !== -1) {
              task.subtasks.splice(subtaskIndex, 1);
            }
          } else {
            console.log('task not found');
          }
        } else {
          console.log('column not found');
        }
      } else {
        console.log('board not found');
      }
    },

    setTaskStatus: (
      state,
      action: PayloadAction<{
        columnId: number;
        taskId: number;
        newColumnId: number;
      }>
    ) => {
      const { columnId, taskId, newColumnId } = action.payload;
      const board = state.kanbanBoards.find(
        (board) => board.id === state.chosenBoard
      );
      if (board) {
        const column = board.columns.find((column) => column.id === columnId);
        if (column) {
          const task = column.tasks.find((task, index) => task.id === taskId);
          if (task) {
            const taskIndex = column.tasks.indexOf(task);
            column.tasks.splice(taskIndex, 1);
            console.log('deleted');
            const newColumn = board.columns.find(
              (column) => column.id === newColumnId
            );
            if (newColumn) {
              newColumn.tasks.push(task);
              console.log('added');
            }
          }
        } else {
          console.log('column not found');
        }
      } else {
        console.log('board not found');
      }
    },

    setSubtaskDone: (
      state,
      action: PayloadAction<{
        columnId: number;
        taskId: number;
        subtaskId: number;
        done: boolean;
      }>
    ) => {
      const { columnId, taskId, subtaskId, done } = action.payload;
      const board = state.kanbanBoards.find(
        (board) => board.id === state.chosenBoard
      );
      if (board) {
        const column = board.columns.find((column) => column.id === columnId);
        if (column) {
          const task = column.tasks.find((task) => task.id === taskId);
          if (task) {
            const subtask = task.subtasks.find(
              (subtask) => subtask.id === subtaskId
            );
            if (subtask) {
              subtask.done = done;
            } else {
              console.log('subtask not found');
            }
          } else {
            console.log('task not found ' + taskId);
          }
        } else {
          console.log('column not found');
        }
      } else {
        console.log('board not found');
      }
    },
  },
});

export const {
  chooseBoard,
  addKanbanBoard,
  addColumn,
  deleteColumn,
  addTask,
  addSubtask,
  deleteTask,
  deleteSubtask,
  setSubtaskDone,
  setTaskStatus,
} = kanbanBoardSlice.actions;

export const selectKanbanBoard = (state: RootState) =>
  state.kanbanBoard.kanbanBoards;

export const selectChosenBoard = (state: RootState) =>
  state.kanbanBoard.kanbanBoards.find(
    (board) => board.id === state.kanbanBoard.chosenBoard
  );

export const selectChosenBoardName = (state: RootState) =>
  state.kanbanBoard.kanbanBoards.find(
    (board) => board.id === state.kanbanBoard.chosenBoard
  )?.boardName;

export const selectChosenBoardId = (state: RootState) =>
  state.kanbanBoard.chosenBoard;

export const selectSidebarItems = (state: RootState) =>
  state.kanbanBoard.kanbanBoards.map((board) => ({
    id: board.id,
    name: board.boardName,
  }));

export default kanbanBoardSlice.reducer;
