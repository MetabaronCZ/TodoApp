import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Button } from 'components/button/Button';
import { Heading } from 'components/common/Heading';
import { Paragraph } from 'components/common/Paragraph';
import { FolderFields } from 'components/folder-detail/FolderFields';
import { FolderDetailToolbar } from 'components/folder-detail/FolderDetailToolbar';

import { toVU } from 'modules/theme';
import { paths } from 'modules/paths';
import { useForm } from 'hooks/useForm';
import { Folder, FolderData } from 'models/Folder';
import { getValidations } from 'modules/validations';

import { useAppDispatch } from 'store/utils';
import { createFolder, editFolder } from 'store/folders/actions';

const StyledParagraph = styled(Paragraph)`
  margin-top: ${toVU(1)};
`;

const ButtonList = styled.div`
  border-top: ${({ theme }) => theme.border.light};
`;

type FormFields = FolderData;

interface Props {
  readonly data?: Folder | null;
  readonly fetchError?: boolean;
}

export const FolderDetail: React.FC<Props> = ({ data, fetchError = false }) => {
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
          navigate(paths.FOLDER_LIST);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <div>
      <Heading>
        {data || fetchError ? t('page.folderDetail') : t('page.folderCreate')}
      </Heading>

      <FolderDetailToolbar disabled={loading} />

      {fetchError ? (
        <StyledParagraph>{t('error.detailLoading')}</StyledParagraph>
      ) : (
        <>
          <FolderFields
            loading={loading}
            fields={fields}
            errors={errors}
            onChange={setValue}
          />

          <ButtonList>
            <Button
              ico={data ? 'edit' : 'plus'}
              text={data ? t('edit') : t('create')}
              disabled={loading}
              onClick={submit}
            />
          </ButtonList>
        </>
      )}
    </div>
  );
};
