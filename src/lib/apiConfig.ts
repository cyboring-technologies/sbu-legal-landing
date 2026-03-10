import { ENGINE_ORIGIN } from '../config/runtimeOrigins';

export const ENGINE_BASE = ENGINE_ORIGIN;
export const GATEWAY_BASE = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8787';
