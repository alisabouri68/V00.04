import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
    isOpen: boolean;
    closeOnOutsideClick?: boolean;
    // showCloseButton?: boolean;
    className?: string;
}

const BOX_modal = ({
    children,
    isOpen,
    onClose,
    closeOnOutsideClick = true,
    // showCloseButton = true,
    className = ""
}: ModalProps) => {
    // Handle body scroll locking when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle Escape key press
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    const modalRoot = typeof document !== 'undefined'
        ? document.getElementById('modal_root')
        : null;

    if (!isOpen || !modalRoot) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeOnOutsideClick ? onClose : undefined}
        >
            <div
                className={`relative bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto ${className}`}
                onClick={(e) => e.stopPropagation()}
            >


                <div className="">
                    {children}
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default BOX_modal;