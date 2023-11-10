import { ParsedQs } from 'qs';

type Param = string | string[] | ParsedQs | ParsedQs[];

const requestTimeout = 500; // in milliseconds
let idCounter = 0; // created item identificator counter

export const mockApiRequest = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), requestTimeout);
  });
};

export const mockCreatedId = (namespace: string): string => {
  return `${namespace}-${idCounter++}`;
};

export const mockParseParam = (param?: Param): string => {
  return param
    ? Array.isArray(param)
      ? param.length > 0
        ? `${param[0]}`
        : ''
      : `${param}`
    : '';
};

export const mockParseInteger = (param?: Param): number | null => {
  const stringParam = mockParseParam(param);
  const numberParam = parseInt(stringParam, 10);
  return !isNaN(numberParam) ? numberParam : null;
};

export const mockParseParamArray = (param?: Param): string[] => {
  return param
    ? Array.isArray(param)
      ? param.map((item) => `${item}`)
      : `${param || ''}`.split('|')
    : [];
};
