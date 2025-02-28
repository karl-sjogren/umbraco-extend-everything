import { UMB_CURRENT_USER_CONTEXT as m } from "@umbraco-cms/backoffice/current-user";
import { html as h, css as d, state as l, customElement as _ } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as v } from "@umbraco-cms/backoffice/lit-element";
import { UmbUserCollectionRepository as y } from "@umbraco-cms/backoffice/user";
var b = Object.defineProperty, g = Object.getOwnPropertyDescriptor, u = (e) => {
  throw TypeError(e);
}, c = (e, t, r, s) => {
  for (var o = s > 1 ? void 0 : s ? g(t, r) : t, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (o = (s ? i(t, r, o) : i(o)) || o);
  return s && o && b(t, r, o), o;
}, U = (e, t, r) => t.has(e) || u("Cannot " + r), f = (e, t, r) => (U(e, t, "read from private field"), r ? r.call(e) : t.get(e)), E = (e, t, r) => t.has(e) ? u("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), p;
let a = class extends v {
  constructor() {
    super(), this._userData = [], E(this, p, new y(this)), this.consumeContext(m, (e) => {
      this._observeCurrentUser(e);
    }), this._getPagedUserData();
  }
  //Get the current user
  async _observeCurrentUser(e) {
    this.observe(e.currentUser, (t) => {
      this._currentUser = t;
    });
  }
  //Get all users
  async _getPagedUserData() {
    const { data: e } = await f(this, p).requestCollection();
    this._userData = (e == null ? void 0 : e.items) ?? [];
  }
  render() {
    var e;
    return h`
            <uui-box>
                <span slot="headline">
                    <umb-localize key="dashboard_welcome_heading">dashboard.welcome_heading</umb-localize>
                    ${((e = this._currentUser) == null ? void 0 : e.name) ?? "Unknown"}!
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
};
p = /* @__PURE__ */ new WeakMap();
a.styles = [
  d`
        :host {
            display: block;
            padding: 24px;
        }
    `
];
c([
  l()
], a.prototype, "_currentUser", 2);
c([
  l()
], a.prototype, "_userData", 2);
a = c([
  _("my-welcome-dashboard")
], a);
const P = a;
export {
  a as ExtendEverythingDashboardElement,
  P as default
};
//# sourceMappingURL=ee-dashboard-DhB2Ug7r.js.map
