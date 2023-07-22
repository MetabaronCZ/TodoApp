const requestTimeout = 500; // in milliseconds
let idCounter = 0; // created item identificator counter

export const mockApiRequest = <T>(fn: () => T): Promise<T> => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      try {
        const response = fn();
        resolve(response);
      } catch (error) {
        reject(error);
      }
    }, requestTimeout);
  });
};

export const mockCreatedId = (namespace: string): string => {
  return `${namespace}-${idCounter++}`;
};
