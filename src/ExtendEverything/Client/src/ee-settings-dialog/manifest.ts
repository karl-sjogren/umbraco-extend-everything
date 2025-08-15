import { ManifestModal } from "@umbraco-cms/backoffice/modal";

export default [
  {
    type: "modal",
    alias: "ExtendEverything.SettingsDialog",
    name: "Extend Everything Settings Dialog",
    element: () => import("./dialog")
  } as ManifestModal
];
