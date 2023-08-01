import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/button/Button';
import { Toolbar } from 'components/common/Toolbar';
import { Checkbox } from 'components/forms/Checkbox';
import { Dropdown, DropdownItem } from 'components/forms/Dropdown';

import { paths } from 'modules/paths';
import { OnChange, OnClick } from 'modules/event';
import { TodoSort, todoSort } from 'models/Todos';

import { sortTodos } from 'store/todos/actions';
import { useAppDispatch, useAppSelector } from 'store/utils';

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
    <Toolbar
      items={[
        <Checkbox
          label={t('todoList.selectAll')}
          checked={!disabled && selected}
          disabled={disabled}
          onChange={onSelect}
          key="select"
        />,
        'filler',
        <Button
          ico="plus"
          text={t('create')}
          href={paths.TODO_CREATE}
          key="create"
        />,
        !disabled && selected ? (
          <Button
            ico="close"
            text={t('todoList.deleteAll')}
            onClick={onDelete}
            key="delete"
          />
        ) : null,
        <Dropdown
          value={sort}
          items={sortDropdownItems}
          align="right"
          disabled={disabled}
          onSelect={sortItems}
          key="sort"
        />,
      ]}
    />
  );
};
