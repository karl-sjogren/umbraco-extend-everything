
import { UMB_CURRENT_USER_CONTEXT, UmbCurrentUserModel } from "@umbraco-cms/backoffice/current-user";
import { css, html, customElement, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { ExtendEverythingService } from "../api/services.gen"


@customElement('my-welcome-dashboard')
export class ExtendEverythingDashboardElement extends UmbLitElement {
    @state()
    private _currentUser?: UmbCurrentUserModel;

    @state()
    private _number = 0;

    @state()
    private _version = '';

    constructor() {
        super();
        this.consumeContext(UMB_CURRENT_USER_CONTEXT, (instance) => {
            this._observeCurrentUser(instance);
        });

        this.#fetchVersion();
    }

    async #fetchVersion() {
        const versionResponse = await ExtendEverythingService.version();
        this._version = versionResponse.data ?? 'unknown';

    }

    //Get the current user
    private async _observeCurrentUser(instance: typeof UMB_CURRENT_USER_CONTEXT.TYPE) {
        this.observe(instance.currentUser, (currentUser) => {
            this._currentUser = currentUser;
        });
    }

    #plusClicked() {
        this._number += 1;
    }

    #minusClicked() {
        this._number -= 1;
    }

    render() {
        return html`
            <uui-box>
                <span slot="headline">
                    <umb-localize key="dashboard_welcome_heading">dashboard_welcome_heading</umb-localize>
                    ${this._version}!
                </span>

                <span slot="header-actions">
                    <uui-button label="Settings" @click=${() => alert('Settings clicked')}>
                        <uui-icon name="settings"></uui-icon>
                    </uui-button>
                    <uui-button label="Increase value" @click=${this.#plusClicked}>
                        <uui-icon name="add"></uui-icon>
                    </uui-button>
                    <uui-button label="Decrease value" @click=${this.#minusClicked}>
                        <uui-icon name="remove"></uui-icon>
                    </uui-button>
                    <span>
                        Number: ${this._number}
                    </span>
                </span>

                <p>
                    <umb-localize key="dashboard_welcome_logged_in_as">dashboard_welcome_logged_in_as</umb-localize>
                    ${this._currentUser?.name ?? 'Unknown'}
                </p>

                <p>
                    <umb-localize key="dashboard_welcome_body">dashboard_welcome_body</umb-localize>
                </p>

                <uui-card-block-type name="Picture" description="A random picture from picsum.photos">
                    <img src="https://picsum.photos/250/150" alt="Random image" />
                    <uui-tag slot="tag">From picsum.photos</uui-tag>
                </uui-card-block-type>

                <uui-card-block-type name="Settings" description="Open settings dialog">
                    <uui-icon name="settings"></uui-icon>
                    <uui-tag slot="tag">Actionable card</uui-tag>
                </uui-card-block-type>

                <p><umb-localize key="common_copyright">common.copyright</umb-localize></p>
            </uui-box>
        `;
    }

    static styles = [
        css`
        :host {
            display: block;
            padding: 24px;
        }
    `,
    ];
}

export default ExtendEverythingDashboardElement;

declare global {
    interface HTMLElementTagNameMap {
        'ee-dashboard': ExtendEverythingDashboardElement;
    }
}
