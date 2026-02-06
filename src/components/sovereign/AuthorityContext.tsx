'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthorityContextType {
    isAuthorityGranted: boolean;
    token: string | null;
    grantAuthority: (token: string) => void;
}

const AuthorityContext = createContext<AuthorityContextType | undefined>(undefined);

export function AuthorityProvider({ children }: { children: ReactNode }) {
    const [isAuthorityGranted, setIsAuthorityGranted] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const grantAuthority = (newToken: string) => {
        setToken(newToken);
        setIsAuthorityGranted(true);
    };

    return (
        <AuthorityContext.Provider value={{ isAuthorityGranted, token, grantAuthority }}>
            {children}
        </AuthorityContext.Provider>
    );
}

export function useAuthority() {
    const context = useContext(AuthorityContext);
    if (!context) {
        throw new Error('useAuthority must be used within an AuthorityProvider');
    }
    return context;
}
