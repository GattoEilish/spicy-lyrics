import { useStore } from "@nanostores/react";
import type React from "react";
import { t } from "../../../utils/i18n.ts";
import {
  $creditsFollowLastLine,
  $duetLinePadding,
  $lineHoverBackground,
  $lyricsSize,
  $minimalLyricsMode,
  $pinnedCredits,
  $rendererVisualStyle,
  $romanizationDisplay,
  $syllableMerge,
  $syllablePace,
  RENDERER_VISUAL_STYLES,
  type PinnedCredits,
  type RendererVisualStyle,
  type RomanizationDisplay,
  type SyllableMerge,
} from "../../../utils/stores.ts";
import { Select, Slider, Toggle } from "./components.tsx";
import { LyricsIcon } from "./icons.tsx";
import type { GroupDef, SectionDef } from "./model.ts";

// Kept at module level so Control identities stay stable across language switches.
const LyricsSizeControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Slider
    label={label}
    value={useStore($lyricsSize)}
    min={60}
    max={200}
    step={5}
    defaultValue={100}
    unit="%"
    onChange={(v) => $lyricsSize.set(v)}
  />
);

const RendererStyleControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Select
    label={label}
    value={useStore($rendererVisualStyle)}
    options={[...RENDERER_VISUAL_STYLES]}
    labels={RENDERER_VISUAL_STYLES.map((style) => t(`settings.lyrics.style.${style}`))}
    onChange={(v) => $rendererVisualStyle.set(v as RendererVisualStyle)}
  />
);

const MinimalLyricsControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Toggle
    label={label}
    checked={useStore($minimalLyricsMode)}
    onChange={(v) => $minimalLyricsMode.set(v)}
  />
);

const SyllableMergeControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Select
    label={label}
    value={useStore($syllableMerge)}
    options={["off", "full", "steady", "held"]}
    labels={[
      t("settings.lyrics.merge.off"),
      t("settings.lyrics.merge.full"),
      t("settings.lyrics.merge.steady"),
      t("settings.lyrics.merge.held"),
    ]}
    onChange={(v) => $syllableMerge.set(v as SyllableMerge)}
  />
);

const SyllablePaceControl: React.FC<{ disabled: boolean; label: string }> = ({ disabled, label }) => (
  <Toggle
    label={label}
    checked={useStore($syllablePace)}
    onChange={(v) => $syllablePace.set(v)}
    disabled={disabled}
  />
);

const RomanizationControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Select
    label={label}
    value={useStore($romanizationDisplay)}
    options={["replace", "underLine"]}
    labels={[t("settings.lyrics.romanization.replace"), t("settings.lyrics.romanization.underLine")]}
    onChange={(v) => $romanizationDisplay.set(v as RomanizationDisplay)}
  />
);

const LineHoverControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Toggle
    label={label}
    checked={useStore($lineHoverBackground)}
    onChange={(v) => $lineHoverBackground.set(v)}
  />
);

const DuetPaddingControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Toggle
    label={label}
    checked={useStore($duetLinePadding)}
    onChange={(v) => $duetLinePadding.set(v)}
  />
);

const CreditsFollowControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Toggle
    label={label}
    checked={useStore($creditsFollowLastLine)}
    onChange={(v) => $creditsFollowLastLine.set(v)}
  />
);

const PinnedCreditsControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Select
    label={label}
    value={useStore($pinnedCredits)}
    options={["off", "noWriters", "full"]}
    labels={[
      t("settings.lyrics.pinnedCredits.off"),
      t("settings.lyrics.pinnedCredits.noWriters"),
      t("settings.lyrics.pinnedCredits.full"),
    ]}
    onChange={(v) => $pinnedCredits.set(v as PinnedCredits)}
  />
);

const usePaceDisabled = () =>
  useStore($syllableMerge) === "off" && t("settings.lyrics.pace.disabled");

export const lyricsSection: SectionDef = {
  id: "lyrics",
  get title() {
    return t("settings.sections.lyrics");
  },
  icon: LyricsIcon,
  groups: (): GroupDef[] => [
    {
      title: t("settings.lyrics.group.text"),
      settings: [
        {
          id: "lyricsSize",
          label: t("settings.lyrics.size.label"),
          description: t("settings.lyrics.size.desc"),
          keywords: "font text scale bigger smaller zoom dimensione testo scala",
          stacked: true,
          Control: LyricsSizeControl,
        },
      ],
    },
    {
      title: t("settings.lyrics.group.style"),
      settings: [
        {
          id: "rendererVisualStyle",
          label: t("settings.lyrics.style.label"),
          description: t("settings.lyrics.style.desc"),
          keywords: "simple lyrics mode refreshed renderer animation effects plain spring bloom stile",
          Control: RendererStyleControl,
        },
        {
          id: "minimalLyricsMode",
          label: t("settings.lyrics.minimal.label"),
          description: t("settings.lyrics.minimal.desc"),
          keywords: "minimal lyrics mode hide sung dissolvi nascondi",
          Control: MinimalLyricsControl,
        },
        {
          id: "syllableMerge",
          label: t("settings.lyrics.merge.label"),
          description: t("settings.lyrics.merge.desc"),
          keywords: "syllables merge held steady sillabe unisci parole",
          Control: SyllableMergeControl,
        },
        {
          id: "syllablePace",
          label: t("settings.lyrics.pace.label"),
          description: t("settings.lyrics.pace.desc"),
          keywords: "syllables merge held letters timing ritmo sillabe",
          useDisabled: usePaceDisabled,
          Control: SyllablePaceControl,
        },
      ],
    },
    {
      title: t("settings.lyrics.group.lines"),
      settings: [
        {
          id: "romanizationDisplay",
          label: t("settings.lyrics.romanization.label"),
          description: t("settings.lyrics.romanization.desc"),
          keywords: "romaji romanized romanize pronunciation under below replace romanizzazione",
          Control: RomanizationControl,
        },
        {
          id: "lineHoverBackground",
          label: t("settings.lyrics.hover.label"),
          description: t("settings.lyrics.hover.desc"),
          keywords: "line hover background evidenzia",
          Control: LineHoverControl,
        },
        {
          id: "duetLinePadding",
          label: t("settings.lyrics.duet.label"),
          description: t("settings.lyrics.duet.desc"),
          keywords: "indent voices duetti",
          Control: DuetPaddingControl,
        },
        {
          id: "creditsFollowLastLine",
          label: t("settings.lyrics.creditsFollow.label"),
          description: t("settings.lyrics.creditsFollow.desc"),
          keywords: "duet credits written by songwriters provided by provider align side crediti",
          Control: CreditsFollowControl,
        },
        {
          id: "pinnedCredits",
          label: t("settings.lyrics.pinnedCredits.label"),
          description: t("settings.lyrics.pinnedCredits.desc"),
          keywords: "credits footer pin sticky written by songwriters provided by source community bottom crediti fissati",
          Control: PinnedCreditsControl,
        },
      ],
    },
  ],
};
