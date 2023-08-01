import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/button/Button';
import { Toolbar } from 'components/common/Toolbar';
import { Checkbox } from 'components/forms/Checkbox';
import { Dropdown, DropdownItem } from 'components/forms/Dropdown';

import { paths } from 'modules/paths';
import { OnChange, OnClick } from 'modules/event';
import { TodoSort, todoSort } from 'models/Todos';

interface Props {
  readonly sort: TodoSort;
  readonly selected: boolean;
  readonly disabled?: boolean;
  readonly onSelect: OnChange<boolean>;
  readonly onSort: (sort: TodoSort) => void;
  readonly onDelete: OnClick;
}

export const TodoListToolbar: React.FC<Props> = ({
  sort,
  selected,
  disabled = false,
  onSelect,
  onSort,
  onDelete,
}) => {
  const { t } = useTranslation();

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
          label={t('selectAll')}
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
            text={t('delete')}
            onClick={onDelete}
            key="delete"
          />
        ) : null,
        <Dropdown
          value={sort}
          items={sortDropdownItems}
          align="right"
          disabled={disabled}
          onSelect={onSort}
          key="sort"
        />,
      ]}
    />
  );
};
