import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Button } from 'components/button/Button';
import { Checkbox } from 'components/forms/Checkbox';
import { Dropdown, DropdownItem } from 'components/common/Dropdown';

import { toVU } from 'modules/theme';
import { TodoSort, todoSort } from 'models/Todos';
import { OnChange, OnClick } from 'modules/event';

import { sortTodos } from 'store/todos/actions';
import { useAppDispatch, useAppSelector } from 'store/utils';
import { paths } from 'modules/paths';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${toVU(1)};
  height: calc(${toVU(3)} + 1px);
  padding-left: ${toVU(0.5)};
  border-bottom: ${({ theme }) => theme.border.light};
`;

const ItemSelect = styled.div`
  /* */
`;

const Filler = styled.div`
  flex: 1;
`;

const ItemAction = styled.div`
  /* */
`;

interface Props {
  readonly selected: boolean;
  readonly disabled?: boolean;
  readonly onSelect: OnChange<boolean>;
  readonly onDelete: OnClick;
}

export const TodoListToolbar: React.FC<Props> = ({
  selected,
  disabled = false,
  onSelect,
  onDelete,
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const sort = useAppSelector((state) => state.todo.filter.sort);

  const sortItems = (newSort: TodoSort): void => {
    dispatch(sortTodos(newSort));
  };

  const sortDropdownItems: DropdownItem<TodoSort>[] = todoSort.map(
    (sortId) => ({
      id: sortId,
      title: t(`todoList.sort.${sortId}`),
      value: sortId,
    }),
  );

  return (
    <Container>
      <ItemSelect>
        <Checkbox
          label={t('todoList.selectAll')}
          checked={!disabled && selected}
          disabled={disabled}
          onChange={onSelect}
        />
      </ItemSelect>

      <Filler />

      <ItemAction>
        <Button ico="+" text={t('create')} href={paths.CREATE} />
      </ItemAction>

      {!disabled && selected && (
        <ItemAction>
          <Button ico="✖" text={t('todoList.deleteAll')} onClick={onDelete} />
        </ItemAction>
      )}

      <ItemAction>
        <Dropdown
          value={sort}
          items={sortDropdownItems}
          align="right"
          disabled={disabled}
          onSelect={sortItems}
        />
      </ItemAction>
    </Container>
  );
};
