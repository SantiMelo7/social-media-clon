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
        <LayoutAuth title='Sing Up' description='Lorem Sunt fugiat magna occaecat non fugiat esse pariatur esse sunt ad aute incididunt' img={SingUpImg.src} link='/login' linkText='Al ready have a account? Log in' >
            <SingUpForm />
        </LayoutAuth>
    )
}