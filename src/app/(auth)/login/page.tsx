/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next';
import LoginImg from '../../../../public/assets/login-image.jpg';
import LayoutAuth from '../../../components/layout/LayoutAuth';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
    title: "Login"
}

export default function SingUpPage() {
    return (
        <LayoutAuth title='Login' link='/singup'
            img={LoginImg.src} linkText='Don&apos;t have an account? Sing Up'
        >
            <LoginForm />
        </LayoutAuth>
    )
}