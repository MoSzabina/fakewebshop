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
                    background: 'parchment',
                    color: 'ink',
                    border: '3px solid rule',
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
