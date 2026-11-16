import { useStore } from "@nanostores/react";
import { Fragment } from "react";
import { getExperiment, getVisibleExperiments } from "../../../utils/experiments.ts";
import { getLocalizedExperiment, t } from "../../../utils/i18n.ts";
import {
  $ttmlReviewer,
  getOtherLyricsExtensions,
  getReviewerShownLabel,
  REVIEWER_EXPERIMENTS_OFF,
  REVIEWER_SETTINGS,
  setTtmlReviewer,
} from "../../../utils/ttmlReviewer.ts";
import { Row, Toggle } from "./components.tsx";
import { ReviewerIcon } from "./icons.tsx";
import type { SectionDef } from "./model.ts";

function ModeToggle({ label }: { label: string }) {
  return <Toggle label={label} checked={useStore($ttmlReviewer)} onChange={setTtmlReviewer} />;
}

/** Settings → TTML Reviewer: the switch, then everything it does. */
export function ReviewerPane({ labelOf }: { labelOf: (id: string) => string | undefined }) {
  const on = useStore($ttmlReviewer);
  const others = on ? getOtherLyricsExtensions() : [];
  const held = new Set<string>(REVIEWER_EXPERIMENTS_OFF);
  const defaulted = getVisibleExperiments().filter((experiment) => !held.has(experiment.id));

  return (
    <div className="sl-sp-reviewer">
      <p className="sl-sp-intro">{t("settings.reviewer.intro")}</p>

      <div className="sl-sp-card">
        <Row label={t("settings.reviewer.modeLabel")} description={t("settings.reviewer.modeDesc")}>
          <ModeToggle label={t("settings.reviewer.modeLabel")} />
        </Row>
      </div>

      {others.length > 0 && (
        <div className="sl-sp-banner" role="status">
          <span>
            {t("settings.reviewer.otherExt", {
              names: others.join(" & "),
              verb:
                others.length > 1
                  ? t("settings.reviewer.verbPlural")
                  : t("settings.reviewer.verbSingle"),
              pronoun:
                others.length > 1
                  ? t("settings.reviewer.pronounPlural")
                  : t("settings.reviewer.pronounSingle"),
            })}
          </span>
        </div>
      )}

      <div className="sl-sp-group">
        <h3 className="sl-sp-group-title">{t("settings.reviewer.whatSets")}</h3>
        <div className="sl-sp-reviewer-list">
          {REVIEWER_SETTINGS.map(({ key, shown }) => (
            <Fragment key={key}>
              <div className="sl-sp-reviewer-item">
                <span>{labelOf(key) ?? key}</span>
                <span className="sl-sp-reviewer-value">{getReviewerShownLabel(shown)}</span>
              </div>
              {/* Kept apart from the settings, so the mode skips them rather than resetting them. */}
              {key === "playbackOffset" && (
                <div className="sl-sp-reviewer-item">
                  <span>{t("settings.reviewer.perSongOffsets")}</span>
                  <span className="sl-sp-reviewer-value">{t("settings.reviewer.ignored")}</span>
                </div>
              )}
            </Fragment>
          ))}
          {REVIEWER_EXPERIMENTS_OFF.map((id) => getExperiment(id))
            .filter((experiment) => !experiment.hidden)
            .map(getLocalizedExperiment)
            .map((experiment) => (
              <div key={experiment.id} className="sl-sp-reviewer-item">
                <span>{experiment.label}</span>
                <span className="sl-sp-reviewer-value">
                  {experiment.forceState === true
                    ? t("settings.experiments.forcedOn")
                    : t("common.off")}
                </span>
              </div>
            ))}
          {defaulted.length > 0 && (
            <div className="sl-sp-reviewer-item">
              <span>{t("settings.reviewer.otherExperiments")}</span>
              <span className="sl-sp-reviewer-value">{t("common.default")}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const reviewerSection: SectionDef = {
  id: "reviewer",
  get title() {
    return t("settings.sections.reviewer");
  },
  icon: ReviewerIcon,
  secondary: true,
  // The tab renders ReviewerPane (see index.tsx); this row is what search finds.
  groups: () => [
    {
      settings: [
        {
          id: "ttmlReviewerMode",
          label: t("settings.reviewer.modeLabel"),
          description: t("settings.reviewer.modeDesc"),
          keywords: "review sync ttml basics reset default clean plain maker revisore",
          Control: ModeToggle,
        },
      ],
    },
  ],
};
