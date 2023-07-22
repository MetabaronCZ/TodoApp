export type FolderData = {
  readonly title: string;
};

export interface Folder extends FolderData {
  readonly id: string;
  readonly items: string[];
}
