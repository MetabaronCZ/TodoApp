import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Paging } from 'components/common/Paging';
import { Heading } from 'components/common/Heading';
import { ItemList } from 'components/common/ItemList';
import { Paragraph } from 'components/common/Paragraph';
import { TodoListItem } from 'components/todo-list/TodoListItem';
import { UpdatedContent } from 'components/common/UpdatedContent';
import { TodoListSearch } from 'components/todo-list/TodoListSearch';
import { TodoListToolbar } from 'components/todo-list/TodoListToolbar';

import { toVU } from 'modules/theme';
import { TodoSort } from 'models/Todos';

import { useAppDispatch, useAppSelector } from 'store/utils';
import { deleteTodos, fetchTodos, sortTodos } from 'store/todos/actions';

interface StyledProps {
  readonly $loading?: boolean;
}

const Container = styled.div<StyledProps>`
  ${UpdatedContent};
`;

const StyledHeading = styled(Heading)`
  margin-bottom: 1px;
`;

const StyledParagraph = styled(Paragraph)`
  padding-top: ${toVU(1)};
`;

export const TodoList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.todo);
  const [selected, setSelected] = useState<string[]>([]);
  const { perPage } = useAppSelector((state) => state.settings.data);

  const { items, loading, count, filter } = data;
  const idSnapshot = items.map((item) => item.id).join('|');

  useEffect(() => {
    const itemIds = idSnapshot.split('|');

    setSelected((state) => {
      return state.filter((selectedId) => itemIds.includes(selectedId));
    });
  }, [idSnapshot]);

  const onSelectItem = (id: string, shouldSelect: boolean): void => {
    if (shouldSelect) {
      // select item
      setSelected((state) => (!state.includes(id) ? [...state, id] : state));
    } else {
      // deselect item
      setSelected((state) => state.filter((item) => id !== item));
    }
  };

  const onSelectAll = (shouldSelect: boolean): void => {
    if (shouldSelect) {
      // select all items
      setSelected(items.map((item) => item.id));
    } else {
      // deselect all item
      setSelected([]);
    }
  };

  const sortItems = (newSort: TodoSort): void => {
    dispatch(sortTodos(newSort));
  };

  const changePage = (nr: number): void => {
    dispatch(fetchTodos({ page: nr }));
  };

  const onDeleteItem = (id: string): void => {
    if (window.confirm(t('todo.deleteConfirm'))) {
      dispatch(deleteTodos([id]));
    }
  };

  const onDeleteAll = (): void => {
    if (0 === selected.length) {
      return;
    }
    if (window.confirm(t('todoList.deleteAllConfirm'))) {
      dispatch(deleteTodos(selected));
    }
  };

  const selectionChecked = items.some((item) => selected.includes(item.id));

  return (
    <Container $loading={loading}>
      <StyledHeading>{t('page.home')}</StyledHeading>
      <TodoListSearch />

      <TodoListToolbar
        sort={filter.sort}
        selected={selectionChecked}
        disabled={0 === items.length}
        onSelect={onSelectAll}
        onSort={sortItems}
        onDelete={onDeleteAll}
      />

      {0 === items.length ? (
        <StyledParagraph>{t('todoList.empty')}</StyledParagraph>
      ) : (
        <>
          <ItemList>
            {items.map((item) => (
              <TodoListItem
                item={item}
                selected={selected.includes(item.id)}
                onDelete={() => onDeleteItem(item.id)}
                onSelect={(value) => onSelectItem(item.id, value)}
                key={item.id}
              />
            ))}
          </ItemList>

          {count > perPage && (
            <Paging
              page={filter.page}
              count={count}
              perPage={perPage}
              onChange={changePage}
            />
          )}
        </>
      )}
    </Container>
  );
};
