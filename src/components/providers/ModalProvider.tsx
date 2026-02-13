'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import SecurityModal from '../SecurityModal';

interface ModalContextType {
    openSecurityModal: () => void;
    closeSecurityModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);

    const openSecurityModal = () => setIsSecurityModalOpen(true);
    const closeSecurityModal = () => setIsSecurityModalOpen(false);

    return (
        <ModalContext.Provider value={{ openSecurityModal, closeSecurityModal }}>
            {children}
            <SecurityModal isOpen={isSecurityModalOpen} onClose={closeSecurityModal} />
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
