import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Heading } from 'components/common/Heading';
import { FormField } from 'components/forms/FormField';
import { DropdownItem } from 'components/forms/Dropdown';
import { UpdatedContent } from 'components/common/UpdatedContent';

import { useForm } from 'hooks/useForm';
import { SettingsData, TodoPerPage, perPages } from 'models/Settings';

import { updateSettings } from 'store/settings/actions';
import { useAppDispatch, useAppSelector } from 'store/utils';

interface StyledProps {
  readonly $loading?: boolean;
}

const Container = styled.div<StyledProps>`
  ${UpdatedContent};
`;

export const Settings: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { perPage } = useAppSelector((state) => state.settings.data);

  const { fields, setValue } = useForm<SettingsData>({
    initialValues: {
      perPage,
    },
    autoSubmit: true,
    onSubmit: (result) => {
      if (loading) {
        return;
      }
      setLoading(true);

      dispatch(updateSettings(result)).finally(() => {
        setLoading(false);
      });
    },
  });

  const perPageOptions: DropdownItem<number>[] = perPages.map((value) => ({
    id: `${value}`,
    title: `${value}`,
    value,
  }));

  return (
    <div>
      <Heading>{t('page.settings')}</Heading>

      <Container $loading={loading}>
        <FormField
          label={t('settings.perPage')}
          field={{
            type: 'dropdown',
            value: fields.perPage,
            options: perPageOptions,
            onChange: (value) => setValue('perPage', value as TodoPerPage),
          }}
        />
      </Container>
    </div>
  );
};
