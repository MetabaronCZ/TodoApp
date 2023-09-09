import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Heading } from 'components/common/Heading';
import { ItemList } from 'components/common/ItemList';
import { Paragraph } from 'components/common/Paragraph';
import { UpdatedContent } from 'components/common/UpdatedContent';
import { FolderListItem } from 'components/folder-list/FolderListItem';
import { FolderListToolbar } from 'components/folder-list/FolderListToolbar';

import { toVU } from 'modules/theme';
import { FolderSort, sortFolders } from 'models/Folders';

import { deleteFolders } from 'store/folders/actions';
import { useAppDispatch, useAppSelector } from 'store/utils';

const defaultSort: FolderSort = 'TITLE_ASC';

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

export const FolderList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [sort, setSort] = useState<FolderSort>(defaultSort);
  const [selected, setSelected] = useState<string[]>([]);
  const { items, loading } = useAppSelector((state) => state.folder);

  const pageItems = sortFolders(items, sort);
  const idSnapshot = pageItems.map((item) => item.id).join('|');

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
      setSelected(pageItems.map((item) => item.id));
    } else {
      // deselect all item
      setSelected([]);
    }
  };

  const onDeleteItem = (id: string): void => {
    if (window.confirm(t('folder.deleteConfirm'))) {
      dispatch(deleteFolders([id]));
    }
  };

  const onDeleteSelected = (): void => {
    if (0 === selected.length) {
      return;
    }
    if (window.confirm(t('folderList.deleteAllConfirm'))) {
      dispatch(deleteFolders(selected));
    }
  };

  const selectionChecked = pageItems.some((item) => selected.includes(item.id));

  return (
    <Container $loading={loading}>
      <StyledHeading>{t('page.folderList')}</StyledHeading>

      <FolderListToolbar
        sort={sort}
        selected={selectionChecked}
        disabled={0 === pageItems.length}
        onSort={setSort}
        onSelect={onSelectAll}
        onDelete={onDeleteSelected}
      />
      {0 === pageItems.length ? (
        <StyledParagraph>{t('folderList.empty')}</StyledParagraph>
      ) : (
        <ItemList>
          {pageItems.map((item) => (
            <FolderListItem
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
