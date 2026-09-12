interface LockableScreenOrientation extends ScreenOrientation {
  lock: (orientation: "landscape") => Promise<void>;
}

const getLockableOrientation = () =>
  screen.orientation as LockableScreenOrientation | undefined;

export const lockLandscape = async () => {
  if (!document.fullscreenEnabled) return;

  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    }
    const orientation = getLockableOrientation();
    if (typeof orientation?.lock !== "function") return;
    await orientation.lock("landscape");
  } catch {
    // desktop, iOS Safari, or lock denied — battle still plays
  }
};

export const unlockOrientation = () => {
  try {
    getLockableOrientation()?.unlock();
  } catch {
    // unlock throws if never locked
  }
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
};
