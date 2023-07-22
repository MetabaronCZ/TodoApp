export type TodoFolderData = {
  readonly title: string;
};

export interface TodoFolder extends TodoFolderData {
  readonly id: string;
  readonly items: string[];
}
