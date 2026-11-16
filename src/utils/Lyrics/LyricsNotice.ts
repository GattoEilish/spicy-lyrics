import { IsCardMode, PageContainer } from "../../components/Pages/PageView.ts";
import { IsCompactMode } from "../../components/Utils/CompactMode.ts";
import Fullscreen from "../../components/Utils/Fullscreen.ts";
import { SyncNowBarSide } from "../../components/Utils/NowBar.ts";
import { BuildBugReport, CopyText, DISCORD_INVITE_URL } from "../BugReport.ts";
import { IsQueueOpen } from "../../components/Utils/QueueView.ts";
import { t, type TranslationKey } from "../i18n.ts";
import { $showNoLyricsNotice } from "../stores.ts";

type NoticeCopy = {
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
  /** Offer "Try again": the cause is temporary and a refetch can clear it. */
  retry?: boolean;
  /**
   * Offer "Copy details". Only where a report tells us something; states that
   * are working as designed (DJ, podcasts, local files...) would just be noise.
   */
  report?: boolean;
};

const NOTICES: Record<string, NoticeCopy> = {
  "lyrics-not-found": {
    titleKey: "notice.lyricsNotFound.title",
    bodyKey: "notice.lyricsNotFound.body",
    report: true,
  },
  "dj": {
    titleKey: "notice.dj.title",
    bodyKey: "notice.dj.body",
  },
  "ad": {
    titleKey: "notice.ad.title",
    bodyKey: "notice.ad.body",
  },
  "unknown-track": {
    titleKey: "notice.unknownTrack.title",
    bodyKey: "notice.unknownTrack.body",
    report: true,
  },
  "unknown-error": {
    titleKey: "notice.unknownError.title",
    bodyKey: "notice.unknownError.body",
    retry: true,
    report: true,
  },
  "offline": {
    titleKey: "notice.offline.title",
    bodyKey: "notice.offline.body",
    retry: true,
  },
  "service-unavailable": {
    titleKey: "notice.serviceUnavailable.title",
    bodyKey: "notice.serviceUnavailable.body",
    retry: true,
    report: true,
  },
  "rate-limited": {
    titleKey: "notice.rateLimited.title",
    bodyKey: "notice.rateLimited.body",
    retry: true,
    report: true,
  },
  "status-not-200": {
    titleKey: "notice.statusNot200.title",
    bodyKey: "notice.statusNot200.body",
    retry: true,
    report: true,
  },
  "video-track": {
    titleKey: "notice.videoTrack.title",
    bodyKey: "notice.videoTrack.body",
  },
  "episode-track": {
    titleKey: "notice.episodeTrack.title",
    bodyKey: "notice.episodeTrack.body",
  },
  "mixed-track": {
    titleKey: "notice.mixedTrack.title",
    bodyKey: "notice.mixedTrack.body",
  },
  "local-track": {
    titleKey: "notice.localTrack.title",
    bodyKey: "notice.localTrack.body",
  },
};

export function HasNotice(descriptor: string): boolean {
  return Object.hasOwn(NOTICES, descriptor);
}

/**
 * The notices that only say the song has no lyrics, with nothing to retry.
 * Turning off `$showNoLyricsNotice` hides these; errors keep theirs.
 */
const NO_LYRICS_NOTICES = new Set([
  "lyrics-not-found",
  "local-track",
  "dj",
  "ad",
  "video-track",
  "episode-track",
  "mixed-track",
]);

export const IsNoLyricsNotice = (descriptor: string): boolean => NO_LYRICS_NOTICES.has(descriptor);

// The notice the lyrics area holds, or null while it holds lyrics (or a loader).
let shownNotice: string | null = null;

export function SetShownNotice(descriptor: string | null): void {
  shownNotice = descriptor;
}

function shouldHideLyricsArea(): boolean {
  if (!shownNotice || !PageContainer) return false;
  // The open queue takes the lyrics column, so the column stays.
  if (IsQueueOpen()) return false;
  // The NPV card has its own switch (Hide When a Song Has No Lyrics), which removes it.
  if (IsCardMode) return false;
  if (!$showNoLyricsNotice.get() && NO_LYRICS_NOTICES.has(shownNotice)) return true;
  // Fullscreen, Cinema View and the popup show the song on its own instead of the
  // notice. Compact mode keeps the notice: the song info is already beside it.
  return (
    (shownNotice === "lyrics-not-found" || shownNotice === "local-track") &&
    !IsCompactMode() &&
    (Fullscreen.IsOpen || Fullscreen.CinemaViewOpen)
  );
}

