import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Button } from 'components/button/Button';
import { TextField } from 'components/forms/TextField';

import { submit } from 'modules/event';

import { filterTodos } from 'store/todos/actions';
import { useAppDispatch, useAppSelector } from 'store/utils';

const Container = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > *:first-child {
    flex: 1;
  }
`;

export const TodoListSearch: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');
  const loading = useAppSelector((state) => state.todo.loading);

  const search = (): void => {
    if (!query) {
      return;
    }
    dispatch(filterTodos({ query }));
  };

  const clearSearch = (): void => {
    setQuery('');
    dispatch(filterTodos({ query: '' }));
  };

  return (
    <Container onSubmit={submit(search)}>
      <TextField
        value={query}
        placeholder={t('todoList.query')}
        disabled={loading}
        maxLength={100}
        onChange={setQuery}
      />
      <Button text={t('todoList.search')} onClick={search} />
      <Button text={t('cancel')} disabled={!query} onClick={clearSearch} />
    </Container>
  );
};
