import React from 'react';
import { useTranslation } from 'react-i18next';

import { ItemList } from 'components/common/ItemList';
import { FormField } from 'components/forms/FormField';

import { FormErrors } from 'hooks/useForm';
import { FolderData } from 'models/Folder';

interface Props {
  readonly loading?: boolean;
  readonly fields: FolderData;
  readonly errors?: FormErrors<FolderData>;
  readonly onChange: <T extends keyof FolderData>(
    field: T,
    value: FolderData[T],
  ) => void;
}

export const FolderFields: React.FC<Props> = ({
  loading = false,
  fields,
  errors = {},
  onChange,
}) => {
  const { t } = useTranslation();
  return (
    <ItemList loading={loading}>
      <FormField
        label={t('folder.title')}
        error={errors.title}
        field={{
          type: 'text',
          value: fields.title,
          maxLength: 80,
          onChange: (value) => onChange('title', value),
        }}
      />
    </ItemList>
  );
};
