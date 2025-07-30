import { ManifestDashboard } from '@umbraco-cms/backoffice/dashboard';
import { ManifestBase, UmbConditionConfigBase, UmbEntryPointOnInit, UmbEntryPointOnUnload, UmbExtensionRegistry } from '@umbraco-cms/backoffice/extension-api';
import { ManifestLocalization } from '@umbraco-cms/backoffice/localization';
import { UmbLocalizationDictionary } from '@umbraco-cms/backoffice/localization-api';
import { client } from '../api/services.gen';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { UmbElement } from '@umbraco-cms/backoffice/element-api';
import { ManifestMenuItem } from '@umbraco-cms/backoffice/menu';
import { UMB_HELP_MENU_ALIAS } from '@umbraco-cms/backoffice/help';
import { ManifestModal } from '@umbraco-cms/backoffice/modal';

const localization = import.meta.glob('../localization/*') as Record<string, () => Promise<{ default: UmbLocalizationDictionary }> >;

export const onInit: UmbEntryPointOnInit = (host, extensionRegistry) => {

  registerDashboard(extensionRegistry);
  registerHelpMenuItem(extensionRegistry);
  registerSettingsDialog(extensionRegistry);

  removeDashboard(extensionRegistry, 'Umb.Dashboard.UmbracoNews');

  registerLocalization('English', 'en', extensionRegistry);
  registerLocalization('Swedish', 'sv', extensionRegistry);

  configureAuthToken(host);
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

const configureAuthToken = (host: UmbElement) => {
  host.consumeContext(UMB_AUTH_CONTEXT, (authContext) => {
    const config = authContext.getOpenApiConfiguration();

    config.token().then(token => {
      client.interceptors.request.use((request) => {
        request.headers.set('Authorization', `Bearer ${token}`);
        return request;
      });
    });
  });
}

const registerDashboard = (extensionRegistry: UmbExtensionRegistry<ManifestBase, UmbConditionConfigBase<string>, ManifestBase>) => {
  const dashboardManifest = {
    type: "dashboard",
    name: "Extend Everything Dashboard",
    alias: "ExtendEverything.Dashboard",
    elementName: "ee-dashboard",
    js: () => import("../elements/ee-dashboard"),
    weight: 1000,
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

  extensionRegistry.register(dashboardManifest);
}

const removeDashboard = (extensionRegistry: UmbExtensionRegistry<ManifestBase, UmbConditionConfigBase<string>, ManifestBase>, alias: string) => {
  extensionRegistry.exclude(alias);
};

const registerHelpMenuItem = (extensionRegistry: UmbExtensionRegistry<ManifestBase, UmbConditionConfigBase<string>, ManifestBase>) => {
  const helpManifest = {
    type: "menuItem",
    kind: "link",
    name: "Extend Everything Help Menu Item",
    alias: "ExtendEverything.HelpMenuItem",
    meta: {
      menus: [UMB_HELP_MENU_ALIAS],
      label: "Extend Everything on GitHub",
      icon: "icon-github",
      href: "https://github.com/karl-sjogren/umbraco-extend-everything"
    }
  } as ManifestMenuItem;

  extensionRegistry.register(helpManifest);
};

const registerSettingsDialog = (extensionRegistry: UmbExtensionRegistry<ManifestBase, UmbConditionConfigBase<string>, ManifestBase>) => {
  const settingsDialogManifest = {
    type: "modal",
    alias: "ExtendEverything.SettingsDialog",
    name: "Extend Everything Settings Dialog",
    element: () => import("../elements/ee-settings-dialog")
  } as ManifestModal;

  extensionRegistry.register(settingsDialogManifest);
};

export const onUnload: UmbEntryPointOnUnload = (_host, _extensionRegistry) => {
  console.log('Goodbye from my extension 👋');
};
