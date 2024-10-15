import { addTodo, USER_ID } from '../api/todos';
import { Errors } from '../types/ErrorsEnum';
import { Todo } from '../types/Todo';
import { handleError } from './handleError';

export const handleSubmit = (
  inputChange: string,
  setErrorNotification: React.Dispatch<React.SetStateAction<Errors>>,
  setTempTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
  setIsBeingSaved: React.Dispatch<React.SetStateAction<boolean>>,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  onInputChange: React.Dispatch<React.SetStateAction<string>>,
  setFocusOnChange: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (!inputChange) {
    handleError(Errors.EMPTY, setErrorNotification);

    return;
  } else {
    const tempTodo = {
      title: inputChange.trim(),
      userId: USER_ID,
      completed: false,
      id: 0,
    };

    setTempTodo(tempTodo);

    const newTodo = {
      title: inputChange.trim(),
      userId: USER_ID,
      completed: false,
    };

    setIsBeingSaved(true);

    addTodo(newTodo)
      .then(res => {
        setTodos(currentTodos => [...currentTodos, res]);
        onInputChange('');
      })
      .catch(() => {
        handleError(Errors.ADDING, setErrorNotification);
      })
      .finally(() => {
        setIsBeingSaved(false);
        setTempTodo(null);
        setFocusOnChange(current => !current);
      });
  }
};
