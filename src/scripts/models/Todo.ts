export type TodoData = {
  readonly title: string;
  readonly description: string;
  readonly folder: string | null;
  readonly isDone: boolean;
};

export interface Todo extends TodoData {
  readonly id: string;
  readonly created: number;
}
