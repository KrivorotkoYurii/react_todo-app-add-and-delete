import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import { Errors } from '../../types/ErrorsEnum';
import { Todo } from '../../types/Todo';
import { handleSubmit } from '../../handlers/handleSubmit';

interface Props {
  inputChange: string;
  onInputChange: React.Dispatch<React.SetStateAction<string>>;
  setErrorNotification: React.Dispatch<React.SetStateAction<Errors>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  isBeingSaved: boolean;
  setIsBeingSaved: React.Dispatch<React.SetStateAction<boolean>>;
  setTempTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  focusOnChange: boolean;
  setFocusOnChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<Props> = ({
  inputChange,
  onInputChange,
  setErrorNotification,
  setTodos,
  isBeingSaved,
  setIsBeingSaved,
  setTempTodo,
  focusOnChange,
  setFocusOnChange,
}) => {
  const todoInputField = useRef<HTMLInputElement>(null);

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleSubmit(
      inputChange,
      setErrorNotification,
      setTempTodo,
      setIsBeingSaved,
      setTodos,
      onInputChange,
      setFocusOnChange,
    );
  };

  useEffect(() => {
    if (todoInputField.current) {
      todoInputField.current.focus();
    }
  }, [focusOnChange]);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', { active: false })}
        data-cy="ToggleAllButton"
        disabled
      />

      <form onSubmit={handleSubmitForm}>
        <input
          disabled={isBeingSaved}
          ref={todoInputField}
          value={inputChange}
          onChange={event => onInputChange(event.target.value.trimStart())}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
