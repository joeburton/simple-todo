import Todos from './features/todos/Todos';

import styles from './app.module.css';

function App() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1>Simple Todo</h1>
      </header>
      <Todos />
    </section>
  );
}

export default App;
