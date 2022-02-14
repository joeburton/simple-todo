import { useEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import Button from '@mui/material/Button';

import { RootState } from '../../app/store';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addTodo, deleteTodo, selectStatus, Todo } from './todosSlice';
import styles from './Todos.module.css';

interface TodoListProps {
  filterFn?: (item: Todo) => boolean;
}

const TodoList = ({ filterFn }: TodoListProps) => {
  const todos = useAppSelector((state: RootState) => state.todos.todos);

  const sortedTodos = filterFn ? todos.filter(filterFn) : todos;

  return (
    <ul className={styles.todosList}>
      {sortedTodos.map((todo, i) => (
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
  const [details, setDetails] = useState();

  const [newTodo, setNewTodo] = useState<string>('');

  const updateNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewTodo(e.target.value);
  };

  const addNewTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addTodo(newTodo));
  };

  useEffect(() => {
    fetch('data.json')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('data.json');
      const data = await response.json();

      setDetails(data);
    };

    getData().catch((e) => {
      console.log(e);
    });
  }, []);

  return (
    <div className={styles.row}>
      <>{JSON.stringify(details)}</>
      <div className={styles.addTodo}>
        <input
          value={newTodo}
          onChange={updateNewTodo}
          className={styles.todo}
        />
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
