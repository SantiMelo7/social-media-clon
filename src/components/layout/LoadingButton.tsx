import React from 'react';
import { LoadingButtonProps } from '../../interfaces/ui';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react'

export default function LoadingButton({ loading, disabled, className, ...props }: LoadingButtonProps) {
    return (
        <Button
            disabled={loading || disabled}
            className={cn("flex justify-center items-center gap-2 w-full", className)}
            {...props}
        >
            {loading && <Loader2 className='size-3 animate-spin' />}
            {props.children}
        </Button>
    )
}