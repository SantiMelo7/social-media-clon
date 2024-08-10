"use client";

import { singUpSchema, SingUp } from '../../../lib/validation';
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "../../../components/PasswordInput"
import LoadingButton from '../../../components/LoadingButton';
import FormFieldProps from '../../../components/layout/FormFieldProps'
import LayoutForm from '../../../components/layout/LayoutForm';
import { singUp } from './actions';
import { useState } from 'react';

export default function SingUpForm() {
    const [error, setError] = useState<string>()
    async function handleSingUp(values: SingUp) {
        console.log(values);
        const { error } = await singUp(values);
        if (error) setError(error);
    }
    return (
        <LayoutForm
            onSubmit={handleSingUp}
            defaultValues={{ username: "", displayName: "", email: "", password: "" }}
            resolver={zodResolver(singUpSchema)}
        >
            {({ isPending, ...form }) => (
                <>
                    {error && <p className="text-center text-destructive">{error}</p>}
                    <FormFieldProps name="username" form={form} label="Username">
                        {(field) => <Input placeholder="Ingresa tu nombre completo" {...field} />}
                    </FormFieldProps>
                    <FormFieldProps name="displayName" form={form} label="Display Name">
                        {(field) => <Input placeholder="Ingresa tu nombre de usuario" {...field} />}
                    </FormFieldProps>
                    <FormFieldProps name="email" form={form} label="Email">
                        {(field) => <Input placeholder="Ingresa tu correo electrónico" type="email" {...field} />}
                    </FormFieldProps>
                    <FormFieldProps name="password" form={form} label="Password">
                        {(field) => <PasswordInput placeholder="Ingresa una contraseña" {...field} />}
                    </FormFieldProps>
                    <LoadingButton variant="default" type="submit" loading={isPending}>
                        Create account
                    </LoadingButton>
                </>
            )}
        </LayoutForm>
    )
}