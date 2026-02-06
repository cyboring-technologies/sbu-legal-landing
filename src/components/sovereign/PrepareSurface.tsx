'use client';

import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PDFDocument } from 'pdf-lib';
import { Loader2, Zap } from 'lucide-react';
import { useAuthority } from './AuthorityContext';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_TYooMQauvdEDq54NiTphI7jx');

const DRAFT_TYPES = [
    { id: 'lease', name: 'Lease Agreement' },
    { id: 'nda', name: 'Non-Disclosure Agreement' },
    { id: 'services', name: 'Service Agreement' },
    { id: 'demand', name: 'Legal Demand Letter' },
];

interface PrepareSurfaceProps {
    onContextReady: (file: File, draftType: string) => void;
}

function ExecutionTrigger({ onSuccess, onError }: { onSuccess: (t: string) => void, onError: (m: string) => void }) {
    const stripe = useStripe();
    const elements = useElements();
    const [status, setStatus] = useState<string>("idle");
    const { grantAuthority } = useAuthority();

    const handleExecute = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        // VISUAL MASKING: "Initializing Engine..."
        // The user perceives this as the system booting up, not a bank transaction.
        setStatus("processing");

        // 1. Invisible Payment
        const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
        });

        if (stripeError) {
            onError("Initialization Error: " + (stripeError.message || "Unknown"));
            setStatus("idle");
            return;
        }

        if (paymentIntent && paymentIntent.status === "succeeded") {
            try {
                // 2. Invisible Token Issuance
                const res = await fetch('/api/gateway/checkout/finalize', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ paymentIntentId: paymentIntent.id })
                });

                if (!res.ok) throw new Error("Auth Issuance Failed");
                const { token } = await res.json();

                // 3. Silent Grant (Internal State Flip)
                // No visual callback invoked here that would reset UI. 
                // Context updates -> RuntimeShell flips mode -> ExecutionView mounts.
                grantAuthority(token);

                // Note: onSuccess is not strictly needed if grantAuthority triggers the unmount,
                // but good for completeness.
                onSuccess(token);

            } catch (e) {
                onError("Execution Initialization Failed. Contact Support.");
                setStatus("idle");
            }
        }
    };

    return (
        <div className="mt-4 border-t pt-4">
            <h4 className="text-sm font-bold text-gray-700 mb-2">3. Execution Parameters</h4>
            <div className="mb-4 bg-gray-50 p-3 rounded border">
                <label className="block text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wide">Billing Configuration</label>
                <PaymentElement options={{ layout: 'tabs' }} />
            </div>

            <button
                onClick={handleExecute}
                disabled={status === 'processing' || !stripe}
                className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded shadow-lg flex items-center justify-center gap-2 transition-all"
            >
                {status === 'processing' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                {status === 'processing' ? 'Initializing Engine...' : `Execute Sequence`}
            </button>
        </div>
    );
}

