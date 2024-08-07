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

export default function LoginForm() {
    async function handleLogin(values: Login) {
        const { error } = await login(values);
        if (error) throw new Error(error);
    }
    return (
        <LayoutForm
            onSubmit={handleLogin}
            defaultValues={{ username: "", password: "" }}
            resolver={zodResolver(loginSchema)}
        >
            {({ isPending, ...form }) => (
                <>
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