import React, { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "@nanostores/react";
import { toast } from "sonner";
import { SpotifyPlayer } from "../../../../components/Global/SpotifyPlayer";
import fetchLyrics from "../../../../utils/Lyrics/fetchLyrics";
import ApplyLyrics from "../../../../utils/Lyrics/Global/Applyer";
import { ParseTTML } from "../../../../utils/Lyrics/manager/parseTTML";
import { ProcessLyrics } from "../../../../utils/Lyrics/ProcessLyrics";
import { $currentLyricsData, $language, $ttmlUploadMode } from "../../../../utils/stores";
import { t } from "../../../../utils/i18n.ts";
import { LocalLyricsManager } from "../../../../utils/Lyrics/manager";
import { ArrowLeftIcon, ClockIcon, DatabaseIcon, SpinnerIcon, UploadIcon } from "./Icons";
import Logger from "../../../../utils/Logger.ts";

const uploadLogger = new Logger("TTML Upload");

type UploadMode = "persistent" | "temporary";

type UploadTTMLModalProps = {
  onBack: () => void;
  onDone: (mode: UploadMode) => void;
};

const getModes = (): { id: UploadMode; label: string; hint: string; icon: React.ReactNode }[] => [
  {
    id: "persistent",
    label: t("upload.save"),
    hint: t("upload.saveHint"),
    icon: <DatabaseIcon size={14} />,
  },
  {
    id: "temporary",
    label: t("upload.justOnce"),
    hint: t("upload.justOnceHint"),
    icon: <ClockIcon size={14} />,
  },
];

export default function UploadTTMLModal({ onBack, onDone }: UploadTTMLModalProps) {
  useStore($language);
  // Persisted, so the screen reopens on whichever mode was used last.
  const storedMode = useStore($ttmlUploadMode);
  const mode: UploadMode = storedMode === "temporary" ? "temporary" : "persistent";
  const setMode = (m: UploadMode) => $ttmlUploadMode.set(m);

  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  // The handlers below are re-created on every render, so keep the live values
  // in refs — the paste listener is bound once.
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const uploadingRef = useRef(uploading);
  uploadingRef.current = uploading;

  const songName = SpotifyPlayer.GetName() ?? t("upload.unknownSong");

  /** Read + apply a file straight away — picking the file *is* the upload. */
  const startUpload = useCallback(
    (file: File | null | undefined) => {
      if (!file || uploadingRef.current) return;

      // `accept` only filters the picker — drag & drop and paste bypass it.
      if (!file.name.toLowerCase().endsWith(".ttml")) {
        toast.error(t("upload.onlyTtml"), { duration: 5000 });
        return;
      }

      const uri = SpotifyPlayer.GetUri();
      if (!uri) {
        toast.error(t("ldb.noTrack"), { duration: 5000 });
        return;
      }

      const uploadMode = modeRef.current;
      setUploading(true);

      const reader = new FileReader();
      reader.onerror = () => {
        toast.error(t("upload.readError"), { duration: 5000 });
        setUploading(false);
      };
      reader.onload = async (e) => {
        try {
          const ttml = e.target?.result as string;

          if (uploadMode === "persistent") {
            await LocalLyricsManager.put(uri, ttml);
            $currentLyricsData.set("");
            setTimeout(() => {
              fetchLyrics(uri).then(ApplyLyrics);
            }, 25);
            toast.success(t("upload.saved"), { duration: 5000 });
            onDone("persistent");
          } else {
            const result = ParseTTML(ttml);
            if (!result) {
              toast.error(t("upload.parseError"), { duration: 5000 });
              setUploading(false);
              return;
            }
            // The source rides along so a spelling change can romanize it again (fetchLyrics).
            const dataToSave = { ...result, uri, temporaryUpload: true, uploadedTTML: ttml };
            await ProcessLyrics(dataToSave);
            $currentLyricsData.set(JSON.stringify(dataToSave));
            setTimeout(() => {
              fetchLyrics(uri)
                .then((lyrics) => {
                  ApplyLyrics(lyrics);
                  toast.success(t("upload.applied"), { duration: 5000 });
                })
                .catch((err) => {
                  toast.error(t("ldb.applyError"), { duration: 5000 });
                  uploadLogger.error("Error applying lyrics", err);
                });
            }, 25);
            onDone("temporary");
          }
        } catch (err) {
          toast.error(t("upload.failed"), { duration: 5000 });
          uploadLogger.error("TTML upload error", err);
          setUploading(false);
        }
      };
      reader.readAsText(file);
    },
    [onDone]
  );

  // Ctrl+V a copied .ttml file to upload it without touching the picker.
  useEffect(() => {
    function onPaste(e: ClipboardEvent) {
      const file = e.clipboardData?.files?.[0];
      if (!file) return;
      e.preventDefault();
      startUpload(file);
    }
    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
  }, [startUpload]);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    startUpload(e.dataTransfer.files?.[0]);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    startUpload(e.target.files?.[0]);
    // Allow re-picking the same file after a failed attempt.
    e.target.value = "";
  }

  return (
    <div className="sl-ldb-upload-root">
      <div className="sl-ldb-upload-bar">
        <button
          type="button"
          className="sl-ldb-upload-back"
          onClick={onBack}
          disabled={uploading}
          title={t("upload.backTitle")}
          aria-label={t("upload.backAria")}
        >
          <ArrowLeftIcon size={14} />
        </button>

        <div className="sl-ldb-upload-modes" role="radiogroup" aria-label={t("upload.modeAria")}>
          {getModes().map((m) => (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={mode === m.id}
              className={`sl-ldb-upload-mode${mode === m.id ? " sl-ldb-upload-mode--active" : ""}`}
              onClick={() => setMode(m.id)}
              disabled={uploading}
              title={m.hint}
            >
              {m.icon}
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      <input
        type="file"
        accept=".ttml"
        id="sl-ldb-file-input"
        className="sl-ldb-file-input"
        onChange={handleFileChange}
      />
      <label
        htmlFor="sl-ldb-file-input"
        className={`sl-ldb-dropzone${dragging ? " sl-ldb-dropzone--dragging" : ""}${uploading ? " sl-ldb-dropzone--busy" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          if (!uploading) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <span className="sl-ldb-dropzone-icon">
          {uploading ? <SpinnerIcon size={26} /> : <UploadIcon size={26} />}
        </span>
        <span className="sl-ldb-dropzone-title">
          {uploading
            ? t("upload.uploading")
            : dragging
              ? t("upload.dropToUpload")
              : t("upload.dropOrClick")}
        </span>
        <span className="sl-ldb-dropzone-sub">
          {mode === "persistent" ? t("upload.savesFor") : t("upload.appliesFor")} {songName}
        </span>
      </label>
    </div>
  );
}
