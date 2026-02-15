'use client';

import React from 'react';
import RuntimeShell from '../../../components/sovereign/RuntimeShell';

export default function EnginePage() {
    return (
        <div className="w-screen h-screen overflow-hidden flex items-center justify-center bg-black text-white">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Legacy Surface Deprecated</h1>
                <p>Please use the Engine V2 directly at <a href="http://localhost:8788/" className="text-blue-400 underline">localhost:8788</a></p>
            </div>
            {/* <RuntimeShell /> */}
        </div>
    );
}
