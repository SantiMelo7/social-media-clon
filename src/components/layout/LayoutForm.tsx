import { Form } from '../ui/form';
import React, { useTransition } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import styles from '../../app/styles/authentication.module.css';
import { LayoutFormProps } from '@/interfaces/ui';

export default function LayoutForm<TFieldValues extends FieldValues>({ children, onSubmit, defaultValues, resolver }: LayoutFormProps<TFieldValues>) {
    const [isPending, startTransition] = useTransition();
    const form = useForm<TFieldValues>({
        resolver,
        defaultValues,
    });

    async function handleSubmit(values: TFieldValues) {
        startTransition(async () => {
            try {
                await onSubmit(values);
            } catch { }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className={styles.formContainer}>
                {children({ ...form, isPending })}
            </form>
        </Form>
    );
}