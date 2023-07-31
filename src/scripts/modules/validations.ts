import { TFunction } from 'i18next';
import { FormValidation } from 'hooks/useForm';

interface Validations {
  readonly REQUIRED: FormValidation<string>;
}

export const getValidations = (t: TFunction): Validations => ({
  REQUIRED: {
    message: t('validations.REQUIRED'),
    test: (value) => !!value,
  },
});
