import type { FormFieldType } from '../types';
import { DatePicker } from './DatePicker';
import { z } from 'zod';
import {
  useForm,
  type SubmitHandler,
  type DefaultValues,
  Controller,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FormBodyProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TSchema extends z.ZodObject<Record<string, any>>
> {
  schema: TSchema;
  fields: FormFieldType<TSchema>[];
  onSubmitDo?: SubmitHandler<z.output<TSchema>>;
  submitLabel?: string;
  initialData?: DefaultValues<z.input<TSchema>>; // Changed this line
  onCancel?: () => void;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FormBody<TSchema extends z.ZodObject<Record<string, any>>>({
  schema,
  fields,
  onSubmitDo,
  submitLabel = 'Submit',
  initialData,
  onCancel,
}: FormBodyProps<TSchema>) {
  const form = useForm<z.input<TSchema>, unknown, z.output<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  const {
    register,
    handleSubmit,
    resetField,
    control,
    formState: { errors, isSubmitting },
  } = form;
  const onSubmit: SubmitHandler<z.output<TSchema>> = async (data) => {
    console.log('Form Submitted:', data);
    // Log the data types
    Object.entries(data).forEach(([key, value]) => {
      console.log(`${key}: ${typeof value}`);
    });
    if (onSubmitDo) {
      await onSubmitDo(data); // Call the provided submit handler
    }
  };
  const renderField = (field: FormFieldType<TSchema>) => {
    const error = errors[field.name]?.message as string | undefined;
    switch (field.type) {
      case 'text':
      case 'password':
      case 'number':
        return (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>{field.label}</FormLabel>
              <Button onClick={() => resetField(field.name)}>
                hi <Button />
              </Button>
            </div>
            <FormControl>
              <Input
                {...register(field.name)}
                type={field.type}
                placeholder={field.placeholder}
                disabled={field.disabled}
              />
            </FormControl>
            {error && <FormMessage>{error}</FormMessage>}
          </FormItem>
        );

      case 'textarea':
        return (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>{field.label}</FormLabel>
              <Button onClick={() => resetField(field.name)} />
            </div>
            <FormControl>
              <Textarea
                {...register(field.name)}
                placeholder={field.placeholder}
                disabled={field.disabled}
              />
            </FormControl>
            {error && <FormMessage>{error}</FormMessage>}
          </FormItem>
        );

      case 'select':
        return (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>{field.label}</FormLabel>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => resetField(field.name)}
              >
                Reset
              </Button>
            </div>
            <Controller
              name={field.name}
              control={control}
              render={({ field: controllerField }) => (
                <Select
                  onValueChange={controllerField.onChange}
                  defaultValue={String(controllerField.value)}
                  value={(controllerField.value as string) || ''}
                  disabled={field.disabled}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem
                        key={String(option.value)}
                        value={String(option.value)}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {error && <FormMessage>{error}</FormMessage>}
          </FormItem>
        );

      case 'checkbox':
        return (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <Controller
              name={field.name}
              control={control}
              render={({ field: controllerField }) => (
                <FormControl>
                  <Checkbox
                    checked={(controllerField.value as boolean) || false}
                    onCheckedChange={controllerField.onChange}
                    disabled={field.disabled}
                  />
                </FormControl>
              )}
            />
            <div className="flex items-center justify-between w-full">
              <FormLabel>{field.label}</FormLabel>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => resetField(field.name)}
              >
                Reset
              </Button>
            </div>
            {error && <FormMessage>{error}</FormMessage>}
          </FormItem>
        );

      case 'date':
        return (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>{field.label}</FormLabel>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => resetField(field.name)}
              >
                Reset
              </Button>
            </div>
            <Controller
              name={field.name}
              control={control}
              render={({ field: controllerField }) => (
                <FormControl>
                  <DatePicker
                    value={controllerField.value as Date}
                    onChange={controllerField.onChange}
                    placeholder={field.placeholder || 'Pick a date'}
                    disabled={field.disabled}
                    className="w-full"
                  />
                </FormControl>
              )}
            />
            {error && <FormMessage>{error}</FormMessage>}
          </FormItem>
        );

      default:
        return null;
    }
  };
  return (
    <Form {...form}>
      <form className="tutorial gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name as string}>{renderField(field)}</div>
          ))}
        </div>
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Loading...' : submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </form>
    </Form>
  );
}
