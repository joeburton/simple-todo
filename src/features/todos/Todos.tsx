import { useCallback, useMemo, useEffect, useRef, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import Button from '@mui/material/Button';

import { RootState } from '../../app/store';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  addTodo,
  deleteTodo,
  selectStatus,
  changeList,
  Todo,
} from './todosSlice';

import { SelectMenu } from '../../components';
import styles from './Todos.module.css';

interface TodoListProps {
  filterFn?: (item: Todo) => boolean;
}

const TodoList = ({ filterFn }: TodoListProps) => {
  const todosLists = useAppSelector(
    (state: RootState) => state.todos.todosGroup
  );

  const selectedListId = useAppSelector(
    (state: RootState) => state.todos.selectedListId
  );

  // get selected list by list id
  const selectedList = todosLists.find(
    (list) => list.listid === selectedListId
  )?.todos;

  // sort complete and active list items
  const sortedTodos = filterFn ? selectedList?.filter(filterFn) : selectedList;

  return (
    <ul className={styles.todosList}>
      {sortedTodos?.map((todo, i) => (
        <TodoItem key={i} todo={todo} />
      ))}
    </ul>
  );
};

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useAppDispatch();
  const removeTodo = (e: React.MouseEvent<SVGElement>) => {
    dispatch(deleteTodo({ id: todo.id }));
  };

  const markComplete = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(selectStatus({ id: todo.id }));
  };

  const complete = todo.complete ? `strikethrough` : ``;
  const status = todo.complete ? `statusComplete` : `statusActive`;

  return (
    <li>
      <div className={styles.text} onClick={markComplete}>
        <ModeStandbyIcon
          sx={{ fontSize: '1.2rem' }}
          className={styles[status]}
        />
        <span className={styles[complete]}>{todo.text}</span>
      </div>
      <DeleteOutlineIcon onClick={removeTodo} className={styles.deleteIcon} />
    </li>
  );
};

const Todos = () => {
  const dispatch = useAppDispatch();

  const newTodoRef = useRef<HTMLInputElement>(null);

  const [selectedList, setSelectedList] = useState<string>('ABC');

  const todosLists = useAppSelector(
    (state: RootState) => state.todos.todosGroup
  );

  const addNewTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch(addTodo(newTodoRef.current.value));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(changeList(selectedList));
  }, [dispatch, selectedList]);

  const options = useMemo(() => {
    return todosLists.map((list) => ({
      value: list.listid,
      label: list.title,
    }));
  }, [todosLists]);

  return (
    <div className={styles.row}>
      <div className={styles.selectList}>
        <SelectMenu
          options={options}
          value={selectedList}
          onChange={setSelectedList}
          styles={{ minWidth: '200px', height: '38px' }}
        />
      </div>
      <div className={styles.addTodo}>
        <input ref={newTodoRef} className={styles.todo} />
        <Button
          className={styles.add}
          onClick={addNewTodo}
          variant='outlined'
          sx={{ marginLeft: '4px', padding: '6px', color: 'black' }}
        >
          ADD
        </Button>
      </div>
      <h2>Active</h2>
      <TodoList filterFn={(todo: Todo) => todo.complete === false} />
      <h2>Complete</h2>
      <TodoList filterFn={(todo: Todo) => todo.complete === true} />
    </div>
  );
};

export default Todos;
