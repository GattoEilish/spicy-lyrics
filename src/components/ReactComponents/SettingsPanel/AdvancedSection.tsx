import { useStore } from "@nanostores/react";
import type React from "react";
import { t } from "../../../utils/i18n.ts";
import {
  RemoveCurrentLyrics_AllCaches,
  RemoveCurrentLyrics_StateCache,
  RemoveLyricsCache,
} from "../../../utils/LyricsCacheTools.ts";
import { $developerMode } from "../../../utils/stores.ts";
import { Toggle } from "./components.tsx";
import { AdvancedIcon } from "./icons.tsx";
import type { GroupDef, SectionDef } from "./model.ts";

const ClearSongCacheControl: React.FC<{ disabled: boolean; label: string }> = () => (
  <button
    type="button"
    className="sl-sp-btn"
    onClick={() => RemoveCurrentLyrics_AllCaches(true)}
  >
    {t("common.clear")}
  </button>
);

const ClearStoredCacheControl: React.FC<{ disabled: boolean; label: string }> = () => (
  <button type="button" className="sl-sp-btn" onClick={() => RemoveLyricsCache(true)}>
    {t("common.clear")}
  </button>
);

const ResetSongStateControl: React.FC<{ disabled: boolean; label: string }> = () => (
  <button
    type="button"
    className="sl-sp-btn"
    onClick={() => RemoveCurrentLyrics_StateCache(true)}
  >
    {t("common.reset")}
  </button>
);

const DeveloperModeControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Toggle
    label={label}
    checked={useStore($developerMode)}
    onChange={(v) => $developerMode.set(v)}
  />
);

export const advancedSection: SectionDef = {
  id: "advanced",
  get title() {
    return t("settings.sections.advanced");
  },
  icon: AdvancedIcon,
  secondary: true,
  groups: (): GroupDef[] => [
    {
      title: t("settings.advanced.group.cache"),
      settings: [
        {
          id: "clearCurrentSongCaches",
          label: t("settings.advanced.clearSong.label"),
          description: t("settings.advanced.clearSong.desc"),
          keywords: "clear all caches current song svuota cache brano",
          Control: ClearSongCacheControl,
        },
        {
          id: "clearStoredLyricsCache",
          label: t("settings.advanced.clearAll.label"),
          description: t("settings.advanced.clearAll.desc"),
          keywords: "clear lyrics cache cancella testi salvati",
          Control: ClearStoredCacheControl,
        },
        {
          id: "clearCurrentSongState",
          label: t("settings.advanced.resetSong.label"),
          description: t("settings.advanced.resetSong.desc"),
          keywords: "clear current song internal state cache reimposta",
          Control: ResetSongStateControl,
        },
      ],
    },
    {
      title: t("settings.advanced.group.developer"),
      settings: [
        {
          id: "developerMode",
          label: t("settings.advanced.devMode.label"),
          description: t("settings.advanced.devMode.desc"),
          keywords: "debug logs sviluppatore",
          Control: DeveloperModeControl,
        },
      ],
    },
  ],
};
