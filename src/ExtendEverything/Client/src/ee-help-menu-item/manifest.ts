import { UMB_HELP_MENU_ALIAS } from "@umbraco-cms/backoffice/help";
import { ManifestMenuItem } from "@umbraco-cms/backoffice/menu";

export default [
  {
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
  } as ManifestMenuItem
];
