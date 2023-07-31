import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Grid } from 'components/common/Grid';
import { Menu } from 'components/common/Menu';
import { MenuItem } from 'components/common/Menu';

import { toVU } from 'modules/theme';
import { paths } from 'modules/paths';
import { useAppSelector } from 'store/utils';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${toVU(2)};
`;

const MenuColumn = styled.nav`
  width: ${({ theme }) => theme.dimension.menuColumnWidth};
`;

const ContentColumn = styled(Grid)`
  flex: 1;
  min-width: 0;
`;

export const MenuContent: React.FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  const filter = useAppSelector((state) => state.todo.filter);
  const folders = useAppSelector((state) => state.folder.items);

  // user folders menu items
  const menuItems: MenuItem[] = folders.map((folder) => ({
    id: folder.id,
    title: folder.title,
    active: folder.id === filter.folder,
    href: paths.FOLDER(folder.id),
  }));

  // all todos menu item
  menuItems.unshift({
    id: '',
    title: t('folder.allTodos'),
    active: null === filter.folder,
    href: paths.FOLDER(''),
  });

  return (
    <Container>
      <MenuColumn>
        <Menu items={menuItems} />
      </MenuColumn>

      <ContentColumn>{children}</ContentColumn>
    </Container>
  );
};
