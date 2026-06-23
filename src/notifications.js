export function canNotify() {
  return "Notification" in window;
}

export async function requestNotificationPermission() {
  if (!canNotify()) {
    return "unsupported";
  }

  if (Notification.permission === "granted") {
    return "granted";
  }

  if (Notification.permission === "denied") {
    return "denied";
  }

  return Notification.requestPermission();
}

export function notifyTimerComplete() {
  if (!canNotify() || Notification.permission !== "granted") {
    return false;
  }

  new Notification("Timer complete", {
    body: "Your countdown finished.",
  });

  return true;
}
