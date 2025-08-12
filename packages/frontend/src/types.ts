import { z } from 'zod';
import type { Path } from 'react-hook-form';
export type FormFieldDataType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'switch'
  | 'date';

// Use z.input for form field configuration since fields work with input types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormFieldType<TSchema extends z.ZodObject<Record<string, any>>> = {
  name: Path<z.input<TSchema>>;
  label: string;
  type: FormFieldDataType;
  options?: string[] | number[]; // Simplified for select fields
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};
