import { useCallback, useEffect, useRef, useState } from "react";

export type MarketInsight = {
  symbol: string;
  score: number;
  summary: string;
  details: string;
};

export type UseMarketInsightsArgs = {
  symbols: string[];
  enabled?: boolean;
  // Optional dependency injection for testing
  fetcher?: (symbols: string[], signal: AbortSignal) => Promise<MarketInsight[]>;
};

export function useMarketInsights({
  symbols,
  enabled = true,
  fetcher = defaultFetcher,
}: UseMarketInsightsArgs) {
  const [data, setData] = useState<MarketInsight[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const lastReq = useRef(0);

  const load = useCallback(async () => {
    // Guard internally instead of skipping this hook
    if (!enabled) return;

    const reqId = Date.now();
    lastReq.current = reqId;
    setLoading(true);
    setError(null);

    const ctrl = new AbortController();
    try {
      const result = await fetcher(symbols, ctrl.signal);
      // Only apply the latest request
      if (lastReq.current === reqId) setData(result);
    } catch (e) {
      if ((e as any)?.name !== "AbortError") setError(e as Error);
    } finally {
      if (lastReq.current === reqId) setLoading(false);
    }
    // return abort to caller (for tests) — not used by React effect
    return () => ctrl.abort();
  }, [enabled, fetcher, symbols]);

  useEffect(() => {
    if (!enabled) return; // do nothing; hook still called
    let disposed = false;
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    fetcher(symbols, ctrl.signal)
      .then((res) => {
        if (!disposed) setData(res);
      })
      .catch((e) => {
        if (!disposed && (e as any)?.name !== "AbortError") setError(e as Error);
      })
      .finally(() => {
        if (!disposed) setLoading(false);
      });

    return () => {
      disposed = true;
      ctrl.abort();
    };
  }, [enabled, fetcher, symbols]);

  const refresh = useCallback(() => {
    void load();
  }, [load]);

  return { data, error, loading, refresh } as const;
}

// Simple mock fetcher; replace with real API
async function defaultFetcher(symbols: string[], signal: AbortSignal) {
  // "Why": Keep demo deterministic & cancellable
  await new Promise((r) => setTimeout(r, 350));
  signal.throwIfAborted?.();
  return symbols.map((s, i) => ({
    symbol: s,
    score: Math.max(0, 1 - i * 0.07) * (0.8 + Math.random() * 0.4),
    summary: `Outlook for ${s} based on recent momentum and volume anomalies.`,
    details: `Generated details for ${s}. Replace with real analytics.`,
  }));
}

// Type augmentation for older TS lib targets
declare global {
  interface AbortSignal {
    throwIfAborted?: () => void;
  }
}