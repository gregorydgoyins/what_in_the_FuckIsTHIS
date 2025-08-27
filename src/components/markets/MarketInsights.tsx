import React, { useEffect, useMemo, useState } from "react";
import { useMarketInsights, type MarketInsight } from "../../hooks/useMarketInsights";

/**
 * MarketInsights
 *
 * Fixes the hooks-order bug by:
 * 1) Calling all hooks unconditionally at the top level.
 * 2) Using derived flags inside effects instead of conditional hook calls.
 * 3) Using child components for mapped lists (no hooks inside array callbacks).
 */
export default function MarketInsights({
  symbols = ["AAPL", "MSFT", "GOOGL"],
}: {
  symbols?: string[];
}) {
  // ✅ Always call hooks in the same order; never guard them with conditionals
  const [selected, setSelected] = useState<string | null>(null);
  const enabled = symbols.length > 0;

  // ✅ Custom hook is called unconditionally; the hook internally checks `enabled`
  const { data, loading, error, refresh } = useMarketInsights({ symbols, enabled });

  // ✅ Pure derivations can be memoized safely (unconditional)
  const sorted = useMemo<MarketInsight[]>(() => {
    if (!data) return [];
    return [...data].sort((a, b) => b.score - a.score);
  }, [data]);

  // ✅ Side-effects are unconditional; internal guards avoid conditional hook order changes
  useEffect(() => {
    if (!enabled) return;
    if (sorted.length && !selected) setSelected(sorted[0].symbol);
  }, [enabled, sorted, selected]);

  // UI states are derived from values above; returning different JSX is fine
  if (!enabled) {
    return (
      <div className="p-6 rounded-2xl border shadow-sm">
        <h2 className="text-xl font-semibold">Market Insights</h2>
        <p className="mt-2 text-sm">Provide at least one symbol to load insights.</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl border shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Market Insights</h2>
        <button
          onClick={refresh}
          className="px-3 py-1.5 rounded-xl border text-sm hover:bg-gray-50 active:scale-[.99]"
          aria-label="Refresh insights"
        >
          Refresh
        </button>
      </div>

      {loading && (
        <div className="text-sm animate-pulse">Loading insights…</div>
      )}

      {error && (
        <div role="alert" className="text-sm text-red-600">
          Failed to load insights: {error.message}
        </div>
      )}

      {!loading && !error && sorted.length === 0 && (
        <div className="text-sm">No insights available.</div>
      )}

      {!loading && !error && sorted.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sorted.map((insight) => (
            <InsightCard
              key={insight.symbol}
              insight={insight}
              selected={selected === insight.symbol}
              onSelect={() => setSelected(insight.symbol)}
            />
          ))}
        </div>
      )}

      {selected && (
        <DetailPanel
          insight={sorted.find((i) => i.symbol === selected) || sorted[0]}
        />
      )}
    </div>
  );
}

function InsightCard({
  insight,
  selected,
  onSelect,
}: {
  insight: MarketInsight;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`text-left p-4 rounded-2xl border shadow-sm transition-transform ${
        selected ? "ring-2 ring-offset-2" : "hover:scale-[1.01]"
      }`}
      aria-pressed={selected}
    >
      <div className="flex items-center justify-between">
        <div className="font-medium">{insight.symbol}</div>
        <div className="text-sm tabular-nums">{insight.score.toFixed(2)}</div>
      </div>
      <p className="mt-2 text-sm line-clamp-3">{insight.summary}</p>
    </button>
  );
}

function DetailPanel({ insight }: { insight: MarketInsight }) {
  return (
    <div className="p-4 rounded-2xl border bg-gray-50">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{insight.symbol}</h3>
        <span className="text-sm">Score: {insight.score.toFixed(2)}</span>
      </div>
      <p className="mt-2 text-sm whitespace-pre-wrap">{insight.details}</p>
    </div>
  );
}