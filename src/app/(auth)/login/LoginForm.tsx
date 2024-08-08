"use client";

import LayoutForm from "@/components/layout/LayoutForm";
import { loginSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Login } from "../../../lib/validation"
import FormFieldProps from "@/components/layout/FormFieldProps";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/PasswordInput";
import LoadingButton from '../../../components/LoadingButton';
import { login } from "./actions";
import { useState } from "react";

export default function LoginForm() {
    const [error, setError] = useState<string>()
    async function handleLogin(values: Login) {
        const { error } = await login(values);
        if (error) setError(error);
    }
    return (
        <LayoutForm
            onSubmit={handleLogin}
            defaultValues={{ username: "", password: "" }}
            resolver={zodResolver(loginSchema)}
        >
            {({ isPending, ...form }) => (
                <>
                    {error && <p className="text-center text-destructive">{error}</p>}
                    <FormFieldProps form={form} name="username" label="Username">
                        {(field) => <Input placeholder="Ingresa tu número de usuario" {...field} />}
                    </FormFieldProps>
                    <FormFieldProps name="password" form={form} label="Password">
                        {(field) => <PasswordInput placeholder="Ingresa tu contraseña" {...field} />}
                    </FormFieldProps>
                    <LoadingButton variant="secondary" type="submit" loading={isPending}>
                        Login
                    </LoadingButton>
                </>
            )}
        </LayoutForm>
    )
}