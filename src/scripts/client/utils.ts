import { Logger } from 'modules/logger';

export const handleClientRequest = <T>(request: () => T): T => {
  try {
    return request();
  } catch (error) {
    Logger.error(error);
    throw error;
  }
};
