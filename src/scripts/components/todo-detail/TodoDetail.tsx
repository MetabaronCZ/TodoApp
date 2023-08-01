import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Button } from 'components/button/Button';
import { Heading } from 'components/common/Heading';
import { Paragraph } from 'components/common/Paragraph';
import { TodoFields } from 'components/todo-detail/TodoFields';
import { TodoDetailToolbar } from 'components/todo-detail/TodoDetailToolbar';

import { toVU } from 'modules/theme';
import { paths } from 'modules/paths';
import { useForm } from 'hooks/useForm';
import { Todo, TodoData } from 'models/Todo';
import { getValidations } from 'modules/validations';

import { useAppDispatch, useAppSelector } from 'store/utils';
import { createTodo, editTodo } from 'store/todos/actions';

const StyledParagraph = styled(Paragraph)`
  margin-top: ${toVU(1)};
`;

type FormFields = TodoData;

interface Props {
  readonly data?: Todo | null;
  readonly fetchError?: boolean;
}

export const TodoDetail: React.FC<Props> = ({ data, fetchError = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const folder = useAppSelector((state) => state.todo.filter.folder);

  const validations = getValidations(t);

  const { fields, errors, setValue, submit } = useForm<FormFields>({
    initialValues: {
      title: data?.title ?? '',
      folder: data ? data.folder : folder,
      isDone: data?.isDone ?? false,
      description: data?.description ?? '',
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
        ? dispatch(editTodo({ id: data.id, data: result }))
        : dispatch(createTodo(result));

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
      <TodoDetailToolbar disabled={loading} />

      <Heading>
        {data || fetchError ? t('page.todoDetail') : t('page.todoCreate')}
      </Heading>

      {fetchError ? (
        <StyledParagraph>{t('error.detailLoading')}</StyledParagraph>
      ) : (
        <>
          <TodoFields
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
        </>
      )}
    </div>
  );
};
