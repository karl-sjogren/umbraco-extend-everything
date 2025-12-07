import { ManifestLocalization } from "@umbraco-cms/backoffice/localization";
import { UmbLocalizationDictionary } from "@umbraco-cms/backoffice/localization-api";

const localization = import.meta.glob('./translations/*') as Record<string, () => Promise<{ default: UmbLocalizationDictionary }>>;

console.log(localization);

export default [
  {
    type: "localization",
    alias: "ExtendEverything.TetrisDashboard.Localize.English",
    name: "English",
    meta: {
      culture: "en"
    },
    js: localization[`./translations/en.ts`]
  } as ManifestLocalization,
  {
    type: "localization",
    alias: "ExtendEverything.TetrisDashboard.Localize.Swedish",
    name: "Swedish",
    meta: {
      culture: "sv"
    },
    js: localization[`./translations/sv.ts`]
  } as ManifestLocalization
];
