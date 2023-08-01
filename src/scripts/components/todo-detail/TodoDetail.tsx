import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/button/Button';
import { TodoFields } from 'components/todo-detail/TodoFields';
import { TodoDetailToolbar } from 'components/todo-detail/TodoDetailToolbar';

import { paths } from 'modules/paths';
import { useForm } from 'hooks/useForm';
import { Todo, TodoData } from 'models/Todo';
import { getValidations } from 'modules/validations';

import { useAppDispatch } from 'store/utils';
import { createTodo, editTodo } from 'store/todos/actions';

type FormFields = TodoData;

interface Props {
  readonly data?: Todo | null;
}

export const TodoDetail: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const validations = getValidations(t);

  const { fields, errors, setValue, submit } = useForm<FormFields>({
    initialValues: {
      title: data?.title ?? '',
      folder: data?.folder ?? '',
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
    </div>
  );
};
