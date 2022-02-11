import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { generateId } from '../../utils';

export interface Todo {
  id: string;
  text: string;
  complete: boolean;
  saved: boolean;
}

export interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [
    {
      id: generateId(),
      text: 'Learn TypeScript',
      complete: false,
      saved: true,
    },
    { id: generateId(), text: 'Learn NextJS', complete: false, saved: true },
    { id: '675656776', text: 'Learn Cypress', complete: false, saved: true },
    {
      id: generateId(),
      text: 'Develop Webpack Federation MFE architecture',
      complete: false,
      saved: true,
    },
    { id: generateId(), text: 'React Router', complete: false, saved: true },
  ],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: generateId(),
        text: action.payload,
        complete: false,
        saved: false,
      });
    },

    deleteTodo: (state, action: PayloadAction<any>) => {
      state.todos = state.todos.filter(
        (todo) => todo.id !== action?.payload.id
      );
    },
    selectStatus: (state, action: PayloadAction<any>) => {
      const item = state.todos.find((todo) => todo.id === action.payload.id);
      if (item) item.complete = !item.complete;
    },
  },
});

export const todosList = (state: RootState) => state.todos;

export const { addTodo, deleteTodo, selectStatus } = todosSlice.actions;

export default todosSlice.reducer;
