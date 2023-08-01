export const pathImages = '/images';
export const pathFonts = '/fonts';

export const folderSearchParamId = 'folder';

export const paths = {
  HOME: '/',
  FOLDER: (folder: string) => {
    const search = new URLSearchParams();
    search.append(folderSearchParamId, folder);
    return `/?${search.toString()}`;
  },
  NOTE_CREATE: '/note/create',
  NOTE_DETAIL: (id: string) => `/note/${id}`,
  FOLDER_CREATE: '/folder/create',
  FOLDER_DETAIL: (id: string) => `/folder/${id}`,
  ERROR404: '*',
};

export type PathId = keyof typeof paths;
