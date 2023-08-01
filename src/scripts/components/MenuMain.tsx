import React from 'react';
import { useTranslation } from 'react-i18next';

import { Menu } from 'components/common/Menu';
import { MenuItem } from 'components/common/Menu';

import { paths } from 'modules/paths';
import { useAppSelector } from 'store/utils';

export const MenuMain: React.FC = () => {
  const { t } = useTranslation();
  const filter = useAppSelector((state) => state.todo.filter);
  const folders = useAppSelector((state) => state.folder.items);

  // user folders menu items
  const menuItems: MenuItem[] = folders.map((folder) => ({
    id: folder.id,
    ico: 'star',
    title: folder.title,
    active: folder.id === filter.folder,
    href: paths.FOLDER(folder.id),
  }));

  // all todos menu item
  menuItems.unshift({
    id: '',
    ico: 'star',
    title: t('folder.allTodos'),
    active: null === filter.folder,
    href: paths.FOLDER(''),
  });

  // folder list link
  menuItems.push({
    id: 'create',
    ico: 'edit',
    title: t('page.folderList'),
    href: paths.FOLDER_LIST,
  });

  return <Menu items={menuItems} />;
};
