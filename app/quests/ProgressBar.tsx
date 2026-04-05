"use client";

/** Progress bar. `value` is 1-based current (e.g. 3), `total` is max (e.g. 10). */
export default function ProgressBar({ value, total, className = "w-64" }: { value: number; total: number; className?: string }) {
  return (
    <div className={`progress-track ${className}`}>
      <div className="progress-fill" style={{ width: `${(value / total) * 100}%` }} />
    </div>
  );
}
