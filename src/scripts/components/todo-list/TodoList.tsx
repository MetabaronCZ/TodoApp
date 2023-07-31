import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { ItemList } from 'components/common/ItemList';
import { Paragraph } from 'components/common/Paragraph';
import { TodoListItem } from 'components/todo-list/TodoListItem';
import { UpdatedContent } from 'components/common/UpdatedContent';
import { TodoListToolbar } from 'components/todo-list/TodoListToolbar';

import { toVU } from 'modules/theme';
import { deleteTodos } from 'store/todos/actions';
import { useAppDispatch, useAppSelector } from 'store/utils';

interface StyledProps {
  readonly $loading?: boolean;
}

const Container = styled.div<StyledProps>`
  ${UpdatedContent};
`;

const StyledParagraph = styled(Paragraph)`
  padding-top: ${toVU(1)};
`;

export const TodoList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string[]>([]);
  const { items, loading } = useAppSelector((state) => state.todo);

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
      <TodoListToolbar
        selected={selectionChecked}
        disabled={0 === items.length}
        onSelect={onSelectAll}
        onDelete={onDeleteAll}
      />
      {0 === items.length ? (
        <StyledParagraph>{t('todoList.empty')}</StyledParagraph>
      ) : (
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
      )}
    </Container>
  );
};
