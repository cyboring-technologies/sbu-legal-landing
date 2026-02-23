'use client';

import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore
import mammoth from 'mammoth';
import showdown from 'showdown';
import { ENGINE_BASE } from '../../lib/apiConfig';

interface ExecutionViewProps {
  file: File;
  token: string;
  onReset: () => void;
  draftType?: string; // Functional Restoration
}

type ExecutionStatus =
  | 'INIT'
  | 'UPLOADING'
  | 'ANALYZING'
  | 'WAITING_METADATA'
  | 'READY_TO_GENERATE'
  | 'GENERATING'
  | 'REVIEWING'
  | 'COMPLETED'
  | 'INCINERATED'
  | 'ERROR';

interface StructureItem {
  level: number;
  text: string;
}

// Metadata Types matching Engine
interface Metadata {
  structural: {
    dates: Array<{ value: string; source: string }>;
    amounts: Array<{ value: number; currency: string; source: string }>;
    jurisprudence: Array<{ citation: string; role: string; source: string }>;
  };
}

interface MetadataOrigins {
  structural: {
    dates: string[];
    amounts: string[];
    jurisprudence: string[];
  };
}

export const ExecutionView: React.FC<ExecutionViewProps> = ({
  file,
  token,
  onReset,
  draftType,
}) => {
  const [status, setStatus] = useState<ExecutionStatus>('INIT');
  const [jobId, setJobId] = useState<string | null>(null);
  const [sessionKey, setSessionKey] = useState<string | null>(null); // RAM Only
  const [error, setError] = useState<string | null>(null);

  // RESTORED: Explicit Draft Type Selection (Contract 06)
  const [selectedDraftType, setSelectedDraftType] = useState<string>(draftType || '');

  // State for Analysis
  const [structure, setStructure] = useState<StructureItem[]>([]);
  const [extractedText, setExtractedText] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'pdf' | 'docx' | 'unknown'>('unknown');

  // State for Metadata Review
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [metadataOrigins, setMetadataOrigins] = useState<MetadataOrigins | null>(null);

  // State for Draft
  const [draft, setDraft] = useState<string | null>(null);
  const [draftHtml, setDraftHtml] = useState<string | null>(null);

  const converter = new showdown.Converter();
  const mounted = useRef(true);

  // DRAFT TYPES CONSTANT (Contract Sealed)
  const DRAFT_TYPES = {
    INITIATE_PROCESS: 'INITIATE_PROCESS',
    ANSWER_OPPOSE: 'ANSWER_OPPOSE',
    CHALLENGE_APPEAL: 'CHALLENGE_APPEAL',
    REQUEST_MEASURE_ACTION: 'REQUEST_MEASURE_ACTION',
    EXPAND_MODIFY_CLAIM: 'EXPAND_MODIFY_CLAIM',
    COMPLY_EXECUTE: 'COMPLY_EXECUTE',
    INFORM_PROVE: 'INFORM_PROVE',
    WITHDRAW_SETTLE_TERMINATE: 'WITHDRAW_SETTLE_TERMINATE',
  };

  // Cleanup on unmount (PERSISTENCE PROHIBITION)
  useEffect(() => {
    mounted.current = true;
    // Generate Preview URL immediately for Left Column
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFileType(file.type === 'application/pdf' ? 'pdf' : 'docx');
    }

    return () => {
      mounted.current = false;
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (jobId && sessionKey) {
        navigator.sendBeacon(`${ENGINE_BASE}/incinerate`, JSON.stringify({ id: jobId }));
      }
    };
  }, []); // Run once on mount

  // Auto-Start Analysis if Context is Complete (Sovereign Flow)
  useEffect(() => {
    if (status === 'INIT' && file && token && selectedDraftType) {
      startExecution();
    }
  }, [status, file, token, selectedDraftType]); // Auto-fire on mount/ready

  const handleStartAnalysis = async () => {
    // Redundant in Sovereign Flow but kept for safety
    if (!selectedDraftType) return;
    startExecution();
  };

  const startExecution = async () => {
    setStatus('UPLOADING');
    try {
      const formData = new FormData();
      formData.append('file', file);
      // CONTRACT: Explicit Human Choice (Passed from Pre-Auth)
      formData.append('draft_type', selectedDraftType);

      const res = await fetch(`${ENGINE_BASE}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'X-Execution-Token': token,
        },
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      const sessKey = res.headers.get('X-Engine-Session');

      if (!mounted.current) return;

      setJobId(data.id);
      if (sessKey) setSessionKey(sessKey);

      if (sessKey && data.id) {
        setStatus('ANALYZING'); // UI State matches Engine activity
        // Slightly artificial delay to ensure UI updates are perceived? No, speed is better.
        await executePipeline(data.previewType, data.id, sessKey);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Upload Failed');
      setStatus('ERROR');
    }
  };

  // The Engine Pipeline.
  // This is the functional core. Visualization is a side effect.
  const executePipeline = async (type: string, id: string, sessKey: string) => {
    try {
      let textItems: any[] = [];
      let fullText = '';
      let struct: StructureItem[] = [];

      // 1. DATA EXTRACTION (Client-Side Source)
      // This is required because the server does not parse PDFs.
      // We do this to feed the pipeline, not just to show the preview.

      if (type === 'pdf') {
        try {
          // Try dynamic import safely
          // Validated for pdfjs-dist v5.x + Next.js
          // @ts-ignore
          const pdfJW = await import('pdfjs-dist/build/pdf.min.mjs');
          const pdfjsLib = pdfJW;

          // Explicit Worker Version Matching (Critical for v5)
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

          const arrayBuffer = await file.arrayBuffer();
          const loadingTask = pdfjsLib.getDocument(arrayBuffer);
          const pdf = await loadingTask.promise;

          const maxPages = Math.min(pdf.numPages, 5);
          for (let i = 1; i <= maxPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();

            content.items.forEach((item: any) => {
              if (item.str.trim().length > 0) {
                textItems.push({
                  text: item.str,
                  height: item.height || 10,
                });
                fullText += item.str + ' ';
              }
            });
            fullText += '\n';
          }

          struct = textItems.slice(0, 3).map((t) => ({ level: 1, text: t.text }));
        } catch (e: any) {
          console.error('PDF Engine Error:', e);
          // Critical Failure - Report to User
          throw new Error('PDF Engine Failed to Load: ' + e.message);
        }
      } else if (type === 'docx' || type === 'unknown') {
        // Fallback 'unknown' to docx logic or text extraction attempt
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        const docParser = new DOMParser();
        const doc = docParser.parseFromString(result.value, 'text/html');
        fullText = doc.body.innerText;

        const headings = doc.querySelectorAll('h1, h2, h3');
        struct = Array.from(headings).map((h) => ({
          level: parseInt(h.tagName.substring(1)),
          text: (h as HTMLElement).innerText,
        }));

        if (struct.length === 0) {
          struct = [{ level: 1, text: 'Document Content' }];
        }
      }

      if (!mounted.current) return;

      // 2. VISUALIZATION SIDE-EFFECT (Non-Blocking to Pipeline Logic)
      setStructure(struct);
      setExtractedText(fullText);

      // 3. PIPELINE EXECUTION (The Truth)
      // Fire both endpoints. Order is semantic but they could be parallel.

      // Step 3a: Push Structure
      await fetch(`${ENGINE_BASE}/structure`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Engine-Session': sessKey },
        body: JSON.stringify({ id, structure: struct }),
      });

      // Step 3b: Trigger Extraction (The Metadata Step)
      const extractRes = await fetch(`${ENGINE_BASE}/extract`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Engine-Session': sessKey },
        body: JSON.stringify({ id, text: fullText }),
      });

      if (extractRes.ok) {
        const extractData = await extractRes.json();

        // 4. PIPELINE ADVANCEMENT (To HITL)
        setMetadata(extractData.metadata);
        setMetadataOrigins(extractData.metadataOrigins);
        setStatus('WAITING_METADATA');
      } else {
        throw new Error('Extraction Failed');
      }
    } catch (err: any) {
      console.error(err);
      setError('Analysis Failed: ' + err.message);
      setStatus('ERROR');
    }
  };

  // RESTORED: HITL Editing Logic
  const updateMetadata = (category: keyof Metadata['structural'], index: number, value: any) => {
    if (!metadata) return;
    setMetadata((prev) => {
      if (!prev) return null;
      const clone = JSON.parse(JSON.stringify(prev));
      clone.structural[category][index].value = value;
      return clone;
    });
  };

  const handleConfirmMetadata = async () => {
    if (!jobId || !sessionKey || !metadata) return;

    try {
      const res = await fetch(`${ENGINE_BASE}/review_metadata`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Engine-Session': sessionKey },
        body: JSON.stringify({
          id: jobId,
          metadata: metadata,
          metadataOrigins: metadataOrigins,
        }),
      });

      if (!res.ok) throw new Error('Metadata Review Failed');

      setStatus('READY_TO_GENERATE');
    } catch (err: any) {
      alert('Error verifying metadata');
    }
  };

  const handleGenerate = async () => {
    if (!jobId || !sessionKey) return;
    setStatus('GENERATING');

    try {
      const res = await fetch(`${ENGINE_BASE}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Engine-Session': sessionKey },
        body: JSON.stringify({
          id: jobId,
          text: extractedText,
          structure: structure,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      setDraft(data.draft);
      setDraftHtml(converter.makeHtml(data.draft));
      setStatus('REVIEWING');
    } catch (err: any) {
      setError('Generation Failed: ' + err.message);
      setStatus('ERROR');
    }
  };

  const handleDownload = async () => {
    if (!draft || !jobId || !sessionKey) return;

    try {
      const html = converter.makeHtml(draft);
      const body = new FormData();
      body.append('html', html);
      body.append('id', jobId);

      const res = await fetch(`${ENGINE_BASE}/download`, {
        method: 'POST',
        body: body,
        headers: { 'X-Engine-Session': sessionKey },
      });

      if (!res.ok) throw new Error('Download Failed');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'SBU_Legal_Result.doc';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setStatus('COMPLETED');

      // Poll for incineration confirmation
      checkIncineration();
    } catch (err) {
      alert('Download Error');
    }
  };

  const checkIncineration = async () => {
    if (!jobId || !sessionKey) return;
    // Simple poll
    let polls = 0;
    const interval = setInterval(async () => {
      polls++;
      try {
        const res = await fetch(`${ENGINE_BASE}/check-status?id=${jobId}`, {
          headers: { 'X-Engine-Session': sessionKey },
        });
        if (res.status === 410) {
          setStatus('INCINERATED');
          clearInterval(interval);
        }
      } catch (e) {}

      if (polls > 20) clearInterval(interval);
    }, 1000);
  };

  if (status === 'ERROR') {
    return (
      <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 text-white p-4">
        <div className="p-8 bg-red-900 rounded-lg border border-red-500 max-w-lg w-full shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">⚠️</span> Execution Error
          </h2>
          <p className="mb-6 font-mono text-sm bg-black/30 p-4 rounded text-red-200 break-words">
            {error || 'Unknown Error'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-white text-red-900 font-bold rounded hover:bg-gray-100 transition-colors"
          >
            Reset System
          </button>
        </div>
      </div>
    );
  }

  if (status === 'INCINERATED') {
    return (
      <div className="text-center py-20 text-red-600 border-2 border-red-100 rounded-lg bg-red-50">
        <h2 className="text-2xl font-bold mb-2">Session Incinerated</h2>
        <p>The data has been permanently deleted.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        >
          Reset
        </button>
      </div>
    );
  }

  return (
    <div
      data-debug="ENGINE-GRID-ROOT"
      className="w-full h-full p-4 grid grid-cols-3 gap-6 bg-background"
    >
      {/* COLUMN 1 (LEFT): SOURCE PREVIEW (Contractual: Always Visible, Read-Only) */}
      <div className="lg:col-span-1 bg-muted rounded-lg border p-4 flex flex-col">
        <h3 className="font-bold border-b pb-2 mb-4">Source Document</h3>
        <div className="flex-1 bg-card rounded border overflow-hidden">
          {previewUrl && fileType === 'pdf' && (
            <iframe src={previewUrl} className="w-full h-full" />
          )}
          {(fileType === 'docx' || fileType === 'unknown') && (
            <div className="p-4 text-sm overflow-y-auto h-full whitespace-pre-wrap">
              {extractedText || 'Preview Loading...'}
            </div>
          )}
        </div>
      </div>

      {/* COLUMN 2 (CENTER): STRUCTURE, DRAFT TYPE, METADATA (HITL) */}
      <div className="lg:col-span-1 bg-card rounded-lg shadow border p-4 flex flex-col">
        <h3 className="font-bold border-b pb-2 mb-4">Engine Controls</h3>

        {/* 1. DRAFT TYPE SELECTION (Blocking) */}
        <div className="mb-6 border-b pb-4">
          <h4 className="text-sm font-bold text-muted-foreground mb-2">1. Select Draft Intent</h4>
          <select
            value={selectedDraftType}
            onChange={(e) => setSelectedDraftType(e.target.value)}
            disabled={status !== 'INIT'}
            className="w-full p-2 border rounded text-sm bg-background text-foreground"
          >
            <option value="" disabled>
              -- Select Objective --
            </option>
            {Object.entries(DRAFT_TYPES).map(([key, val]) => (
              <option key={key} value={val}>
                {val.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* 2. PROGRESS / STRUCTURE */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-bold text-muted-foreground">2. Processing</h4>
            <span className="text-xs px-2 py-1 bg-muted rounded">{status}</span>
          </div>

          {status === 'INIT' && (
            <button
              onClick={handleStartAnalysis}
              disabled={!selectedDraftType}
              className="w-full py-3 bg-black text-white font-bold rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Type & Analyze
            </button>
          )}

          <div className="overflow-y-auto max-h-[150px] border rounded bg-muted/30 p-2 mt-2">
            {structure.length > 0 ? (
              structure.map((s, i) => (
                <div key={i} style={{ marginLeft: (s.level - 1) * 10 }} className="text-xs py-1">
                  {s.text}
                </div>
              ))
            ) : (
              <span className="text-xs text-gray-400">Waiting for analysis...</span>
            )}
          </div>
        </div>

        {/* 3. METADATA REVIEW (HITL) */}
        {(status === 'WAITING_METADATA' || status === 'READY_TO_GENERATE') && metadata && (
          <div className="flex-1 flex flex-col min-h-0">
            <h4 className="font-bold text-sm mb-2">3. Metadata Review (HITL)</h4>
            <div className="flex-1 overflow-y-auto text-xs space-y-4 mb-2 p-2 border rounded bg-muted/30">
              {/* Dates Editor */}
              <div>
                <h5 className="font-bold text-muted-foreground mb-1">Dates</h5>
                {metadata.structural.dates.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-1">
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => updateMetadata('dates', idx, e.target.value)}
                      className="flex-1 p-1 border rounded bg-background"
                    />
                    <span className="text-[10px] text-gray-400">{item.source}</span>
                  </div>
                ))}
              </div>

              {/* Amounts Editor */}
              <div>
                <h5 className="font-bold text-muted-foreground mb-1">Amounts</h5>
                {metadata.structural.amounts.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-1">
                    <input
                      type="number"
                      value={item.value}
                      onChange={(e) => updateMetadata('amounts', idx, Number(e.target.value))}
                      className="flex-1 p-1 border rounded bg-background"
                    />
                    <span className="text-[10px] text-gray-400">{item.currency}</span>
                  </div>
                ))}
              </div>

              {/* Jurisprudence Editor (RESTORED) */}
              <div>
                <h5 className="font-bold text-muted-foreground mb-1">Jurisprudence</h5>
                {metadata.structural.jurisprudence.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1 mb-2 p-1 border-b pb-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={item.citation}
                        onChange={(e) => {
                          // Complex object update for Jurisprudence
                          if (!metadata) return;
                          setMetadata((prev) => {
                            if (!prev) return null;
                            const clone = JSON.parse(JSON.stringify(prev));
                            clone.structural.jurisprudence[idx].citation = e.target.value;
                            return clone;
                          });
                        }}
                        className="flex-1 p-1 border rounded font-mono bg-background"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span>{item.role}</span>
                      <span>{item.source}</span>
                    </div>
                  </div>
                ))}
                {metadata.structural.jurisprudence.length === 0 && (
                  <span className="text-gray-400 italic">No citations found.</span>
                )}
              </div>
            </div>
            <button
              onClick={handleConfirmMetadata}
              disabled={status !== 'WAITING_METADATA'}
              className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded font-bold text-sm disabled:opacity-50"
            >
              {status === 'WAITING_METADATA' ? 'Confirm Metadata & Unlock' : 'Metadata Confirmed'}
            </button>
          </div>
        )}

        {status === 'READY_TO_GENERATE' && (
          <button
            onClick={handleGenerate}
            className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-bold shadow-lg"
          >
            Generate Draft
          </button>
        )}
      </div>

      {/* COLUMN 3 (RIGHT): DRAFT RESULT (Contractual: Output Only) */}
      <div className="lg:col-span-1 bg-card rounded-lg shadow border p-4 flex flex-col">
        <h3 className="font-bold border-b pb-2 mb-4">Generated Draft</h3>

        {status === 'GENERATING' && (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
          </div>
        )}

        {draftHtml && (
          <div
            className="flex-1 overflow-y-auto prose dark:prose-invert text-sm p-2 border rounded bg-muted/40 mb-4"
            dangerouslySetInnerHTML={{ __html: draftHtml }}
          />
        )}

        {(status === 'REVIEWING' || status === 'COMPLETED') && (
          <div className="space-y-2">
            <button
              onClick={handleDownload}
              disabled={status === 'COMPLETED'}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold shadow"
            >
              {status === 'COMPLETED' ? 'Downloaded' : 'Download Final & Incinerate'}
            </button>

            <button
              onClick={onReset}
              className="w-full py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded text-sm"
            >
              Reject & Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
