import { Buffer } from "buffer";

// Solana deps expect Node's Buffer to exist.
// Important: we must set this BEFORE importing any Solana modules.
(globalThis as any).Buffer = Buffer;
(window as any).Buffer = Buffer;

import("./bootstrap");

