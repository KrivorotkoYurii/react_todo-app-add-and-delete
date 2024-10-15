import { Dispatch, SetStateAction } from 'react';
import { Errors } from '../types/ErrorsEnum';
import { Todo } from '../types/Todo';
import { deleteTodo } from '../api/todos';
import { handleError } from './handleError';

export const handleDelete = (
  todoId: number,
  setIsBeingDeleted: Dispatch<SetStateAction<number>>,
  setTodos: Dispatch<SetStateAction<Todo[]>>,
  setErrorNotification: Dispatch<SetStateAction<Errors>>,
  setFocusOnChange: Dispatch<SetStateAction<boolean>>,
) => {
  setIsBeingDeleted(todoId);

  deleteTodo(todoId)
    .then(() =>
      setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId)),
    )
    .catch(() => {
      handleError(Errors.DELETING, setErrorNotification);
    })
    .finally(() => {
      setIsBeingDeleted(0);
      setFocusOnChange(current => !current);
    });
};
