import { Folder } from 'models/Folder';

export interface Folders {
  readonly items: Folder[];
  readonly loading: boolean;
  readonly error: string | null;
}

export const folderSort = ['TITLE_ASC', 'TITLE_DESC'] as const;
export type FolderSort = (typeof folderSort)[number];

export const sortFolders = (folders: Folder[], sort: FolderSort): Folder[] => {
  return [...folders].sort((a, b) => {
    switch (sort) {
      case 'TITLE_ASC':
        return a.title.localeCompare(b.title);
      case 'TITLE_DESC':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });
};
