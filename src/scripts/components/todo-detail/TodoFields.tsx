import React from 'react';
import { useTranslation } from 'react-i18next';

import { ItemList } from 'components/common/ItemList';
import { DropdownItem } from 'components/forms/Dropdown';
import { TodoField } from 'components/todo-detail/TodoField';

import { TodoData } from 'models/Todo';
import { FormErrors } from 'hooks/useForm';
import { useAppSelector } from 'store/utils';

interface Props {
  readonly loading?: boolean;
  readonly fields: TodoData;
  readonly errors: FormErrors<TodoData>;
  readonly onChange: <T extends keyof TodoData>(
    field: T,
    value: TodoData[T],
  ) => void;
}

export const TodoFields: React.FC<Props> = ({
  loading = false,
  fields,
  errors,
  onChange,
}) => {
  const { t } = useTranslation();
  const folders = useAppSelector((state) => state.folder.items);

  const folderOptions: DropdownItem<string>[] = folders.map((folder) => ({
    id: folder.id,
    title: folder.title,
    value: folder.id,
  }));

  folderOptions.unshift({
    id: '-',
    title: t('todo.folderSelect'),
    value: '',
  });

  return (
    <ItemList loading={loading}>
      <TodoField
        label={t('todo.title')}
        error={errors.title}
        field={{
          type: 'text',
          value: fields.title,
          maxLength: 80,
          onChange: (value) => onChange('title', value),
        }}
      />
      <TodoField
        label={t('todo.folder')}
        error={errors.folder}
        field={{
          type: 'dropdown',
          value: fields.folder,
          options: folderOptions,
          onChange: (value) => onChange('folder', value),
        }}
      />
      <TodoField
        label={t('todo.done')}
        error={errors.isDone}
        field={{
          type: 'checkbox',
          value: fields.isDone,
          onChange: (value) => onChange('isDone', value),
        }}
      />
      <TodoField
        label={t('todo.description')}
        error={errors.description}
        field={{
          type: 'text',
          textarea: true,
          value: fields.description,
          maxLength: 500,
          onChange: (value) => onChange('description', value),
        }}
        vertical
      />
    </ItemList>
  );
};
