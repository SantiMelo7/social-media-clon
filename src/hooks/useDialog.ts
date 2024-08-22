export function useDialogDelete(useHook: any, onClose: () => void) {
    const mutation = useHook()
    function handleOpenChange(open: boolean) {
        if (!open || !mutation.isPending) {
            onClose()
        }
    }
    return { mutation, handleOpenChange }
}