export function PrepareSurface({ onContextReady }: PrepareSurfaceProps) {
    const [file, setFile] = useState<File | null>(null);
    const [pageCount, setPageCount] = useState<number>(0);
    const [draftType, setDraftType] = useState<string>('lease');
    // @ts-ignore
    const [quote, setQuote] = useState<number | null>(null);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState(1);

    // Internal Preview
    const [previewContent, setPreviewContent] = useState<string>('');
    const [structureContent, setStructureContent] = useState<string[]>([]);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [fileType, setFileType] = useState<'pdf' | 'docx' | 'unknown'>('unknown');

    // Sync context to shell
    useEffect(() => {
        if (file && draftType) {
            onContextReady(file, draftType);
        }
    }, [file, draftType, onContextReady]);

    // 1. FILE UPLOAD & ANALYSIS
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setError(null);
            setIsProcessing(true);

            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);

            try {
                if (selectedFile.type === 'application/pdf') {
                    setFileType('pdf');
                    const arrayBuffer = await selectedFile.arrayBuffer();
                    const pdfDoc = await PDFDocument.load(arrayBuffer);
                    setPageCount(pdfDoc.getPageCount());
                    setPreviewContent("PDF Source Loaded");
                    setStructureContent(["Header 1", "Header 2", "Header 3"]); // Simulated structure for pre-auth

                } else if (selectedFile.name.endsWith('.docx')) {
                    setFileType('docx');
                    const simulatedPages = Math.max(1, Math.ceil(selectedFile.size / 15000));
                    setPageCount(simulatedPages);
                    setPreviewContent("DOCX Source Loaded");
                    setStructureContent(["Header 1", "Header 2"]);
                } else {
                    setError("Invalid file type.");
                    setFile(null);
                    return;
                }
                setStep(2);
            } catch (err) {
                console.error("Analysis failed", err);
                setError("Failed to analyze file.");
                setFile(null);
            } finally {
                setIsProcessing(false);
            }
        }
    };

    // 2. GET QUOTE & INTENT
    useEffect(() => {
        if (pageCount > 0 && draftType && file) {
            fetch('/api/gateway/checkout/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pageCount, fileType: file.name.split('.').pop(), draftType })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.price) setQuote(data.price);
                    return fetch('/api/gateway/checkout/intent', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ pageCount, fileType: file.name.split('.').pop(), draftType })
                    });
                })
                .then(res => res.json())
                .then(data => {
                    if (data.clientSecret) setClientSecret(data.clientSecret);
                })
                .catch(err => console.error("Quote/Intent failed", err));
        }
    }, [pageCount, draftType, file]);

    return (
        <div className="engine-container">
            <header className="engine-header">
                <div className="text-xl"><strong>SBU-Legal</strong> | B3 Draft Generator</div>
            </header>

            <div className="engine-card">
                <div className="engine-status-bar">
                    Status: <span className="font-mono text-gray-500">READY</span>
                    <span style={{ float: 'right', color: '#666' }}>ID: PRE-001</span>
                </div>
            </div>

            <div className="engine-grid">
                {/* COLUMN 1: SOURCE DOCUMENT (Matched to ExecutionView) */}
                <div className="engine-panel relative">
                    <h3 className="font-bold border-b pb-2 mb-4">Source Document</h3>
                    <div className="flex-1 bg-white rounded border overflow-hidden">
                        {previewUrl && fileType === 'pdf' && (
                            <iframe src={previewUrl} className="w-full h-full" />
                        )}
                        {(fileType === 'docx' || fileType === 'unknown') && (
                            <div className="p-4 text-sm overflow-y-auto h-full whitespace-pre-wrap">
                                {previewContent || "Waiting for upload..."}
                            </div>
                        )}
                        {!previewUrl && (
                            <div className="engine-scroll-area bg-gray-50 flex items-center justify-center text-gray-400">
                                Waiting for file...
                            </div>
                        )}
                    </div>
                </div>

                {/* COLUMN 2: ENGINE CONTROLS (Matched to ExecutionView) */}
                <div className="engine-panel relative">
                    <h3 className="font-bold border-b pb-2 mb-4">Engine Controls</h3>

                    {/* 1. SELECTION */}
                    <div className="mb-6 border-b pb-4">
                        <h4 className="text-sm font-bold text-gray-700 mb-2">1. Select Draft Intent</h4>
                        <select
                            className="w-full p-2 border rounded text-sm bg-white"
                            value={draftType}
                            onChange={(e) => setDraftType(e.target.value)}
                            disabled={step > 1}
                        >
                            {DRAFT_TYPES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </div>

                    {/* 2. UPLOAD */}
                    <div className="mb-4">
                        <h4 className="text-sm font-bold text-gray-700 mb-2">2. Processing Input</h4>
                        {step === 1 ? (
                            <input
                                type="file"
                                accept=".pdf,.docx"
                                onChange={handleFileChange}
                                className="inline-block w-full text-sm text-gray-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-full file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-black file:text-white
                                  hover:file:bg-gray-800"
                            />
                        ) : (
                            <div className="flex justify-between items-center bg-gray-50 p-2 rounded border">
                                <span className="font-mono text-sm">
                                    {file?.name} ({pageCount} pgs)
                                </span>
                                <button className="text-xs text-red-600 underline" onClick={() => { setStep(1); setFile(null); setClientSecret(null); }}>
                                    Reset
                                </button>
                            </div>
                        )}
                    </div>

                    {/* 3. EXECUTION TRIGGER (Formerly Payment) */}
                    {step === 2 && clientSecret && (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <ExecutionTrigger
                                onSuccess={() => { }} // Handled by Context
                                onError={(msg) => setError(msg)}
                            />
                        </Elements>
                    )}
                    {error && <div className="text-red-600 mt-2 text-sm font-mono">{error}</div>}
                </div>

                {/* COLUMN 3: GENERATED DRAFT (Matched to ExecutionView) */}
                <div className="engine-panel relative bg-gray-50">
                    <h3 className="font-bold border-b pb-2 mb-4 text-gray-400">Generated Draft</h3>
                    <div className="flex-1 flex items-center justify-center text-gray-400 italic text-sm">
                        Waiting for execution sequence...
                    </div>
                </div>
            </div>
        </div>
    );
}
