import { useStore } from "@nanostores/react";
import type React from "react";
import { t } from "../../../utils/i18n.ts";
import {
  $animationFpsCap,
  $animationFpsCapEnabled,
  $skipSpicyFont,
} from "../../../utils/stores.ts";
import { Slider, Toggle } from "./components.tsx";
import { AppearanceIcon } from "./icons.tsx";
import type { GroupDef, SectionDef } from "./model.ts";

const SystemFontControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Toggle
    label={label}
    checked={useStore($skipSpicyFont)}
    onChange={(v) => $skipSpicyFont.set(v)}
  />
);

const FpsCapEnabledControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Toggle
    label={label}
    checked={useStore($animationFpsCapEnabled)}
    onChange={(v) => $animationFpsCapEnabled.set(v)}
  />
);

const FpsCapControl: React.FC<{ disabled: boolean; label: string }> = ({ disabled, label }) => (
  <Slider
    label={label}
    value={useStore($animationFpsCap)}
    min={15}
    max={240}
    step={5}
    defaultValue={60}
    unit="FPS"
    onChange={(v) => $animationFpsCap.set(v)}
    disabled={disabled}
  />
);

const useFpsCapDisabled = () =>
  !useStore($animationFpsCapEnabled) && t("settings.appearance.fpsCap.disabled");

export const appearanceSection: SectionDef = {
  id: "appearance",
  get title() {
    return t("settings.sections.appearance");
  },
  icon: AppearanceIcon,
  groups: (): GroupDef[] => [
    {
      title: t("settings.appearance.group.text"),
      settings: [
        {
          id: "skipSpicyFont",
          label: t("settings.appearance.systemFont.label"),
          description: t("settings.appearance.systemFont.desc"),
          keywords: "default font typeface carattere",
          Control: SystemFontControl,
        },
      ],
    },
    {
      title: t("settings.appearance.group.performance"),
      settings: [
        {
          id: "animationFpsCapEnabled",
          label: t("settings.appearance.fpsCapEnabled.label"),
          description: t("settings.appearance.fpsCapEnabled.desc"),
          keywords: "fps cap animation prestazioni frame rate",
          Control: FpsCapEnabledControl,
        },
        {
          id: "animationFpsCap",
          label: t("settings.appearance.fpsCap.label"),
          description: t("settings.appearance.fpsCap.desc"),
          keywords: "fps cap animation frame rate",
          stacked: true,
          useDisabled: useFpsCapDisabled,
          Control: FpsCapControl,
        },
      ],
    },
  ],
};
