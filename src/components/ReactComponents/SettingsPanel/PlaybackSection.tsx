import { useStore } from "@nanostores/react";
import type React from "react";
import { useEffect } from "react";
import { t } from "../../../utils/i18n.ts";
import {
  $playbackOffset,
  $scrollLeadEnabled,
  $scrollLeadMs,
  $seekFadeCompensation,
  $showScrollToActive,
  $rendererVisualStyle,
  $smoothScrolling,
  $staticAutoScroll,
  type StaticAutoScroll,
} from "../../../utils/stores.ts";
import {
  $offsetScope,
  $songOffsets,
  setSongOffset,
  OFFSET_LIMIT_MS,
} from "../../../utils/songOffsets.ts";
import { $ttmlReviewer } from "../../../utils/ttmlReviewer.ts";
import { useCurrentUri } from "../LyricsManager/hooks/useCurrentUri.ts";
import { Segmented, Select, Slider, Toggle } from "./components.tsx";
import { PlaybackIcon } from "./icons.tsx";
import type { GroupDef, SectionDef } from "./model.ts";

const usePlaybackOffsetNote = () => {
  const scope = useStore($offsetScope);
  const uri = useCurrentUri();
  const songOffset = useStore($songOffsets)[uri ?? ""] ?? 0;
  const reviewing = useStore($ttmlReviewer);
  const title = uri && Spicetify.Player.data?.item?.name;
  if (!title) return false;
  if (scope === "song") {
    const artist = Spicetify.Player.data?.item?.artists?.[0]?.name;
    return artist
      ? t("settings.playback.offset.forSongArtist", { title, artist })
      : t("settings.playback.offset.forSong", { title });
  }
  if (!songOffset) return false;
  const offset = `${songOffset > 0 ? "+" : ""}${songOffset}`;
  if (reviewing) return t("settings.playback.offset.songIgnored", { title, offset });
  return t("settings.playback.offset.songOwn", { title, offset });
};

const PlaybackOffsetAside: React.FC<{ disabled: boolean }> = ({ disabled }) => {
  const uri = useCurrentUri();
  const scope = useStore($offsetScope);
  // The row always opens on All songs.
  useEffect(() => () => $offsetScope.set("all"), []);
  // A locked row (TTML Reviewer) stays on All songs: the song's own offset is ignored then.
  useEffect(() => {
    if (disabled) $offsetScope.set("all");
  }, [disabled]);
  return (
    <Segmented
      label={t("settings.playback.offset.scopeLabel")}
      disabled={disabled}
      value={scope === "song" && uri && !disabled ? "song" : "all"}
      options={[
        { value: "all", label: t("settings.playback.offset.allSongs") },
        { value: "song", label: t("settings.playback.offset.thisSong"), disabled: !uri },
      ]}
      onChange={(v) => $offsetScope.set(v)}
    />
  );
};

const PlaybackOffsetControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => {
  const scope = useStore($offsetScope);
  const uri = useCurrentUri();
  const offsets = useStore($songOffsets);
  const global = useStore($playbackOffset);
  const editingSong = scope === "song" && !!uri;
  return (
    <Slider
      label={editingSong ? t("settings.playback.offset.thisSongSuffix", { label }) : label}
      value={editingSong ? (offsets[uri] ?? 0) : global}
      min={-OFFSET_LIMIT_MS}
      max={OFFSET_LIMIT_MS}
      step={10}
      defaultValue={0}
      unit="ms"
      nudges={[10, 100]}
      editable
      onChange={(v) => (editingSong ? setSongOffset(uri, v) : $playbackOffset.set(v))}
    />
  );
};

const SeekFadeControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Toggle
    label={label}
    checked={useStore($seekFadeCompensation)}
    onChange={(v) => $seekFadeCompensation.set(v)}
  />
);

const useSmoothScrollDisabled = () =>
  useStore($rendererVisualStyle) === "bloom" && t("settings.playback.smoothScroll.disabled");

const SmoothScrollControl: React.FC<{ disabled: boolean; label: string }> = ({ disabled, label }) => (
  <Toggle
    label={label}
    checked={useStore($smoothScrolling)}
    onChange={(v) => $smoothScrolling.set(v)}
    disabled={disabled}
  />
);

