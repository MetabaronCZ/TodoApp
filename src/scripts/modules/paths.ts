export const pathImages = '/images';
export const pathFonts = '/fonts';

export const paths = {
  HOME: '/',
  CREATE: '/create',
  DETAIL: (id: string) => `/detail/${id}`,
  ERROR404: '*',
};

export type PathId = keyof typeof paths;
