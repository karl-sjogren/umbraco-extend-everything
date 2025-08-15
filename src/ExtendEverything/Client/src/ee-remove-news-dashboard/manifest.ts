export default [
  {
    name: "Extend Everything Remove News Dashboard",
    alias: "ExtendEverything.RemoveNewsDashboard",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint"),
  } as UmbExtensionManifest
];
