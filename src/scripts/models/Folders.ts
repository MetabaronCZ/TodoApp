import { Folder } from 'models/Folder';

export interface Folders {
  readonly items: Folder[];
  readonly loading: boolean;
  readonly error: string | null;
}

export const folderSort = ['TITLE_ASC', 'TITLE_DESC'] as const;
export type FolderSort = (typeof folderSort)[number];

type SortFn = (a: Folder, b: Folder) => number;

const sortFn: Record<FolderSort, SortFn> = {
  TITLE_ASC: (a, b) => a.title.localeCompare(b.title),
  TITLE_DESC: (a, b) => b.title.localeCompare(a.title),
};

export const sortFolders = (folders: Folder[], sort: FolderSort): Folder[] => {
  return [...folders].sort(sortFn[sort]);
};
