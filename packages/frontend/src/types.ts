import { z } from 'zod';
import type { Path } from 'react-hook-form';
export type FormFieldDataType =
  | 'text'
  | 'number'
  | 'password'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'date';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SelectOption<T = any> = {
  value: T;
  label: string;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseFormField<TSchema extends z.ZodObject<Record<string, any>>> = {
  name: Path<z.input<TSchema>>;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SelectFormField<TSchema extends z.ZodObject<Record<string, any>>> =
  BaseFormField<TSchema> & {
    type: 'select';
    options: SelectOption<z.input<TSchema>[Path<z.input<TSchema>>]>[];
  };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NonSelectFormField<TSchema extends z.ZodObject<Record<string, any>>> =
  BaseFormField<TSchema> & {
    type: Exclude<FormFieldDataType, 'select'>;
    options?: never;
  };
// Use z.input for form field configuration since fields work with input types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormFieldType<TSchema extends z.ZodObject<Record<string, any>>> =
  | SelectFormField<TSchema>
  | NonSelectFormField<TSchema>;
