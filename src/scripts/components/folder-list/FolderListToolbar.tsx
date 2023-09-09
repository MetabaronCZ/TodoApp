import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/button/Button';
import { Toolbar } from 'components/common/Toolbar';
import { Checkbox } from 'components/forms/Checkbox';
import { Dropdown, DropdownItem } from 'components/forms/Dropdown';

import { paths } from 'modules/paths';
import { OnChange, OnClick } from 'modules/event';
import { FolderSort, folderSort } from 'models/Folders';

interface Props {
  readonly sort: FolderSort;
  readonly selected?: boolean;
  readonly disabled?: boolean;
  readonly onSort: (sort: FolderSort) => void;
  readonly onSelect: OnChange<boolean>;
  readonly onDelete: OnClick;
}

export const FolderListToolbar: React.FC<Props> = ({
  sort,
  selected = false,
  disabled = false,
  onSort,
  onSelect,
  onDelete,
}) => {
  const { t } = useTranslation();

  const sortDropdownItems: DropdownItem<FolderSort>[] = folderSort.map(
    (sortId) => ({
      id: sortId,
      title: t(`folderList.sort.${sortId}`),
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
          href={paths.FOLDER_CREATE}
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
