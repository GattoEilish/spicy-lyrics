import React from "react";
import { t } from "../../utils/i18n.ts";
import { NoticeLink, showNotice } from "./NoticeDialog.tsx";

const DISCORD_URL = "https://discord.com/invite/uqgXU5wh8j";

export const releaseNotesUrl = (version: string) =>
  `https://github.com/Spikerko/spicy-lyrics/releases/tag/${encodeURIComponent(version)}`;

export function showUpdatedDialog(fromVersion: string, toVersion: string) {
  showNotice({
    title: t("updatedDialog.title", { version: toVersion }),
    content: [
      <p className="sl-notice-text">
        {t("updatedDialog.bodyPrefix")}
        <span className="sl-notice-version">{fromVersion}</span>
        {t("updatedDialog.bodySuffix")}
      </p>,
      <p className="sl-notice-text sl-notice-text--quiet">
        {t("updatedDialog.brokenPrefix")}
        <NoticeLink href={DISCORD_URL}>Discord</NoticeLink>.
      </p>,
    ],
    primary: {
      label: t("updatedDialog.readNotes"),
      onClick: () => window.open(releaseNotesUrl(toVersion), "_blank"),
    },
    secondaryLabel: t("common.close"),
  });
}
