import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { type FormBodyProps, FormBody } from './FormBody';

export interface FormDialogProps<
  TSchema extends z.ZodObject<Record<string, any>>
> extends FormBodyProps<TSchema> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function FormDialog<
  TSchema extends z.ZodObject<Record<string, any>>
>({ isOpen, onClose, title, ...formBodyProps }: FormDialogProps<TSchema>) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <FormBody {...formBodyProps} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
}
