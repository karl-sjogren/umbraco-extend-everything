const a = [
  {
    type: "dashboard",
    name: "Tetris Dashboard",
    alias: "ExtendEverything.TetrisDashboard",
    elementName: "ee-tetris-dashboard",
    js: () => import("./element-AECaiYxF.js"),
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
  }
], t = /* @__PURE__ */ Object.assign({ "./translations/en.ts": () => import("./en--MWoIkLe.js"), "./translations/sv.ts": () => import("./sv-9SXLtkyF.js") });
console.log(t);
const s = [
  {
    type: "localization",
    alias: "ExtendEverything.TetrisDashboard.Localize.English",
    name: "English",
    meta: {
      culture: "en"
    },
    js: t["./translations/en.ts"]
  },
  {
    type: "localization",
    alias: "ExtendEverything.TetrisDashboard.Localize.Swedish",
    name: "Swedish",
    meta: {
      culture: "sv"
    },
    js: t["./translations/sv.ts"]
  }
], e = [
  ...a,
  ...s
];
export {
  e as manifests
};
//# sourceMappingURL=extend-everything-tetris-dashboard.js.map
