import { z } from 'zod';
import type { FormFieldType } from '@/types';
import FormDialog from './FormDialog';
const LoginSchema = z.object({
  introduction: z.string().min(1, 'Introduction is required'),
  date: z.date(),
  item: z.enum(['KG', 'LB']),
  isActive: z.boolean(),
});

export const LoginForm = () => {
  const formFields: FormFieldType<typeof LoginSchema>[] = [
    {
      name: 'introduction',
      type: 'textarea',
      label: 'Introduction',
      placeholder: 'Enter your introduction',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      label: 'Date',
      placeholder: 'Select a date',
    },
    {
      name: 'item',
      type: 'select',
      label: 'Item',
      options: [
        { value: 'KG', label: 'KG' },
        { value: 'LB', label: 'LB' },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Is Active',
      placeholder: 'Toggle active state',
    },
  ];
  return (
    <FormDialog
      isOpen={true}
      onClose={() => console.log('Dialog closed')}
      title="Login Form"
      schema={LoginSchema}
      fields={formFields}
      initialData={{ date: new Date(), item: 'KG', isActive: true }}
      onSubmitDo={async (data) => {
        console.log('Form Submitted:', data);
      }}
    />
  );
};
