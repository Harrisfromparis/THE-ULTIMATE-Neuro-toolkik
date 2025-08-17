import { useEffect, useState } from 'react';

type HealthSummary = {
  lastChecked: string;
  checkedCount: number;
  okCount: number;
  browserOkCount: number;
  badCount: number;
  allOk: boolean;
};

export default function LinkHealthBanner() {
  const [summary, setSummary] = useState<HealthSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/link-health.json', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('status ' + r.status))))
      .then((data) => {
        if (!alive) return;
        setSummary(data);
      })
      .catch((e) => {
        if (!alive) return;
        setError(String(e));
      });
    return () => {
      alive = false;
    };
  }, []);

  if (error) return null; // don't block UI
  if (!summary) return null;

  const badgeClass = summary.allOk
    ? 'bg-green-600 text-white'
    : summary.badCount === 0
    ? 'bg-amber-600 text-white'
    : 'bg-red-600 text-white';

  return (
    <div className="w-full flex justify-center mt-2">
      <span className={`text-sm px-3 py-1 rounded-full ${badgeClass}`}>
        {summary.allOk
          ? `All ${summary.checkedCount} links operational`
          : `Links OK: ${summary.okCount} · Browser-OK: ${summary.browserOkCount} · Issues: ${summary.badCount}`}
        <span className="opacity-80 ml-2">(checked {new Date(summary.lastChecked).toLocaleString()})</span>
      </span>
    </div>
  );
}
