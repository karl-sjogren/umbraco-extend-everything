import { ManifestDashboard } from '@umbraco-cms/backoffice/dashboard';
import { ManifestBase, UmbConditionConfigBase, UmbEntryPointOnInit, UmbEntryPointOnUnload, UmbExtensionRegistry } from '@umbraco-cms/backoffice/extension-api';
import { ManifestLocalization } from '@umbraco-cms/backoffice/localization';
import { UmbLocalizationDictionary } from '@umbraco-cms/backoffice/localization-api';

const localization = import.meta.glob('../localization/*') as Record<string, () => Promise<{ default: UmbLocalizationDictionary }> >;

// load up the manifests here
export const onInit: UmbEntryPointOnInit = (_host, _extensionRegistry) => {

  const dashboardManifest = {
    type: "dashboard",
    name: "Extend Everything Dashboard",
    alias: "ExtendEverything.Dashboard",
    elementName: "ee-dashboard",
    js: () => import("../elements/ee-dashboard"),
    weight: -100,
    meta: {
        label: "Extend Everything Dashboard",
        pathname: "ee-dashboard"
    },
    conditions: [
        {
            alias: "Umb.Condition.SectionAlias",
            match: "Umb.Section.Content"
        }
    ]
  } as ManifestDashboard;

  _extensionRegistry.register(dashboardManifest);

  registerLocalization('English', 'en', _extensionRegistry);
  registerLocalization('Swedish', 'sv', _extensionRegistry);
};

const registerLocalization = async (languageName: string, languageCode: string, extensionRegistry: UmbExtensionRegistry<ManifestBase, UmbConditionConfigBase<string>, ManifestBase>) => {
  const localizationManifest = {
    type: "localization",
    alias: "ExtendEverything.Localize." + languageCode,
    name: languageName,
    meta: {
      culture: languageCode
    },
    js: localization[`../localization/${languageCode}.ts`]
  } as ManifestLocalization;

  extensionRegistry.register(localizationManifest);
}

export const onUnload: UmbEntryPointOnUnload = (_host, _extensionRegistry) => {
  console.log('Goodbye from my extension 👋');
};
