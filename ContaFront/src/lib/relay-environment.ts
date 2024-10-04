// src/lib/relay-environment.ts

import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const fetchQuery = async (operation: any, variables: any) => {
    const response = await fetch('http://localhost:8000/graphql/', { // Asegúrate de que esta URL apunte a tu servidor GraphQL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    });

    return response.json();
};

const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
});

export default environment;
