import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from "react-icons/io5";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
}

const BOX_modal = ({ isOpen, onClose, children, title }: ModalProps) => {
    // Handle body scroll locking when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup function
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

    if (!isOpen) return null;

    // Get modal root element
    const modalRoot = typeof document !== 'undefined'
        ? document.getElementById('modal_root')
        : null;

    if (!modalRoot) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 overflow-y-auto"
            aria-modal="true"
            role="dialog"
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"
                aria-hidden="true"
                onClick={onClose}
            />

            {/* Modal container */}
            <div className="flex min-h-screen items-center justify-center p-4 text-center sm:block">
                {/* Center alignment trick */}
                <span
                    className="hidden sm:inline-block sm:h-screen sm:align-middle"
                    aria-hidden="true"
                >
                    &#8203;
                </span>

                {/* Modal card */}
                <div
                    className="inline-block w-full max-w-md transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:max-w-lg"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    {title && (
                        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
                            <h3
                                className="text-lg font-semibold text-gray-900 dark:text-white"
                                id="modal-title"
                            >
                                {title}
                            </h3>
                            <button
                                onClick={onClose}
                                className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none dark:hover:bg-gray-700"
                                aria-label="Close"
                            >
                                <IoClose className="h-6 w-6" />
                            </button>
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-4">
                        {children}
                    </div>

                    {/* Footer (optional) */}
                    {!title && (
                        <div className="flex justify-end border-t border-gray-200 p-3 dark:border-gray-700">
                            <button
                                onClick={onClose}
                                className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default BOX_modal;