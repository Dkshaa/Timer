const STORAGE_KEY = "timer:selected-minutes";

export function loadStoredMinutes() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function saveStoredMinutes(minutes) {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(minutes));
  } catch {
    // The timer still works when storage is unavailable.
  }
}
