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
  CREATE: '/create',
  DETAIL: (id: string) => `/detail/${id}`,
  ERROR404: '*',
};

export type PathId = keyof typeof paths;
