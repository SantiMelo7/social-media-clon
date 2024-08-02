"use client";

import { singUpSchema, SingUp } from '../../../lib/validation';
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { singUp } from "./actions";
import { PasswordInput } from "../../../components/PasswordInput"
import LoadingButton from '../../../components/LoadingButton';
import FormFieldProps from '../../../components/layout/FormFieldProps'
import LayoutForm from '../../../components/layout/LayoutForm';

export default function SingUpForm() {

    async function handleSignUp(values: SingUp) {
        const { error } = await singUp(values);
        if (error) throw new Error(error);
    }

    return (
        <LayoutForm
            onSubmit={handleSignUp}
            defaultValues={{ username: "", email: "", password: "" }}
            resolver={zodResolver(singUpSchema)}
        >
            {({ isPending, ...form }) => (
                <>
                    <FormFieldProps name="username" form={form} label="Username">
                        {(field) => <Input placeholder="Ingresa tu numero de usuario" {...field} />}
                    </FormFieldProps>
                    <FormFieldProps name="email" form={form} label="Email">
                        {(field) => <Input placeholder="Ingresa tu correo electrónico" type="email" {...field} />}
                    </FormFieldProps>
                    <FormFieldProps name="email" form={form} label="Password">
                        {(field) => <PasswordInput placeholder="Ingresa ua contraseña" {...field} />}
                    </FormFieldProps>
                    <LoadingButton variant="default" type="submit" className="w-full" loading={isPending}>
                        Create account
                    </LoadingButton>
                </>
            )}
        </LayoutForm>
    )
}