/**
 * Hides or reveals the lyrics area for the notice it holds. The single place that
 * decides it: call after anything that changes the notice, compact mode, fullscreen
 * or the setting.
 */
export function SyncNoLyricsLayout(): void {
  const page = PageContainer;
  if (!page) return;
  const hide = shouldHideLyricsArea();
  page.querySelector(".ContentBox .LyricsContainer")?.classList.toggle("Hidden", hide);
  page.querySelector(".ContentBox")?.classList.toggle("LyricsHidden", hide);
  SyncNowBarSide();
}

$showNoLyricsNotice.listen(() => queueMicrotask(SyncNoLyricsLayout));

const ICONS = {
  copy: `<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="5.25" y="5.25" width="8" height="8" rx="2"/><path d="M10.75 5.25V4.5a1.75 1.75 0 0 0-1.75-1.75H4.5A1.75 1.75 0 0 0 2.75 4.5V9a1.75 1.75 0 0 0 1.75 1.75h.75"/></svg>`,
  check: `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.25 8.5l3 3 6.5-7" pathLength="1"/></svg>`,
  retry: `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13.25 8a5.25 5.25 0 1 1-1.54-3.71"/><path d="M13.25 2.75v3h-3"/></svg>`,
  chat: `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.75 4.5c0-.97.78-1.75 1.75-1.75h7c.97 0 1.75.78 1.75 1.75v5c0 .97-.78 1.75-1.75 1.75H7l-3 2.5v-2.5h.5a1.75 1.75 0 0 1-1.75-1.75z"/></svg>`,
};

function makeButton(icon: string, label: string, primary = false): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = primary ? "notice-action notice-action-primary" : "notice-action";
  button.innerHTML = icon;
  const text = document.createElement("span");
  text.textContent = label;
  button.appendChild(text);
  return button;
}

/**
 * "Copy details" keeps one icon + label face per state in the DOM, stacked in
 * one grid cell, and swaps them by `data-state` so the change can crossfade.
 * The cell is as wide as the widest face, so the row doesn't shift when the
 * text changes.
 */
function makeCopyButton(primary: boolean): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `notice-action notice-copy${primary ? " notice-action-primary" : ""}`;
  button.dataset.state = "idle";
  const face = (state: string, icon: string, label: string) =>
    `<span class="notice-face" data-for="${state}">${icon}<span>${label}</span></span>`;
  button.innerHTML =
    `<span class="notice-swap" aria-live="polite">` +
    face("idle", ICONS.copy, t("notice.copyDetails")) +
    face("done", ICONS.check, t("common.copied")) +
    face("failed", ICONS.copy, t("common.copyFailed")) +
    `</span>`;
  return button;
}

/** Build the notice for `descriptor`. Listeners are tied to `signal`. */
export function BuildLyricsNotice(
  descriptor: string,
  status: number,
  uri: string | undefined,
  signal: AbortSignal,
  onRetry: () => void
): HTMLElement {
  const copy = NOTICES[descriptor];
  const notice = document.createElement("div");
  notice.className = "LyricsNotice";
  notice.dataset.notice = descriptor;

  const title = document.createElement("p");
  title.className = "notice-title";
  title.textContent = t(copy.titleKey);

  const body = document.createElement("p");
  body.className = "notice-body";
  body.textContent = t(copy.bodyKey);

  const actions = document.createElement("div");
  actions.className = "notice-actions";

  if (copy.retry) {
    const retry = makeButton(ICONS.retry, t("notice.tryAgain"), true);
    retry.addEventListener("click", onRetry, { signal });
    actions.appendChild(retry);
  }

  if (copy.report) {
    const copyButton = makeCopyButton(!copy.retry);
    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    copyButton.addEventListener(
      "click",
      async () => {
        const ok = await CopyText(BuildBugReport({ notice: { descriptor, status, uri } }), copyButton);
        copyButton.dataset.state = ok ? "done" : "failed";
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
          copyButton.dataset.state = "idle";
        }, 2000);
      },
      { signal }
    );
    signal.addEventListener("abort", () => clearTimeout(resetTimer), { once: true });
    actions.appendChild(copyButton);
  }

  const discord = makeButton(ICONS.chat, t("notice.getHelp"));
  discord.addEventListener("click", () => window.open(DISCORD_INVITE_URL, "_blank"), { signal });
  actions.appendChild(discord);

  notice.append(title, body, actions);

  if (copy.report) {
    const code = document.createElement("p");
    code.className = "notice-code";
    code.textContent = t("notice.code", {
      code: `${descriptor}${status ? ` (${status})` : ""}`,
    });
    notice.appendChild(code);
  }

  return notice;
}
