import { html, LitElement, property, customElement } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import type { UmbModalContext, UmbModalExtensionElement } from "@umbraco-cms/backoffice/modal";
import type { ExtendEverythingSettingsDialogData, ExtendEverythingSettingsDialogValue } from "./ee-settings-dialog.token.ts";

@customElement('custom-dialog')
export default class MyDialogElement
    extends UmbElementMixin(LitElement)
    implements UmbModalExtensionElement<ExtendEverythingSettingsDialogData, ExtendEverythingSettingsDialogValue> {

    @property({ attribute: false })
    modalContext?: UmbModalContext<ExtendEverythingSettingsDialogData, ExtendEverythingSettingsDialogValue>;

    @property({ attribute: false })
    data?: ExtendEverythingSettingsDialogData;

    private _handleClose() {
        this.modalContext?.reject();
    }

    private _handleSaveAndClose() {
        this.modalContext?.updateValue({ myData: "hello world" });
        this.modalContext?.submit();
    }

    render() {
        return html`
            <uui-dialog>
                <uui-dialog-layout>
                    <span slot="headline">
                        <uui-icon name="settings"></uui-icon> <umb-localize key="settings_dialog_headline">settings_dialog_headline</umb-localize>
                    </span>


                    <uui-form>
                    <form id="MyForm" name="myForm">
                        <uui-form-layout-item>
                        <uui-label for="MyCheckbox" slot="label" required="">Checkbox</uui-label>
                        <uui-checkbox id="MyCheckbox" name="checkbox" value="Bike" label="This is my checked checkbox" required="">
                            This is my checked checkbox
                        </uui-checkbox>
                        </uui-form-layout-item>

                        <uui-form-layout-item>
                        <uui-label for="MyToggle" slot="label" required="">Toggle</uui-label>
                        <uui-toggle id="MyToggle" name="toggle" label="This is my toggle" required="">
                            This is my toggle
                        </uui-toggle>
                        </uui-form-layout-item>

                        <uui-form-layout-item>
                        <uui-label for="MyRadioGroup" slot="label" required="">Radio Group</uui-label>
                        <uui-radio-group id="MyRadioGroup" name="radio" label="This is my radio" required="">
                            <uui-radio value="radio1" label="radio1" name="radio1">Label</uui-radio>
                            <uui-radio value="radio2" label="radio2" name="radio2">Label</uui-radio>
                            <uui-radio value="radio3" label="radio3" name="radio3">Label</uui-radio>
                        </uui-radio-group>
                        </uui-form-layout-item>

                        <uui-form-layout-item>
                        <uui-label for="MyEmailInput" slot="label" required="">Email</uui-label>
                        <uui-input id="MyEmailInput" name="email" type="email" label="Email" required=""></uui-input>
                        </uui-form-layout-item>

                        <uui-form-layout-item>
                        <uui-label for="MyPasswordInput" slot="label" required="">
                            Password
                        </uui-label>
                        <uui-input-password id="MyPasswordInput" name="password" label="Password" required="">
                        </uui-input-password>
                        </uui-form-layout-item>

                        <uui-form-layout-item>
                        <uui-label for="MySlider" slot="label" required="">Slider</uui-label>
                        <uui-slider id="MySlider" label="Slider" name="slider" value="5.5" min="0" max="10" step="1" required="">
                        </uui-slider>
                        </uui-form-layout-item>

                        <uui-form-layout-item>
                        <uui-label for="MyTextArea" slot="label" required="">Textarea</uui-label>
                        <uui-textarea id="MyTextArea" label="Textarea" name="textarea" value="Some long text that needs more space" minlength="10" maxlength="30" required="">
                        </uui-textarea>
                        </uui-form-layout-item>

                        <uui-form-layout-item>
                        <uui-label for="MySelect" slot="label" required="">Select</uui-label>
                        <uui-select id="MySelect" name="select" required="">
                        </uui-select>
                        </uui-form-layout-item>

                        <uui-form-layout-item>
                        <uui-label for="MyCombobox" slot="label" required="">Combobox</uui-label>
                        <uui-combobox id="MyCombobox" name="combobox" required="">
                            <uui-combobox-list>
                            <uui-combobox-list-option value="1">
                                Option 1
                            </uui-combobox-list-option>
                            <uui-combobox-list-option value="2">
                                Option 2
                            </uui-combobox-list-option>
                            <uui-combobox-list-option value="3">
                                Option 3
                            </uui-combobox-list-option>
                            <uui-combobox-list-option value="4">
                                Option 4
                            </uui-combobox-list-option>
                            </uui-combobox-list>
                        </uui-combobox>
                        </uui-form-layout-item>

                        <div>
                        <uui-button type="reset" label="Reset" look="secondary">Reset</uui-button>
                        <uui-button type="submit" label="Submit" look="primary">
                            Submit
                        </uui-button>
                        </div>
                    </form>
                    </uui-form>


                    <uui-button slot="actions"  @click=${this._handleClose}><umb-localize key="settings_dialog_actions_close">settings_dialog_actions_close</umb-localize></uui-button>
                    <uui-button slot="actions" look="primary" color="positive" @click=${this._handleSaveAndClose}><umb-localize key="settings_dialog_actions_save_and_close">settings_dialog_actions_save_and_close</umb-localize></uui-button>
                </uui-dialog-layout>
            </uui-dialog>
        `;
    }
}
