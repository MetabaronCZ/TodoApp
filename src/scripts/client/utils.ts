export const handleClientRequest = <T>(request: () => T): T => {
  try {
    return request();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw error;
  }
};
