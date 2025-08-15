import { ManifestDashboard } from "@umbraco-cms/backoffice/dashboard";

export default [
  {
    type: "dashboard",
    name: "Extend Everything Dashboard",
    alias: "ExtendEverything.Dashboard",
    elementName: "ee-dashboard",
    js: () => import("./element"),
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
  } as ManifestDashboard
];
