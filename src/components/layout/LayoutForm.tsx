import { Form } from '../ui/form';
import React, { useState, useTransition } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import styles from '../../app/styles/authentication.module.css';
import { LayoutFormProps } from '@/interfaces/ui';

export default function LayoutForm<TFieldValues extends FieldValues>({ children, onSubmit, defaultValues, resolver }: LayoutFormProps<TFieldValues>) {
    const [error, setError] = useState<string>();
    const [isPending, startTransition] = useTransition();
    const form = useForm<TFieldValues>({
        resolver,
        defaultValues,
    });

    async function handleSubmit(values: TFieldValues) {
        setError(undefined);
        startTransition(async () => {
            try {
                await onSubmit(values);
            } catch (err: any) {
                setError(err.message || 'Something went wrong');
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className={styles.formContainer}>
                {error && <p className="text-center text-destructive">{error}</p>}
                {children({ ...form, isPending })}
            </form>
        </Form>
    );
}