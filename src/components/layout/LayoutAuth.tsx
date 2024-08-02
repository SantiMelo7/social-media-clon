import React from 'react'
import styles from '../../app/styles/authentication.module.css';
import Link from 'next/link';
import { LayoutAuthProps } from '@/interfaces/ui';

export default function LayoutAuth({ children, img }: LayoutAuthProps) {
    return (
        <main className={styles.mainContainer}>
            <div className={styles.containerCardForm}>
                <div className={styles.containerLeft}>
                    <div>
                        <div className={styles.containerTextLeft}>
                            <h1 className={styles.titleLeft}>Sing Up</h1>
                            <p className={styles.descriptionContentLeft}>
                                Lorem Sunt fugiat magna occaecat non fugiat esse pariatur esse sunt ad aute incididunt
                            </p>
                        </div>
                        <div className={styles.containerSpaceContent}>
                            <div className={styles.spaceFormTop}>
                                {children}
                            </div>
                            <Link href='/login' className={styles.linkToRedirect}>
                                Al ready have a account? Log in
                            </Link>
                        </div>
                    </div>
                </div>
                <img src={img} className={styles.imgRight} alt='Sing Up Img' />
            </div>
        </main>
    )
}