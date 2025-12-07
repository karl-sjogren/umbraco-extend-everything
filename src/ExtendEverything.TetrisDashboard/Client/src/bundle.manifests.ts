import TetrisDashboard from "./ee-tetris-dashboard/manifest.js";
import Localization from "./ee-tetris-localization/manifest.js";

// Job of the bundle is to collate all the manifests from different parts of the extension and load other manifests
// We load this bundle from umbraco-package.json
export const manifests: Array<UmbExtensionManifest> = [
  ...TetrisDashboard,
  ...Localization,
];
