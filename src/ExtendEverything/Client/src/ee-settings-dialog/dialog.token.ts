import { UmbModalToken } from "@umbraco-cms/backoffice/modal";

export type ExtendEverythingSettingsDialogData = {
}

export type ExtendEverythingSettingsDialogValue = {
}

export const EXTEND_EVERYTHING_SETTINGS_DIALOG_TOKEN = new UmbModalToken<ExtendEverythingSettingsDialogData, ExtendEverythingSettingsDialogValue>('ExtendEverything.SettingsDialog', {
    modal: {
        type: 'dialog',
        size: 'large'
    }
});
