import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/button/Button';
import { Text } from 'components/common/Typography';
import { Checkbox } from 'components/forms/Checkbox';
import { TextOverflow } from 'components/common/TextOverflow';

import { toVU } from 'modules/theme';
import { paths } from 'modules/paths';
import { Folder } from 'models/Folder';
import { OnChange, OnClick } from 'modules/event';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${toVU(1)};
`;

const ItemSelect = styled.div`
  /* */
`;

const ItemTitle = styled(Link)`
  ${Text.Base};
  ${TextOverflow};
  flex: 1;
  padding: ${toVU(0.5)} 0;
  text-decoration: none;
`;

const ItemAction = styled.div`
  /* */
`;

interface Props {
  readonly item: Folder;
  readonly selected?: boolean;
  readonly onDelete: OnClick;
  readonly onSelect: OnChange<boolean>;
}

export const FolderListItem: React.FC<Props> = ({
  item,
  selected = false,
  onDelete,
  onSelect,
}) => {
  const { t } = useTranslation();
  return (
    <Container>
      <ItemSelect>
        <Checkbox checked={selected} onChange={onSelect} />
      </ItemSelect>

      <ItemTitle to={paths.FOLDER_DETAIL(item.id)}>{item.title}</ItemTitle>

      <ItemAction>
        <Button
          ico="edit"
          text={t('edit')}
          href={paths.FOLDER_DETAIL(item.id)}
        />
      </ItemAction>

      <ItemAction>
        <Button ico="close" text={t('delete')} onClick={onDelete} />
      </ItemAction>
    </Container>
  );
};
