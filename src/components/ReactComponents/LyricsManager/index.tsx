import React, { useState } from "react";
import { toast } from "sonner";
import { useLyricsDB } from "./hooks/useLyricsDB";
import { useTracks } from "./hooks/useTracks";
import { useCurrentUri } from "./hooks/useCurrentUri";
import { SearchBar } from "./components/SearchBar";
import { TrackRow } from "./components/TrackRow";
import { IconButton } from "./components/IconButton";
import { UploadIcon, ResetIcon } from "./components/Icons";
import { SpotifyPlayer } from "../../Global/SpotifyPlayer";
import fetchLyrics from "../../../utils/Lyrics/fetchLyrics";
import ApplyLyrics from "../../../utils/Lyrics/Global/Applyer";
import { useStore } from "@nanostores/react";
import { t } from "../../../utils/i18n.ts";
import { $currentLyricsData, $language } from "../../../utils/stores";
import Logger from "../../../utils/Logger.ts";

const lyricsManagerLogger = new Logger("Lyrics Manager");

type LyricsDBPanelProps = {
  onUploadClick: () => void;
};

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9_\- .]/g, "_").slice(0, 100);
}

export default function LyricsDBPanel({ onUploadClick }: LyricsDBPanelProps) {
  useStore($language);
  const [query, setQuery] = useState("");
  const { uris, loading: dbLoading, remove, getRaw } = useLyricsDB();
  const { tracksByUri, loading: tracksLoading } = useTracks(uris);
  const currentUri = useCurrentUri();

  const loading = dbLoading || (uris.length > 0 && tracksLoading && tracksByUri.size === 0);

  function matchesQuery(uri: string): boolean {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    const track = tracksByUri.get(uri);
    if (track) {
      if (track.name.toLowerCase().includes(q)) return true;
      if (track.artists.some((a) => a.name.toLowerCase().includes(q))) return true;
    }
    return uri.toLowerCase().includes(q);
  }

  const filtered = uris.filter(matchesQuery);

  // Pin the currently playing track to the top of the list.
  const currentIndex = currentUri ? filtered.indexOf(currentUri) : -1;
  if (currentIndex > 0) {
    filtered.unshift(filtered.splice(currentIndex, 1)[0]);
  }

  async function handleDownload(uri: string) {
    const ttml = await getRaw(uri);
    if (!ttml) {
      toast.error(t("ldb.downloadError"), { duration: 4000 });
      return;
    }
    const track = tracksByUri.get(uri);
    const filename = track
      ? `${sanitizeFilename(track.name)}.ttml`
      : `${sanitizeFilename(uri)}.ttml`;
    const blob = new Blob([ttml], { type: "application/ttml+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleDelete(uri: string) {
    try {
      await remove(uri);
      toast.success(t("ldb.removed"), { duration: 3000 });
    } catch {
      toast.error(t("ldb.removeError"), { duration: 4000 });
    }
  }

  function handlePlay(uri: string) {
    Spicetify.Player.playUri(uri);
  }

  function handleResetTTML() {
    const uri = SpotifyPlayer.GetUri();
    if (!uri) {
      toast.error(t("ldb.noTrack"), { duration: 4000 });
      return;
    }
    $currentLyricsData.set("");
    toast(t("ldb.resetDone"), { duration: 4000 });
    setTimeout(() => {
      fetchLyrics(uri)
        .then(ApplyLyrics)
        .catch((err) => {
          toast.error(t("ldb.applyError"), { duration: 4000 });
          lyricsManagerLogger.error("Error applying lyrics", err);
        });
    }, 25);
  }

  return (
    <div className="sl-ldb-root">
      <div className="sl-ldb-toolbar">
        <SearchBar value={query} onChange={setQuery} placeholder={t("ldb.searchPlaceholder")} />
        <IconButton
          icon={<ResetIcon size={14} />}
          label={t("ldb.resetTtml")}
          variant="danger"
          onClick={handleResetTTML}
          title={t("ldb.resetTtmlTitle")}
        />
        <IconButton
          icon={<UploadIcon size={14} />}
          label={t("ldb.uploadTtml")}
          variant="primary"
          onClick={onUploadClick}
        />
      </div>

      <div className="sl-ldb-list">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <TrackRow
              key={i}
              uri=""
              track={null}
              loading={true}
              onPlay={() => {}}
              onDownload={() => {}}
              onDelete={() => {}}
            />
          ))
        ) : filtered.length === 0 ? (
          <div className="sl-ldb-empty">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M20 8v14M20 27.5v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="20" cy="20" r="16.5" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <p>{query.trim() ? t("ldb.noMatches") : t("ldb.empty")}</p>
          </div>
        ) : (
          filtered.map((uri) => (
            <TrackRow
              key={uri}
              uri={uri}
              track={tracksByUri.get(uri) ?? null}
              loading={tracksLoading}
              isCurrentlyPlaying={uri === currentUri}
              onPlay={() => handlePlay(uri)}
              onDownload={() => handleDownload(uri)}
              onDelete={() => handleDelete(uri)}
            />
          ))
        )}
      </div>
    </div>
  );
}
