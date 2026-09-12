import { useFlashToast } from '@/hooks/use-flash-toast';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

function Toaster({ ...props }: ToasterProps) {
    useFlashToast();

    return (
        <Sonner
            position="bottom-right"
            toastOptions={{
                duration: 5000,
                className: 'animated-toast',
                style: {
                    background: 'var(--color-white)',
                    color: 'var(--color-ink)',
                    border: '1px solid var(--color-rule)',
                    borderRadius: '4px',
                    boxShadow: '0 4px 20px rgba(28,25,23,0.09)',
                    fontSize: '14px',
                },
            }}
            {...props}
        />
    );
}

export { Toaster };
