import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { generateId } from '../../utils';

export interface Todo {
  id: string;
  text: string;
  complete: boolean;
  saved: boolean;
}

export interface TodosGroup {
  listid: string;
  title: string;
  todos: Todo[];
}

export interface TodosState {
  selectedListId: string;
  todosGroup: TodosGroup[];
}

const initialState: TodosState = {
  selectedListId: 'ABC',
  todosGroup: [
    {
      listid: 'ABC',
      title: 'Tech Tasks',
      todos: [
        {
          id: generateId(),
          text: 'Learn TypeScript 1',
          complete: false,
          saved: true,
        },
        {
          id: generateId(),
          text: 'Learn NextJS',
          complete: false,
          saved: true,
        },
        {
          id: '675656776',
          text: 'Learn Cypress',
          complete: false,
          saved: true,
        },
        {
          id: generateId(),
          text: 'Develop Webpack Federation MFE architecture',
          complete: false,
          saved: true,
        },
        {
          id: generateId(),
          text: 'React Router',
          complete: false,
          saved: true,
        },
      ],
    },
    {
      listid: 'ABCD',
      title: 'Day to day',
      todos: [
        {
          id: generateId(),
          text: 'Build garage',
          complete: false,
          saved: true,
        },
        {
          id: generateId(),
          text: 'New front door',
          complete: false,
          saved: true,
        },
        {
          id: '675656776',
          text: 'Finish off outhouse',
          complete: false,
          saved: true,
        },
      ],
    },
  ],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todos = state.todosGroup.find(
        (list) => list.listid === state.selectedListId
      )?.todos;

      todos?.push({
        id: generateId(),
        text: action.payload,
        complete: false,
        saved: false,
      });
    },
    deleteTodo: (state, action: PayloadAction<any>) => {
      const listIndex = state.todosGroup.findIndex(
        (list) => list.listid === state.selectedListId
      );

      state.todosGroup[listIndex].todos = state.todosGroup[
        listIndex
      ].todos?.filter((todo) => todo.id !== action?.payload.id);
    },
    selectStatus: (state, action: PayloadAction<any>) => {
      const todos = state.todosGroup.find(
        (list) => list.listid === state.selectedListId
      )?.todos;

      console.log(current(todos));
      const item = todos?.find((todo) => todo.id === action.payload.id);
      if (item) item.complete = !item.complete;
    },
    changeList: (state, action) => {
      state.selectedListId = action.payload;
    },
  },
});

export const todosList = (state: RootState) => state.todos;

export const { addTodo, deleteTodo, selectStatus, changeList } =
  todosSlice.actions;

export default todosSlice.reducer;
