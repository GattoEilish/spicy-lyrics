import { useStore } from "@nanostores/react";
import type React from "react";
import { getLocalizedExperiment, LANGUAGE_LABELS, t } from "../../../utils/i18n.ts";
import {
  $disableNpvLyrics,
  $hideNpvLyricsWhenUnavailable,
  $language,
  $lockedMediaBox,
  $motionArtwork,
  $motionArtworkOnStage,
  $motionArtworkPriority,
  $popupLyricsAllowed,
  $releaseYearPosition,
  $removeSpotifyLyricsButton,
  $showNoLyricsNotice,
  $showQueueWhenNoLyrics,
  $showVolumeSlider,
  $timelineOutsideMediaContent,
  $viewControlsPosition,
  LANGUAGES,
  type Language,
  type MotionArtworkPriority,
  type ReleaseYearPosition,
} from "../../../utils/stores.ts";
import { $experiment, getExperiment } from "../../../utils/experiments.ts";
import { $isGlobalNav } from "../../../utils/uiState.ts";
import { Segmented, Select, Toggle } from "./components.tsx";
import { InterfaceIcon } from "./icons.tsx";
import type { GroupDef, SectionDef } from "./model.ts";

// The two stage rows only mean something with motion artwork on and the Canvas Stage running.
function useStageRowDisabled(): string | false {
  const motion = useStore($motionArtwork);
  const stage = useStore($experiment("canvasImmersive"));
  if (!motion) return t("settings.interface.stageDisabled.noMotion");
  if (!stage) {
    return t("settings.interface.stageDisabled.noStage", {
      stageLabel: getLocalizedExperiment(getExperiment("canvasImmersive")).label,
    });
  }
  return false;
}

const LanguageControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Select
    label={label}
    value={useStore($language)}
    options={[...LANGUAGES]}
    labels={LANGUAGES.map((lang) => LANGUAGE_LABELS[lang])}
    onChange={(v) => $language.set(v as Language)}
  />
);

const useViewControlsDisabled = () =>
  !useStore($isGlobalNav) && t("settings.interface.viewControls.disabled");

const ViewControlsPositionControl: React.FC<{ disabled: boolean; label: string }> = ({
  disabled,
  label,
}) => (
  <Select
    label={label}
    value={useStore($viewControlsPosition)}
    options={["Top", "Bottom"]}
    labels={[t("settings.interface.viewControls.top"), t("settings.interface.viewControls.bottom")]}
    onChange={(v) => $viewControlsPosition.set(v)}
    disabled={disabled}
  />
);

const TimelineOutsideControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Toggle
    label={label}
    checked={useStore($timelineOutsideMediaContent)}
    onChange={(v) => $timelineOutsideMediaContent.set(v)}
  />
);

const ReleaseYearControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Select
    label={label}
    value={useStore($releaseYearPosition)}
    options={["off", "left", "right"]}
    labels={[
      t("settings.interface.releaseYear.off"),
      t("settings.interface.releaseYear.left"),
      t("settings.interface.releaseYear.right"),
    ]}
    onChange={(v) => $releaseYearPosition.set(v as ReleaseYearPosition)}
  />
);

const LockedMediaBoxControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Toggle
    label={label}
    checked={useStore($lockedMediaBox)}
    onChange={(v) => $lockedMediaBox.set(v)}
  />
);

const ShowNoLyricsNoticeControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Toggle
    label={label}
    checked={useStore($showNoLyricsNotice)}
    onChange={(v) => $showNoLyricsNotice.set(v)}
  />
);

const ShowQueueNoLyricsControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Toggle
    label={label}
    checked={useStore($showQueueWhenNoLyrics)}
    onChange={(v) => $showQueueWhenNoLyrics.set(v)}
  />
);

const ShowVolumeSliderControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Toggle
    label={label}
    checked={useStore($showVolumeSlider)}
    onChange={(v) => $showVolumeSlider.set(v)}
  />
);

const MotionArtworkControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Toggle
    label={label}
    checked={useStore($motionArtwork)}
    onChange={(v) => $motionArtwork.set(v)}
  />
);

const MotionPriorityControl: React.FC<{ disabled: boolean; label: string }> = ({
  disabled,
  label,
}) => (
  <Segmented<MotionArtworkPriority>
    label={label}
    value={useStore($motionArtworkPriority)}
    options={[
      { value: "motion", label: t("settings.interface.motionPriority.motion") },
      { value: "canvas", label: t("settings.interface.motionPriority.canvas") },
    ]}
    onChange={(v) => $motionArtworkPriority.set(v)}
    disabled={disabled}
  />
);

const MotionOnStageControl: React.FC<{ disabled: boolean; label: string }> = ({
  disabled,
  label,
}) => (
  <Toggle
    label={label}
    checked={useStore($motionArtworkOnStage)}
    onChange={(v) => $motionArtworkOnStage.set(v)}
    disabled={disabled}
  />
);

const NpvCardControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Toggle
    label={label}
    checked={!useStore($disableNpvLyrics)}
    onChange={(v) => $disableNpvLyrics.set(!v)}
  />
);

const useHideNpvDisabled = () =>
  useStore($disableNpvLyrics) && t("settings.interface.hideNpvUnavailable.disabled");

const HideNpvUnavailableControl: React.FC<{ disabled: boolean; label: string }> = ({
  disabled,
  label,
}) => (
  <Toggle
    label={label}
    checked={useStore($hideNpvLyricsWhenUnavailable)}
    onChange={(v) => $hideNpvLyricsWhenUnavailable.set(v)}
    disabled={disabled}
  />
);

const PopupLyricsControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Toggle
    label={label}
    checked={useStore($popupLyricsAllowed)}
    onChange={(v) => $popupLyricsAllowed.set(v)}
  />
);

const RemoveSpotifyBtnControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Toggle
    label={label}
    checked={useStore($removeSpotifyLyricsButton)}
    onChange={(v) => $removeSpotifyLyricsButton.set(v)}
  />
);

export const interfaceSection: SectionDef = {
  id: "interface",
  get title() {
    return t("settings.sections.interface");
  },
  icon: InterfaceIcon,
  groups: (): GroupDef[] => [
    {
      title: t("settings.interface.group.general"),
      settings: [
        {
          id: "language",
          label: t("settings.interface.language.label"),
          description: t("settings.interface.language.desc"),
          keywords: "language lingua italiano english locale translation traduzione",
          Control: LanguageControl,
        },
      ],
    },
    {
      title: t("settings.interface.group.lyricsView"),
      settings: [
        {
          id: "viewControlsPosition",
          label: t("settings.interface.viewControls.label"),
          description: t("settings.interface.viewControls.desc"),
          keywords: "lyrics controls top bottom posizione controlli",
          useDisabled: useViewControlsDisabled,
          Control: ViewControlsPositionControl,
        },
        {
          id: "timelineOutsideMediaContent",
          label: t("settings.interface.timeline.label"),
          description: t("settings.interface.timeline.desc"),
          keywords: "progress bar seek barra avanzamento",
          Control: TimelineOutsideControl,
        },
        {
          id: "releaseYearPosition",
          label: t("settings.interface.releaseYear.label"),
          description: t("settings.interface.releaseYear.desc"),
          keywords: "year date album nowbar artists anno uscita",
          Control: ReleaseYearControl,
        },
        {
          id: "lockedMediaBox",
          label: t("settings.interface.lockedMediaBox.label"),
          description: t("settings.interface.lockedMediaBox.desc"),
          keywords: "size artwork blocca riquadro",
          Control: LockedMediaBoxControl,
        },
        {
          id: "showNoLyricsNotice",
          label: t("settings.interface.noLyricsNotice.label"),
          description: t("settings.interface.noLyricsNotice.desc"),
          keywords: "unavailable missing message hide popup pip page avviso assenza testi",
          Control: ShowNoLyricsNoticeControl,
        },
        {
          id: "showQueueWhenNoLyrics",
          label: t("settings.interface.queueNoLyrics.label"),
          description: t("settings.interface.queueNoLyrics.desc"),
          keywords: "queue up next unavailable missing auto open automatically coda",
          Control: ShowQueueNoLyricsControl,
        },
        {
          id: "showVolumeSlider",
          label: t("settings.interface.volumeSlider.label"),
          description: t("settings.interface.volumeSlider.desc"),
          keywords: "volume slider controllo",
          Control: ShowVolumeSliderControl,
        },
      ],
    },
    {
      title: t("settings.interface.group.artwork"),
      settings: [
        {
          id: "motionArtwork",
          label: t("settings.interface.motionArtwork.label"),
          description: t("settings.interface.motionArtwork.desc"),
          keywords: "animated cover art album video moving artwork copertina animata",
          Control: MotionArtworkControl,
        },
        {
          id: "motionArtworkPriority",
          label: t("settings.interface.motionPriority.label"),
          description: t("settings.interface.motionPriority.desc"),
          keywords: "animated cover spotify canvas stage video priority prefer both",
          useDisabled: useStageRowDisabled,
          Control: MotionPriorityControl,
        },
        {
          id: "motionArtworkOnStage",
          label: t("settings.interface.motionOnStage.label"),
          description: t("settings.interface.motionOnStage.desc"),
          keywords: "animated cover spotify canvas stage video fullscreen side palco",
          useDisabled: useStageRowDisabled,
          Control: MotionOnStageControl,
        },
      ],
    },
    {
      title: t("settings.interface.group.npv"),
      settings: [
        {
          id: "npvLyrics",
          label: t("settings.interface.npvCard.label"),
          description: t("settings.interface.npvCard.desc"),
          keywords: "disable npv lyrics now playing view scheda testi",
          Control: NpvCardControl,
        },
        {
          id: "hideNpvLyricsWhenUnavailable",
          label: t("settings.interface.hideNpvUnavailable.label"),
          description: t("settings.interface.hideNpvUnavailable.desc"),
          keywords: "npv lyrics unavailable nascondi",
          useDisabled: useHideNpvDisabled,
          Control: HideNpvUnavailableControl,
        },
      ],
    },
    {
      title: t("settings.interface.group.windows"),
      settings: [
        {
          id: "popupLyricsAllowed",
          label: t("settings.interface.popupLyrics.label"),
          description: t("settings.interface.popupLyrics.desc"),
          keywords: "disable popup lyrics window pip picture in picture finestra mobile",
          Control: PopupLyricsControl,
        },
        {
          id: "removeSpotifyLyricsButton",
          label: t("settings.interface.removeSpotifyBtn.label"),
          description: t("settings.interface.removeSpotifyBtn.desc"),
          keywords: "remove playbar nascondi pulsante",
          Control: RemoveSpotifyBtnControl,
        },
      ],
    },
  ],
};
