import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Modal = ({ btnText, variant, children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div>
            <div className="
                tw-fixed
                tw-inset-0
                tw-flex
                tw-items-center
                tw-justify-center
                tw-bg-gray-800
                tw-bg-opacity-60
                tw-backdrop-blur-sm"
            >
                <AnimatePresence>
                    <motion.div
                        initial={{
                            y: 500
                        }}
                        animate={{
                            y: 0,
                            backdropFilter: blur
                        }}
                        exit={{
                            y: 500,
                            transition: { duration: 0.25 }
                        }}
                        transition={{ duration: 0.25 }}
                        className="tw-bg-white tw-rounded tw-shadow-lg tw-w-96"
                    >
                        <div className='tw-flex tw-justify-end'>
                            <button
                                className="tw-px-3 tw-py-2 tw-rounded"
                                onClick={onClose}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                            </button>
                        </div>
                        {children}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Modal;