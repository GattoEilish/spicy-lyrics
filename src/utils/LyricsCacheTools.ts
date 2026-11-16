import { SpotifyPlayer } from "../components/Global/SpotifyPlayer.ts";
import PageView from "../components/Pages/PageView.ts";
import { toast } from "sonner";
import fetchLyrics, { LyricsStore } from "./Lyrics/fetchLyrics.ts";
import ApplyLyrics from "./Lyrics/Global/Applyer.ts";
import { $currentLyricsData } from "./stores.ts";
import { t } from "./i18n.ts";
import Logger from "./Logger.ts";

const cacheToolsLogger = new Logger("Lyrics Cache");

export const RemoveCurrentLyrics_AllCaches = async (ui: boolean = false) => {
  const currentSongId = SpotifyPlayer.GetId();
  if (!currentSongId || currentSongId === undefined) {
    ui
      ? toast.error(t("cache.noSongId"))
      : null;
  }
  try {
    await LyricsStore.RemoveItem(currentSongId ?? "");
    $currentLyricsData.set("");
    ui
      ? toast.success(t("cache.songCleared"))
      : null;
    if (PageView.IsOpened) {
      const uri = SpotifyPlayer.GetUri();
      if (uri && uri !== undefined) {
        fetchLyrics(uri).then(ApplyLyrics);
      }
    }
  } catch (error) {
    ui
      ? toast.error(t("cache.songClearError"))
      : null;
    cacheToolsLogger.error(error);
  }
};

export const RemoveLyricsCache = async (ui: boolean = false) => {
  try {
    await LyricsStore.Destroy();
    ui
      ? toast.success(t("cache.allCleared"))
      : null;
    if (PageView.IsOpened) {
      const uri = SpotifyPlayer.GetUri();
      if (uri && uri !== undefined) {
        fetchLyrics(uri).then(ApplyLyrics);
      }
    }
  } catch (error) {
    ui
      ? toast.error(t("cache.allClearError"))
      : null;
    cacheToolsLogger.error(error);
  }
};


export const RemoveCurrentLyrics_StateCache = (ui: boolean = false) => {
  try {
    $currentLyricsData.set("");
    ui
      ? toast.success(t("cache.stateCleared"))
      : null;
    if (PageView.IsOpened) {
      const uri = SpotifyPlayer.GetUri();
      if (uri && uri !== undefined) {
        fetchLyrics(uri).then(ApplyLyrics);
      }
    }
  } catch (error) {
    ui
      ? toast.error(t("cache.stateClearError"))
      : null;
    cacheToolsLogger.error(error);
  }
};
