import React, { Dispatch, SetStateAction } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { Errors } from '../../types/ErrorsEnum';
import { Filter } from '../../types/FilterEnum';
import { getFilteredTodos } from '../../utils/getFilteredTodos';
import { handleDelete } from '../../handlers/handleDelete';

interface Props {
  todos: Todo[];
  filter: Filter;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  setFocusOnChange: Dispatch<SetStateAction<boolean>>;
  setErrorNotification: Dispatch<SetStateAction<Errors>>;
  isBeingDeleted: number;
  setIsBeingDeleted: Dispatch<SetStateAction<number>>;
}

export const TodoList: React.FC<Props> = ({
  todos,
  filter,
  setTodos,
  setFocusOnChange,
  setErrorNotification,
  isBeingDeleted,
  setIsBeingDeleted,
}) => {
  const isBeingEdited = false; // This variable will be realised in the next task

  const filteredTodos = getFilteredTodos(todos, filter);

  const handleDeleteTodo = (todoId: number) => {
    handleDelete(
      todoId,
      setIsBeingDeleted,
      setTodos,
      setErrorNotification,
      setFocusOnChange,
    );
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={cn('todo', { completed: todo.completed })}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
            />
          </label>

          {isBeingEdited ? (
            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>
          ) : (
            <>
              <span data-cy="TodoTitle" className="todo__title">
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                ×
              </button>
            </>
          )}

          <div
            data-cy="TodoLoader"
            className={cn('modal overlay', {
              'is-active': isBeingDeleted === todo.id,
            })}
          >
            {/* eslint-disable-next-line max-len */}
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};
