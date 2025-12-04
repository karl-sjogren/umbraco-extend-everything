import Dashboard from './ee-dashboard/manifest';
import HelpMenuItem from './ee-help-menu-item/manifest';
import Localization from './ee-localization/manifest';
import MediaCollectionAction from './ee-media-collection-action/manifest';
import RemoveNewsDashboard from './ee-remove-news-dashboard/manifest';
import SettingsDialog from './ee-settings-dialog/manifest';
import MainEntryPoint from './ee-entrypoint/manifest';
import Theme from './ee-theme/manifest';

// Job of the bundle is to collate all the manifests from different parts of the extension and load other manifests
// We load this bundle from umbraco-package.json
export const manifests: Array<UmbExtensionManifest> = [
  ...Dashboard,
  ...HelpMenuItem,
  ...MediaCollectionAction,
  ...RemoveNewsDashboard,
  ...SettingsDialog,
  ...MainEntryPoint,
  ...Localization,
  ...Theme
];
