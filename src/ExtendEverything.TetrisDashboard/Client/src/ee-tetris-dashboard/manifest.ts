import { ManifestDashboard } from "@umbraco-cms/backoffice/dashboard";

export default [
  {
    type: "dashboard",
    name: "Tetris Dashboard",
    alias: "ExtendEverything.TetrisDashboard",
    elementName: "ee-tetris-dashboard",
    js: () => import("./element"),
    weight: 10,
    meta: {
      label: "Tetris Dashboard",
      pathname: "ee-tetris-dashboard"
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Content"
      }
    ]
  } as ManifestDashboard
];
