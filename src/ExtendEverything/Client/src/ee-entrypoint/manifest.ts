export default [
  {
    name: "Extend Everything Entrypoint",
    alias: "ExtendEverything.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint"),
  } as UmbExtensionManifest
];
