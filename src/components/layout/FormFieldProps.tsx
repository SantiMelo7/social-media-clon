import { FieldValues } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import React from 'react';
import { ContainerFormProps } from '../../interfaces/formFieldProps';

export default function FormFieldProps<TFieldValues extends FieldValues>({ form, name, label, children }: ContainerFormProps<TFieldValues>) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={(field) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        {children(field)}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}