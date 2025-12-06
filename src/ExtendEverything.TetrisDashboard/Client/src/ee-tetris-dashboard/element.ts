/* global ClassicTetris */
import { css, html, customElement, query } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import ClassicTetris from './vendor/classic-tetris.ts';

@customElement('ee-tetris-dashboard')
export class ExtendEverythingTetrisDashboardElement extends UmbLitElement {
  @query('#tetris-canvas')
  private _tetrisCanvas!: HTMLCanvasElement;

  /*@state()
  private _version = '';*/


  private _tetrisGameInstance: ClassicTetris | undefined;

  constructor() {
    super();
  }

  firstUpdated() {
    var bodyStyles = window.getComputedStyle(document.body);
    var fontFamily = bodyStyles.getPropertyValue('--uui-font-family');

    this._tetrisGameInstance = new ClassicTetris(this._tetrisCanvas, {
      canvasFont: `22px ${fontFamily}`,
      canvasFontColor: '#000',
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._tetrisGameInstance?.quit();
    this._tetrisGameInstance = undefined;
  }

  #playPauseButtonClick() {
    this._tetrisGameInstance?.togglePlayPause();
  }

  render() {
    return html`
      <uui-box>
        <span slot="headline">
          <umb-localize key="tetris_dashboard_heading">tetris_dashboard_heading</umb-localize>
        </span>

        <span slot="header-actions">
          <uui-button label="Increase value" @click=${this.#playPauseButtonClick}>
            <uui-icon>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"/></svg>
            </uui-icon>
          </uui-button>
        </span>

        <div class="stack">
          <canvas id="tetris-canvas" class="tetris-canvas" width="520" height="600"></canvas>

          <uui-button-group>
            <uui-button look="primary" label="Play / Pause" @click=${this.#playPauseButtonClick}>
              <umb-localize key="tetris_dashboard_play_pause_button">tetris_dashboard_play_pause_button</umb-localize>
            </uui-button>
          </uui-button-group>
        </div>
      </uui-box>

      <uui-box>
        <umb-localize key="tetris_dashboard_classic_tetris">tetris_dashboard_classic_tetris</umb-localize>
        &mdash;
        <a href="https://github.com/albertlabo/classic-tetris" target="_blank" rel="noopener">
          <umb-localize key="tetris_dashboard_classic_tetris_link">tetris_dashboard_classic_tetris_link</umb-localize>
        </a>
      </uui-box>

      `;
  }

  static styles = [
    css`
      :host {
        display: block;
        padding: 24px;
      }

      .tetris-canvas {
      }

      .stack {
        display: inline-flex;
        flex-direction: column;
      }

      uui-box {
        margin-bottom: 16px;
      }
    `,
  ];
}

export default ExtendEverythingTetrisDashboardElement;

declare global {
  interface HTMLElementTagNameMap {
    'ee-tetris-dashboard': ExtendEverythingTetrisDashboardElement;
  }
}
