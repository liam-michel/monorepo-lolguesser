import type { FormFieldType } from '../types';
import { z } from 'zod';
import {
  useForm,
  type SubmitHandler,
  type DefaultValues,
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
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface FormBodyProps<TSchema extends z.ZodObject<Record<string, any>>> {
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
      case 'email':
      case 'password':
      case 'number':
        return (
          <FormItem>
            <FormLabel>{field.label}</FormLabel>
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
            <FormLabel>{field.label}</FormLabel>
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
            <FormLabel>{field.label}</FormLabel>
            <Select>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input {...register(field.name)} type="hidden" />
            {error && <FormMessage>{error}</FormMessage>}
          </FormItem>
        );

      case 'checkbox':
        return (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox {...register(field.name)} disabled={field.disabled} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>{field.label}</FormLabel>
            </div>
            {error && <FormMessage>{error}</FormMessage>}
          </FormItem>
        );

      case 'switch':
        return (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">{field.label}</FormLabel>
            </div>
            <FormControl>
              <Switch {...register(field.name)} disabled={field.disabled} />
            </FormControl>
            {error && <FormMessage>{error}</FormMessage>}
          </FormItem>
        );

      case 'date':
        return (
          <FormItem>
            <FormLabel>{field.label}</FormLabel>
            <FormControl>
              <Input
                {...register(field.name)}
                type="date"
                disabled={field.disabled}
              />
            </FormControl>
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
        <div className="space-y-4">{fields.map(renderField)}</div>

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
