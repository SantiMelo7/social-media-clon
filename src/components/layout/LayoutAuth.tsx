/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from '../../app/styles/authentication.module.css';
import { LayoutAuthProps } from '@/interfaces/ui';
import Links from './Links';
import GoogleSingInButton from '@/app/(auth)/login/GoogleSingInButton';

export default function LayoutAuth({ children, img, title, description, link, linkText }: LayoutAuthProps) {
    return (
        <main className={styles.mainContainer}>
            <div className={styles.containerCardForm}>
                <div className={styles.containerLeft}>
                    <div>
                        <div className={styles.containerTextLeft}>
                            <h1 className={styles.titleLeft}>{title}</h1>
                            <div className='space-y-5'>
                                <GoogleSingInButton />
                            </div>
                            <div className='flex justify-center items-center'>
                                <p className='font-bold text-xl uppercase'>Or</p>
                            </div>
                            <p className={styles.descriptionContentLeft}>
                                {description}
                            </p>
                        </div>
                        <div className={styles.containerSpaceContent}>
                            <div className={styles.spaceFormTop}>
                                {children}
                            </div>
                            <Links url={link} className={styles.linkToRedirect}>
                                {linkText}
                            </Links>
                        </div>
                    </div>
                </div>
                <img src={img} className={styles.imgRight} alt={title} />
            </div>
        </main>
    )
}