import React, { useState } from 'react';
import { Input } from '../ui/input';
import { cn } from '../../lib/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from '../ui/button';
import styles from '../../app/styles/authentication.module.css'
import { InputProps } from '@/interfaces/ui';

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false)
        return (
            <div className={styles.containerShowPassword}>
                <Input type={showPassword ? "text" : "password"} className={cn("pe-10", className)} ref={ref} {...props}
                />
                <Button variant="defaultNotBg" type='button' onClick={() => setShowPassword(!showPassword)} title={showPassword ? "Hide Password" : "Show"}
                    className={styles.showPassword}
                >
                    {showPassword ? <EyeIcon className={styles.iconsShow} /> : <EyeOffIcon className={styles.iconsShow} />}
                </Button>
            </div>
        )
    }
)

PasswordInput.displayName = "PasswordInput"

export { PasswordInput }