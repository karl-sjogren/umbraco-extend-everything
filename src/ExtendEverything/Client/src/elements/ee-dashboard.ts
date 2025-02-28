
import { UMB_CURRENT_USER_CONTEXT, UmbCurrentUserModel } from "@umbraco-cms/backoffice/current-user";
import { css, html, customElement, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import { UmbUserCollectionRepository, UmbUserDetailModel } from "@umbraco-cms/backoffice/user";

@customElement('my-welcome-dashboard')
export class ExtendEverythingDashboardElement extends UmbLitElement {
	@state()
    private _currentUser?: UmbCurrentUserModel;

    @state()
    private _userData: Array<UmbUserDetailModel> = [];

    #userRepository = new UmbUserCollectionRepository(this);

    constructor() {
        super();
        this.consumeContext(UMB_CURRENT_USER_CONTEXT, (instance) => {
            this._observeCurrentUser(instance);
        });
        this._getPagedUserData();
    }

    //Get the current user
    private async _observeCurrentUser(instance: typeof UMB_CURRENT_USER_CONTEXT.TYPE) {
        this.observe(instance.currentUser, (currentUser) => {
            this._currentUser = currentUser;
        });
    }

    //Get all users
    private async _getPagedUserData() {
        const { data } = await this.#userRepository.requestCollection();
        this._userData = data?.items ?? [];
    }

    render() {
        return html`
            <uui-box>
                <span slot="headline">
                    <umb-localize key="dashboard_welcome_heading">dashboard.welcome_heading</umb-localize>
                    ${this._currentUser?.name ?? 'Unknown'}!
                </span>

                <span slot="header-actions">
                    <uui-button popovertarget="my-popover">Open Popover</uui-button>
                </span>

                <uui-popover-container id="my-popover" margin="10">
                    My popover content
                </uui-popover-container>

                <p>
                    <umb-localize key="dashboard_welcome_body">dashboard.welcome_body</umb-localize>
                </p>

                <img src="https://picsum.photos/640/480" alt="Random image" />

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
