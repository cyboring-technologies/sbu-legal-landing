'use client';

import React from 'react';
import { AuthorityProvider } from './AuthorityContext';
import { SovereignEngine } from './SovereignEngine';

export default function RuntimeShell() {
    return (
        <AuthorityProvider>
            <SovereignEngine />
        </AuthorityProvider>
    );
}
