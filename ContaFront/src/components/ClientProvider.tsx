// src/components/ClientProvider.tsx
"use client"; // Marca este componente para que se ejecute en el lado del cliente

import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import environment from '../lib/relay-environment';

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <RelayEnvironmentProvider environment={environment}>
            {children}
        </RelayEnvironmentProvider>
    );
};

export default ClientProvider;