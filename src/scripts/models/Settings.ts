export const perPages = [25, 30, 50] as const;
export type TodoPerPage = (typeof perPages)[number];

export type SettingsData = {
  readonly perPage: TodoPerPage;
};

export type Settings = {
  readonly loading: boolean;
  readonly error: string | null;
  readonly data: SettingsData;
};
