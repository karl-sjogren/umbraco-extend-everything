import { UMB_COLLECTION_ALIAS_CONDITION } from "@umbraco-cms/backoffice/collection";

export default [
  {
    type: "collectionAction",
    kind: "button",
    alias: "ExtendEverything.MediaCollectionAction",
    name: "Extend Everything Media Collection Action",
    api: () => import("./action"),
    meta: {
      label: "Extend Everything Media Collection Action",
      additionalOptions: false
    },
    conditions: [
      {
        alias: UMB_COLLECTION_ALIAS_CONDITION,
        match: 'Umb.Collection.Media'
      },
    ]
  } as UmbExtensionManifest
]
