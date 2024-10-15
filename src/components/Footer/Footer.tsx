import React, { Dispatch, SetStateAction } from 'react';
import cn from 'classnames';

import { Filter } from '../../types/FilterEnum';
import { Todo } from '../../types/Todo';
import { Errors } from '../../types/ErrorsEnum';
import { getLinkHref } from '../../utils/getLinkHref';
import { handleDelete } from '../../handlers/handleDelete';

interface Props {
  onFilterChange: React.Dispatch<React.SetStateAction<Filter>>;
  filter: Filter;
  todos: Todo[];
  setIsBeingDeleted: Dispatch<SetStateAction<number>>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setFocusOnChange: Dispatch<SetStateAction<boolean>>;
  setErrorNotification: Dispatch<SetStateAction<Errors>>;
}

export const Footer: React.FC<Props> = ({
  onFilterChange,
  filter,
  todos,
  setIsBeingDeleted,
  setTodos,
  setFocusOnChange,
  setErrorNotification,
}) => {
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const linksValues = Object.values(Filter);

  const handleDeleteCompletedTodos = () => {
    const completedTodos: Todo[] = todos.filter(todo => todo.completed);

    completedTodos.forEach(completedTodo => {
      handleDelete(
        completedTodo.id,
        setIsBeingDeleted,
        setTodos,
        setErrorNotification,
        setFocusOnChange,
      );
    });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {linksValues.map(linkValue => (
          <a
            key={linkValue}
            href={getLinkHref(linkValue)}
            className={cn('filter__link', { selected: filter === linkValue })}
            data-cy={`FilterLink${linkValue}`}
            onClick={() => onFilterChange(linkValue)}
          >
            {linkValue}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={activeTodosCount === todos.length}
        onClick={handleDeleteCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
