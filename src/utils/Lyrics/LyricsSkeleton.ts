import { PageContainer } from "../../components/Pages/PageView.ts";
import { isExperimentEnabled } from "../experiments.ts";
import { t } from "../i18n.ts";

// Fixed widths so the placeholder reads like ragged lyric lines and never reshuffles.
const LINE_WIDTHS = [74, 58, 86, 49, 68, 81, 55, 72, 63, 84, 52, 77, 66, 88, 57, 70];

export const SkeletonMarkup = `
  <div class="LyricsSkeleton">
    <div class="SkeletonLines" aria-hidden="true">
      ${LINE_WIDTHS.map((w, i) => `<div class="SkeletonLine" style="width: ${w}%; --i: ${i}"></div>`).join("")}
    </div>
    <div class="SkeletonStatus" role="status" aria-live="polite">
      <span class="SkeletonLabel">${t("skeleton.loading")}</span><span class="SkeletonDots" aria-hidden="true"><i></i><i></i><i></i></span>
    </div>
  </div>`;

export const IsLyricsSkeletonEnabled = () => isExperimentEnabled("lyricsSkeleton");

const getSkeleton = () =>
  PageContainer?.querySelector<HTMLElement>(".LyricsContainer .LyricsSkeleton") ?? null;

export function ShowLyricsSkeleton(label?: string): void {
  const skeleton = getSkeleton();
  if (!skeleton) return;
  const defaultLabel = t("skeleton.loading");
  const resolvedLabel = label ?? defaultLabel;
  const labelEl = skeleton.querySelector<HTMLElement>(".SkeletonLabel");
  if (labelEl && labelEl.textContent !== resolvedLabel) labelEl.textContent = resolvedLabel;
  skeleton.classList.toggle("LongLabel", resolvedLabel !== defaultLabel);
  skeleton.classList.add("active");
}

export function HideLyricsSkeleton(): void {
  getSkeleton()?.classList.remove("active");
}

/**
 * Show the skeleton and resolve once it has been painted, so the synchronous
 * lyrics build that follows blocks behind a visible placeholder instead of a
 * frozen view. Its animations are transform/opacity only, which the compositor
 * keeps running while the main thread is busy.
 */
export function PaintLyricsSkeleton(): Promise<void> {
  ShowLyricsSkeleton();
  // rAF never fires in a hidden document (minimized window, PiP owning the page).
  if (document.hidden) return Promise.resolve();
  return new Promise((resolve) => {
    const fallback = setTimeout(resolve, 100);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        clearTimeout(fallback);
        resolve();
      })
    );
  });
}
