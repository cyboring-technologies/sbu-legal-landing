import React from 'react';

export type AntiPageData = {
    slug: string;
    service: string;
    jurisdiction: string;
    variant: string;
    audience: string;
    seo?: {
        title?: string;
        description?: string;
        canonical?: string;
    };
};

export type AntiPageProps = {
    data: AntiPageData;
};

export default function AntiPage({ data }: AntiPageProps) {
    const h1Content = `${data.service} in ${data.jurisdiction}`;

    return (
        <main>
            <section id="hero">
                <h1>{h1Content}</h1>
            </section>

            <section id="context">
                <h2>Context</h2>
                <p>
                    Execution parameter constraints defined for {data.audience} operating within {data.jurisdiction}.
                    This service strictly deploys {data.variant} compliance matrices.
                </p>
            </section>

            <section id="execution-scope">
                <h2>Execution Scope</h2>
                <p>
                    Scope encompasses the deterministic delivery of {data.service}.
                    All resultant outputs conform precisely to the predefined statutory boundaries of the jurisdiction.
                </p>
            </section>

            <section id="irreversibility-statement">
                <h2>Irreversibility Statement</h2>
                <p>
                    Architectural incineration enforced. Operations are executed in a single, unidirectional event horizon.
                    There are no accounts, no saved states, no persistent workspaces, and no mechanism to return later.
                </p>
            </section>

            <section id="process-summary">
                <h2>Process Summary</h2>
                <p>
                    1. Propagate parameters to the Sovereign Engine.<br />
                    2. Validate constraints in isolated runtime.<br />
                    3. Instantaneous generation and handover of the final legal artifact.<br />
                    4. Absolute destruction of session data upon delivery.
                </p>
            </section>

            <section id="trust-guarantees">
                <h2>Structural Guarantees</h2>
                <p>
                    Execution is guaranteed strictly by protocol invariability.
                    Outcome logic remains fully decentralized from human discretion, relying purely on the deterministic engine architecture.
                </p>
            </section>

            <section id="cta-block">
                <a href="https://engine.sbu-legal.com" target="_blank" rel="noopener noreferrer">
                    Start Execution
                </a>
            </section>
        </main>
    );
}
