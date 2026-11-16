import { useStore } from "@nanostores/react";
import type React from "react";
import { t } from "../../../utils/i18n.ts";
import {
  $backgroundBlur,
  $backgroundStyle,
  $showNpvDynamicBg,
  BACKGROUND_STYLES,
  type BackgroundStyle,
} from "../../../utils/stores.ts";
import { $experiment, getExperiment } from "../../../utils/experiments.ts";
import { getLocalizedExperiment } from "../../../utils/i18n.ts";
import { Select, Slider, Toggle } from "./components.tsx";
import { BackgroundIcon } from "./icons.tsx";
import type { GroupDef, SectionDef } from "./model.ts";

export function getBackgroundStyleLabel(style: BackgroundStyle): string {
  return t(`settings.background.style.${style}`);
}

const BackgroundStyleControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Select
    label={label}
    value={useStore($backgroundStyle)}
    options={[...BACKGROUND_STYLES]}
    labels={BACKGROUND_STYLES.map((style) => getBackgroundStyleLabel(style))}
    onChange={(v) => $backgroundStyle.set(v as BackgroundStyle)}
  />
);

const BackgroundBlurControl: React.FC<{ disabled: boolean; label: string }> = ({ disabled, label }) => (
  <Slider
    label={label}
    value={useStore($backgroundBlur)}
    min={0}
    max={48}
    step={1}
    defaultValue={0}
    unit="px"
    onChange={(v) => $backgroundBlur.set(v)}
    disabled={disabled}
  />
);

const NpvDynamicBgControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Toggle
    label={label}
    checked={useStore($showNpvDynamicBg)}
    onChange={(v) => $showNpvDynamicBg.set(v)}
  />
);

const useBackgroundStyleNote = () => {
  const style = useStore($backgroundStyle);
  const canvasStage = useStore($experiment("canvasImmersive"));
  return (
    style !== "dynamic" &&
    canvasStage &&
    t("settings.background.style.note", {
      canvasStage: getLocalizedExperiment(getExperiment("canvasImmersive")).label,
      style: getBackgroundStyleLabel(style) ?? t("settings.background.style.thisBg"),
    })
  );
};

const useBlurDisabled = () => {
  const style = useStore($backgroundStyle);
  return style !== "artist" && style !== "cover" && t("settings.background.blur.disabled");
};

export const backgroundSection: SectionDef = {
  id: "background",
  get title() {
    return t("settings.sections.background");
  },
  icon: BackgroundIcon,
  groups: (): GroupDef[] => [
    {
      title: t("settings.background.group.lyricsView"),
      settings: [
        {
          id: "backgroundStyle",
          label: t("settings.background.style.label"),
          description: t("settings.background.style.desc"),
          keywords: "static animated kawarp artist header cover art color colors image transparent none theme sfondo",
          useNote: useBackgroundStyleNote,
          Control: BackgroundStyleControl,
        },
        {
          id: "backgroundBlur",
          label: t("settings.background.blur.label"),
          description: t("settings.background.blur.desc"),
          keywords: "static background blur sfocatura",
          stacked: true,
          useDisabled: useBlurDisabled,
          Control: BackgroundBlurControl,
        },
      ],
    },
    {
      title: t("settings.background.group.npv"),
      settings: [
        {
          id: "showNpvDynamicBg",
          label: t("settings.background.npv.label"),
          description: t("settings.background.npv.desc"),
          keywords: "dynamic background npv now playing view kawarp sfondo animato",
          Control: NpvDynamicBgControl,
        },
      ],
    },
  ],
};
