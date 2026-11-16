import { useStore } from "@nanostores/react";
import { useEffect, useRef, useState } from "react";
import Session from "../../Global/Session.ts";
import {
  BuildBugReport,
  CopyText,
  DISCORD_BUGS_URL,
  DISCORD_INVITE_URL,
} from "../../../utils/BugReport.ts";
import { t } from "../../../utils/i18n.ts";
import { $latestVersion } from "./About.tsx";
import { BugIcon } from "./icons.tsx";
import type { SectionDef } from "./model.ts";

// The preview follows what's playing and the measured smoothness while the tab is open.
const PREVIEW_REFRESH_MS = 2000;
// How long "Copied" / "Couldn't copy" stays on a button.
const COPY_FEEDBACK_MS = 2200;

type CopyState = "idle" | "done" | "failed";

function useCopy(after?: () => void) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async (from: Element) => {
    const ok = await CopyText(BuildBugReport({ latestVersion: $latestVersion.get() }), from);
    setState(ok ? "done" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), COPY_FEEDBACK_MS);
    if (ok) after?.();
  };
  return [state, copy] as const;
}

/**
 * Every label sits in the same grid cell and only the current one is visible, so the
 * button keeps the width of its longest label instead of jumping as it changes.
 */
function CopyLabel({ state, idle }: { state: CopyState; idle: string }) {
  const faces: [CopyState, string][] = [
    ["idle", idle],
    ["done", t("common.copied")],
    ["failed", t("common.copyFailed")],
  ];
  return (
    <span className="sl-sp-bug-faces">
      {faces.map(([face, text]) => (
        <span key={face} className="sl-sp-bug-face" aria-hidden={face !== state} data-shown={face === state}>
          {text}
        </span>
      ))}
    </span>
  );
}

/** The searchable row's control: copies without leaving Settings. */
function CopyReportButton() {
  const [state, copy] = useCopy();
  return (
    <button type="button" className="sl-sp-btn" data-state={state} onClick={(e) => copy(e.currentTarget)}>
      <CopyLabel state={state} idle={t("common.copy")} />
    </button>
  );
}

/** Settings → Got a Bug?: what gets copied, and the way to Discord. */
export function BugReportPane() {
  const latestVersion = useStore($latestVersion);
  const [report, setReport] = useState(() => BuildBugReport());
  const [copyState, copy] = useCopy();
  const [discordState, copyAndOpen] = useCopy(() => window.open(DISCORD_BUGS_URL, "_blank"));

  useEffect(() => {
    setReport(BuildBugReport({ latestVersion }));
    const interval = setInterval(() => setReport(BuildBugReport({ latestVersion })), PREVIEW_REFRESH_MS);
    return () => clearInterval(interval);
  }, [latestVersion]);

  const current = Session.SpicyLyrics.GetCurrentVersion()?.Text;
  const outdated =
    !!latestVersion &&
    !!current &&
    Session.SpicyLyrics.IsBehind(
      Session.SpicyLyrics.GetCurrentVersion(),
      Session.SpicyLyrics.ParseVersion(latestVersion)
    );
  // The preview shows the block itself; the Markdown around it is only for Discord.
  const preview = report
    .split("\n")
    .filter((line) => line !== "```" && !line.startsWith("**"))
    .slice(0, -1);

  return (
    <div className="sl-sp-bug">
      <p className="sl-sp-intro">{t("settings.bug.intro")}</p>

      {outdated && (
        <div className="sl-sp-banner" role="status">
          <span>{t("settings.bug.outdated", { current, latest: latestVersion })}</span>
          <button
            type="button"
            className="sl-sp-about-update"
            onClick={() => Session.Navigate({ pathname: "/SpicyLyrics/Update" })}
          >
            {t("common.update")}
          </button>
        </div>
      )}

      <div className="sl-sp-bug-actions">
        <button
          type="button"
          className="sl-sp-about-link sl-sp-bug-primary"
          data-state={discordState}
          onClick={(e) => copyAndOpen(e.currentTarget)}
        >
          <CopyLabel state={discordState} idle={t("settings.bug.copyAndOpen")} />
        </button>
        <button
          type="button"
          className="sl-sp-about-link"
          data-state={copyState}
          onClick={(e) => copy(e.currentTarget)}
        >
          <CopyLabel state={copyState} idle={t("settings.bug.copyOnly")} />
        </button>
      </div>

      <div className="sl-sp-bug-fineprint">
        <p>{t("settings.bug.privacy")}</p>
        <p>
          {t("settings.bug.notInServer")}{" "}
          <button
            type="button"
            className="sl-sp-bug-join-link"
            onClick={() => window.open(DISCORD_INVITE_URL, "_blank")}
          >
            {t("settings.bug.joinHere")}
          </button>
        </p>
      </div>

      <div className="sl-sp-group">
        <h3 className="sl-sp-group-title">{t("settings.bug.whatCopied")}</h3>
        <div className="sl-sp-bug-preview">
          {preview.map((line, i) => (
            <div key={i} className="sl-sp-bug-line">
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const bugReportSection: SectionDef = {
  id: "bug",
  get title() {
    return t("settings.sections.bug");
  },
  icon: BugIcon,
  secondary: true,
  // The tab renders BugReportPane (see index.tsx); this row is what search finds.
  groups: () => [
    {
      settings: [
        {
          id: "copyBugReport",
          label: t("settings.bug.rowLabel"),
          description: t("settings.bug.rowDesc"),
          keywords: "bug report issue problem broken discord help support diagnostics debug details segnalazione",
          Control: CopyReportButton,
        },
      ],
    },
  ],
};
