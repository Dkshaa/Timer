export function clampMinutes(value, fallback = 25) {
  const minutes = Number.parseInt(value, 10);

  if (Number.isNaN(minutes)) {
    return fallback;
  }

  return Math.min(Math.max(minutes, 1), 180);
}

export function secondsFromMinutes(minutes) {
  return clampMinutes(minutes) * 60;
}

export function formatTime(totalSeconds) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return {
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export function getNextTick(remainingSeconds) {
  return Math.max(0, remainingSeconds - 1);
}
