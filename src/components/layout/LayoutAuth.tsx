/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from '../../app/styles/authentication.module.css';
import Link from 'next/link';
import { LayoutAuthProps } from '@/interfaces/ui';

export default function LayoutAuth({ children, img, title, description, link, linkText }: LayoutAuthProps) {
    return (
        <main className={styles.mainContainer}>
            <div className={styles.containerCardForm}>
                <div className={styles.containerLeft}>
                    <div>
                        <div className={styles.containerTextLeft}>
                            <h1 className={styles.titleLeft}>{title}</h1>
                            <p className={styles.descriptionContentLeft}>
                                {description}
                            </p>
                        </div>
                        <div className={styles.containerSpaceContent}>
                            <div className={styles.spaceFormTop}>
                                {children}
                            </div>
                            <Link href={link} className={styles.linkToRedirect}>
                                {linkText}
                            </Link>
                        </div>
                    </div>
                </div>
                <img src={img} className={styles.imgRight} alt={title} />
            </div>
        </main>
    )
}