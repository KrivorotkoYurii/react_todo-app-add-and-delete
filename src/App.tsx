import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';

import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ErrorNotifications } from './components/Errors';

import { Todo } from './types/Todo';
import { Errors } from './types/ErrorsEnum';
import { Filter } from './types/FilterEnum';
import { handleError } from './handlers/handleError';
import { TodoItem } from './components/TodoItem';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.ALL);
  const [inputChange, setInputChange] = useState('');
  const [isBeingSaved, setIsBeingSaved] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [focusOnChange, setFocusOnChange] = useState(true);
  const [isBeingDeleted, setIsBeingDeleted] = useState<number>(0);
  const [errorNotification, setErrorNotification] = useState<Errors>(
    Errors.DEFAULT,
  );

  useEffect(() => {
    setErrorNotification(Errors.DEFAULT);
    getTodos()
      .then(setTodos)
      .catch(() => {
        handleError(Errors.LOADING, setErrorNotification);
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          inputChange={inputChange}
          onInputChange={setInputChange}
          setErrorNotification={setErrorNotification}
          setTodos={setTodos}
          isBeingSaved={isBeingSaved}
          setIsBeingSaved={setIsBeingSaved}
          setTempTodo={setTempTodo}
          focusOnChange={focusOnChange}
          setFocusOnChange={setFocusOnChange}
        />

        {!!todos.length && (
          <>
            <TodoList
              todos={todos}
              filter={filter}
              setTodos={setTodos}
              setFocusOnChange={setFocusOnChange}
              setErrorNotification={setErrorNotification}
              isBeingDeleted={isBeingDeleted}
              setIsBeingDeleted={setIsBeingDeleted}
            />

            {tempTodo && (
              <TodoItem isBeingSaved={isBeingSaved} tempTodo={tempTodo} />
            )}

            <Footer
              onFilterChange={setFilter}
              filter={filter}
              todos={todos}
              setIsBeingDeleted={setIsBeingDeleted}
              setTodos={setTodos}
              setFocusOnChange={setFocusOnChange}
              setErrorNotification={setErrorNotification}
            />
          </>
        )}
      </div>

      <ErrorNotifications
        errorNotification={errorNotification}
        setErrorNotification={setErrorNotification}
      />
    </div>
  );
};
