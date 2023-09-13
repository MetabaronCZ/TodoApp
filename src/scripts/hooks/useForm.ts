import { useEffect, useState } from 'react';

type FormData = Record<string, unknown>;

export interface FormValidation<T> {
  readonly message: string;
  readonly test: (value: T) => boolean;
}

type FormValidations<T extends FormData> = {
  readonly [field in keyof T]?: FormValidation<T[field]>[];
};

interface FormConfig<T extends FormData> {
  readonly initialValues: T;
  readonly validations?: FormValidations<T>;
  readonly autoSubmit?: boolean;
  readonly onSubmit?: (data: T) => void;
}

export type FormErrors<T extends FormData> = Partial<
  Record<keyof T, string | null>
>;

const validateField = <T extends FormData, U extends keyof T>(
  validations: FormValidations<T>,
  field: U,
  value: T[U],
): string | null => {
  const fieldValidations = validations[field] ?? [];
  let error: string | null = null;

  for (const { message, test } of fieldValidations) {
    if (!test(value)) {
      error = message;
      break;
    }
  }
  return error;
};

const submit = <T extends FormData>(
  fields: T,
  validations: FormValidations<T>,
  onSubmit?: (data: T) => void,
): FormErrors<T> => {
  const errors: FormErrors<T> = {};
  let hasErrors = false;

  for (const item of Object.entries(fields)) {
    const field = item[0] as keyof T;
    const value = item[1] as T[typeof field];

    const error = validateField(validations, field, value);
    errors[field] = error;
    hasErrors = error ? true : hasErrors;
  }
  if (!hasErrors && onSubmit) {
    onSubmit(fields);
  }
  return errors;
};

interface UseForm<T extends FormData> {
  readonly fields: T;
  readonly errors: FormErrors<T>;
  readonly setValue: <U extends keyof T>(field: U, value: T[U]) => void;
  readonly submit: () => void;
}

export const useForm = <T extends FormData>(
  config: FormConfig<T>,
): UseForm<T> => {
  const {
    initialValues,
    autoSubmit = false,
    validations = {} as FormValidations<T>,
    onSubmit,
  } = config;

  const [fields, setFields] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [submitRequest, setSubmitRequest] = useState(false);

  // validate on form submit request
  useEffect(() => {
    if (submitRequest) {
      const formErrors = submit(fields, validations, onSubmit);
      setErrors(formErrors);
      setSubmitRequest(false);
    }
  }, [fields, onSubmit, submitRequest, validations]);

  return {
    fields,
    errors,
    setValue: (field, value) => {
      const error = validateField(validations, field, value);
      setErrors((state) => ({ ...state, [field]: error }));
      setFields((state) => ({ ...state, [field]: value }));

      if (autoSubmit) {
        setSubmitRequest(true);
      }
    },
    submit: () => {
      setSubmitRequest(true);
    },
  };
};