const useEarlyScrollNote = () =>
  useStore($rendererVisualStyle) === "bloom" && t("settings.playback.earlyScroll.note");

const EarlyScrollControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Toggle
    label={label}
    checked={useStore($scrollLeadEnabled)}
    onChange={(v) => $scrollLeadEnabled.set(v)}
  />
);

const useEarlyScrollMsDisabled = () =>
  !useStore($scrollLeadEnabled) && t("settings.playback.earlyScrollMs.disabled");

const EarlyScrollMsControl: React.FC<{ disabled: boolean; label: string }> = ({ disabled, label }) => (
  <Slider
    label={label}
    value={useStore($scrollLeadMs)}
    min={0}
    max={800}
    step={10}
    defaultValue={250}
    unit="ms"
    onChange={(v) => $scrollLeadMs.set(v)}
    disabled={disabled}
  />
);

const StaticAutoScrollControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Select
    label={label}
    value={useStore($staticAutoScroll)}
    options={["off", "basic", "advanced"]}
    labels={[
      t("settings.playback.staticAutoScroll.off"),
      t("settings.playback.staticAutoScroll.basic"),
      t("settings.playback.staticAutoScroll.advanced"),
    ]}
    onChange={(v) => $staticAutoScroll.set(v as StaticAutoScroll)}
  />
);

const ShowScrollToActiveControl: React.FC<{ disabled: boolean; label: string }> = ({ label }) => (
  <Toggle
    label={label}
    checked={useStore($showScrollToActive)}
    onChange={(v) => $showScrollToActive.set(v)}
  />
);

export const playbackSection: SectionDef = {
  id: "playback",
  get title() {
    return t("settings.sections.playback");
  },
  icon: PlaybackIcon,
  groups: (): GroupDef[] => [
    {
      title: t("settings.playback.group.timing"),
      settings: [
        {
          id: "playbackOffset",
          label: t("settings.playback.offset.label"),
          description: t("settings.playback.offset.desc"),
          keywords: "sync delay latency milliseconds per song track sincronizzazione ritardo",
          stacked: true,
          useNote: usePlaybackOffsetNote,
          Aside: PlaybackOffsetAside,
          Control: PlaybackOffsetControl,
        },
        {
          id: "seekFadeCompensation",
          label: t("settings.playback.seekFade.label"),
          description: t("settings.playback.seekFade.desc"),
          keywords: "click jump compensazione salto",
          Control: SeekFadeControl,
        },
      ],
    },
    {
      title: t("settings.playback.group.scrolling"),
      settings: [
        {
          id: "smoothScrolling",
          label: t("settings.playback.smoothScroll.label"),
          description: t("settings.playback.smoothScroll.desc"),
          keywords: "smooth scroll scorrimento fluido",
          useDisabled: useSmoothScrollDisabled,
          Control: SmoothScrollControl,
        },
        {
          id: "scrollLeadEnabled",
          label: t("settings.playback.earlyScroll.label"),
          description: t("settings.playback.earlyScroll.desc"),
          keywords: "lead ahead scorrimento anticipato",
          useNote: useEarlyScrollNote,
          Control: EarlyScrollControl,
        },
        {
          id: "scrollLeadMs",
          label: t("settings.playback.earlyScrollMs.label"),
          description: t("settings.playback.earlyScrollMs.desc"),
          keywords: "lead ahead anticipo scorrimento",
          stacked: true,
          useDisabled: useEarlyScrollMsDisabled,
          Control: EarlyScrollMsControl,
        },
        {
          id: "staticAutoScroll",
          label: t("settings.playback.staticAutoScroll.label"),
          description: t("settings.playback.staticAutoScroll.desc"),
          keywords: "static plain unsynced vocals pace scorrimento automatico",
          Control: StaticAutoScrollControl,
        },
        {
          id: "showScrollToActive",
          label: t("settings.playback.scrollToActive.label"),
          description: t("settings.playback.scrollToActive.desc"),
          keywords: "jump back current line arrow torna riga attuale",
          Control: ShowScrollToActiveControl,
        },
      ],
    },
  ],
};
