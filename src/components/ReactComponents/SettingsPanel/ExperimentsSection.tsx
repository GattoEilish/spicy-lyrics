import type React from "react";
import {
  EXPERIMENT_CATEGORIES,
  getVisibleExperiments,
  RefreshExperimentOverrides,
} from "../../../utils/experiments.ts";
import {
  getLocalizedExperiment,
  getLocalizedExperimentCategory,
  t,
} from "../../../utils/i18n.ts";
import { ExperimentRow, SyncStatus } from "./ExperimentsPanel.tsx";
import { ExperimentsIcon } from "./icons.tsx";
import type { SectionDef } from "./model.ts";

export const experimentsSection: SectionDef = {
  id: "experiments",
  get title() {
    return t("settings.sections.experiments");
  },
  icon: ExperimentsIcon,
  get intro() {
    return t("settings.experiments.intro");
  },
  get emptyText() {
    return t("settings.experiments.empty");
  },
  Accessory: SyncStatus,
  // Before the tab renders, so its first frame is already locked and loading.
  onEnter: () => void RefreshExperimentOverrides(),
  groups: () => {
    const visible = getVisibleExperiments().map(getLocalizedExperiment);
    return EXPERIMENT_CATEGORIES.map(({ id, title }) => {
      const categoryTitle = getLocalizedExperimentCategory(id, title);
      return {
        title: categoryTitle,
        settings: visible
          .filter((experiment) => experiment.category === id)
          .map((experiment) => ({
            id: `experiment:${experiment.id}`,
            label: experiment.label,
            description: experiment.description,
            keywords: `experiment sperimental ${title.toLowerCase()} ${categoryTitle.toLowerCase()}`,
            render: (label: React.ReactNode, searching: boolean) => (
              <ExperimentRow experiment={experiment} label={label} searching={searching} />
            ),
          })),
      };
    }).filter((group) => group.settings.length > 0);
  },
};
