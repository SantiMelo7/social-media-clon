/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next';
import SingUpForm from './SingUpForm';
import LayoutAuth from '../../../components/layout/LayoutAuth';
import SingUpImg from '../../../../public/assets/signup-image.jpg';

export const metadata: Metadata = {
    title: "Sing Up"
}

export default function SingUpPage() {
    return (
        <LayoutAuth img={SingUpImg.src}>
            <SingUpForm />
        </LayoutAuth>
    )
}