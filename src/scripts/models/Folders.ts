import { Folder } from 'models/Folder';

export interface Folders {
  readonly items: Folder[];
  readonly loading: boolean;
  readonly error: string | null;
}
