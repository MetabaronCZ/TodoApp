export const perPages = [25, 30, 50] as const;
export type TodoPerPage = (typeof perPages)[number];

export type Settings = {
  readonly perPage: TodoPerPage;
};
