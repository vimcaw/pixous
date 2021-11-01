import {
  Form as PrimitiveForm,
  TextField as PrimitiveTextField,
  NumberField as PrimitiveNumberField,
} from '@adobe/react-spectrum';
import { SpectrumFormProps } from '@react-types/form';
import { useForm, Controller } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types/form';
import { FieldValues, UseFormReturn } from 'react-hook-form/dist/types';
import { UseControllerProps } from 'react-hook-form/dist/types/controller';
import { SpectrumTextFieldProps } from '@react-types/textfield';
import { SpectrumNumberFieldProps } from '@react-types/numberfield';
import { pick, omit } from 'lodash';
import { createContext, useContext } from 'react';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

const FormContext = createContext<UseFormReturn | undefined>(undefined);

function useFormContext() {
  const form = useContext(FormContext);
  if (!form) throw new Error('XXXField component must be wrapped by Form component');
  return form;
}

export function Form<TFieldValues extends FieldValues = FieldValues>({
  children,
  onSubmit = () => {},
  ...rest
}: Omit<SpectrumFormProps, 'onSubmit'> & { onSubmit?: SubmitHandler<TFieldValues> }) {
  const form = useForm<TFieldValues>();
  const { handleSubmit } = form;

  return (
    <PrimitiveForm {...rest} onSubmit={handleSubmit(onSubmit)}>
      <FormContext.Provider value={form as UseFormReturn}>{children}</FormContext.Provider>
    </PrimitiveForm>
  );
}

export function sortProps<T extends Record<string, any>>(
  props: UseControllerProps & RegisterOptions & T
) {
  const controllerKeys = ['name', 'rules', 'shouldUnregister', 'defaultValue', 'control'] as const;
  const ruleKeys = [
    'required',
    'min',
    'max',
    'maxLength',
    'minLength',
    'pattern',
    'validate',
    'valueAsNumber',
    'valueAsDate',
    'setValueAs',
    'shouldUnregister',
  ] as const;
  return {
    controllerProps: pick(props, controllerKeys) as UseControllerProps,
    ruleProps: pick(props, ruleKeys) as UseControllerProps,
    restProps: omit(props, [...controllerKeys, ...ruleKeys]) as unknown as T,
  };
}

function useField<T extends Record<string, any>>(
  props: UseControllerProps & RegisterOptions & T
): { controllerProps: UseControllerProps; fieldProps: T } {
  const { controllerProps, ruleProps, restProps } = sortProps(props);
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return {
    controllerProps: {
      ...controllerProps,
      control,
      rules: ruleProps,
    },
    fieldProps: {
      ...restProps,
      validationState: errors[props.name] ? 'invalid' : undefined,
    },
  };
}

export function TextField(
  props: UseControllerProps & RegisterOptions & Omit<SpectrumTextFieldProps, 'isRequired'>
) {
  const { controllerProps, fieldProps } = useField(props);

  return (
    <Controller
      {...controllerProps}
      render={({ field }) => (
        <PrimitiveTextField {...field} {...fieldProps} value={field.value ?? ''} />
      )}
    />
  );
}

export function NumberField(
  props: UseControllerProps & RegisterOptions & Omit<SpectrumNumberFieldProps, 'isRequired'>
) {
  const { controllerProps, fieldProps } = useField(props);

  return (
    <Controller
      {...controllerProps}
      render={({ field }) => <PrimitiveNumberField {...field} {...fieldProps} />}
    />
  );
}
