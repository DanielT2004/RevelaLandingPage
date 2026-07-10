/**
 * Formats a number of seconds as a timecode.
 * `H:MM:SS` when there's an hour, otherwise `M:SS`. Shared by the edit-time
 * counter (CountUp) and the scroll scrubber so both read as one clock.
 */
export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(sec).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`;
}
