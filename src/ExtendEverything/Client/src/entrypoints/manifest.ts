export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Extend Everything Entrypoint",
    alias: "ExtendEverything.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint"),
  }
];
