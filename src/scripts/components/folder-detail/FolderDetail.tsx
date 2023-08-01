import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/button/Button';
import { FolderFields } from 'components/folder-detail/FolderFields';
import { FolderDetailToolbar } from 'components/folder-detail/FolderDetailToolbar';

import { paths } from 'modules/paths';
import { useForm } from 'hooks/useForm';
import { Folder, FolderData } from 'models/Folder';
import { getValidations } from 'modules/validations';

import { useAppDispatch } from 'store/utils';
import { createFolder, editFolder } from 'store/folders/actions';

type FormFields = FolderData;

interface Props {
  readonly data?: Folder | null;
}

export const FolderDetail: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const validations = getValidations(t);

  const { fields, errors, setValue, submit } = useForm<FormFields>({
    initialValues: {
      title: data?.title ?? '',
    },
    validations: {
      title: [validations.REQUIRED],
    },
    onSubmit: (result) => {
      if (loading) {
        return;
      }
      setLoading(true);

      const submitAction = data
        ? dispatch(editFolder({ id: data.id, data: result }))
        : dispatch(createFolder(result));

      submitAction
        .then(() => {
          navigate(paths.HOME);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <div>
      <FolderDetailToolbar disabled={loading} />

      <FolderFields
        loading={loading}
        fields={fields}
        errors={errors}
        onChange={setValue}
      />

      <div>
        <Button
          ico={data ? 'edit' : 'plus'}
          text={data ? t('edit') : t('create')}
          disabled={loading}
          onClick={submit}
        />
      </div>
    </div>
  );
};
