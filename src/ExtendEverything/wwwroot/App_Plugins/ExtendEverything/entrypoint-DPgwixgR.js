const e = /* @__PURE__ */ Object.assign({ "../localization/en.ts": () => import("./en-DSDn5CmT.js"), "../localization/sv.ts": () => import("./sv-scnKmJBA.js") }), s = (o, t) => {
  const a = {
    type: "dashboard",
    name: "Extend Everything Dashboard",
    alias: "ExtendEverything.Dashboard",
    elementName: "ee-dashboard",
    js: () => import("./ee-dashboard-DhB2Ug7r.js"),
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
  };
  t.register(a), n("English", "en", t), n("Swedish", "sv", t);
}, n = async (o, t, a) => {
  const i = {
    type: "localization",
    alias: "ExtendEverything.Localize." + t,
    name: o,
    meta: {
      culture: t
    },
    js: e[`../localization/${t}.ts`]
  };
  a.register(i);
}, l = (o, t) => {
  console.log("Goodbye from my extension 👋");
};
export {
  s as onInit,
  l as onUnload
};
//# sourceMappingURL=entrypoint-DPgwixgR.js.map
