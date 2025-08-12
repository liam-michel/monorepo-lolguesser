import { z } from 'zod';
import { FormBody } from './FormBody';

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(20),
  over18: z.string().transform((val) => parseInt(val) > 18),
});

export const LoginForm = () => {
  return (
    <FormBody
      schema={LoginSchema}
      fields={[
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Email' },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
        { name: 'over18', label: 'Are you over 18?', type: 'text' },
      ]}
      onSubmitDo={async (data) => {
        console.log('Form Submitted:', data);
      }}
    />
  );
};
