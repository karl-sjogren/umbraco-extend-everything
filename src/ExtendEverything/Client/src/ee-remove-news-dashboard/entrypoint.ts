import { UmbEntryPointOnInit, UmbEntryPointOnUnload } from '@umbraco-cms/backoffice/extension-api';

export const onInit: UmbEntryPointOnInit = (_host, extensionRegistry) => {
  extensionRegistry.exclude('Umb.Dashboard.UmbracoNews');
};

export const onUnload: UmbEntryPointOnUnload = (_host, _extensionRegistry) => {
};
