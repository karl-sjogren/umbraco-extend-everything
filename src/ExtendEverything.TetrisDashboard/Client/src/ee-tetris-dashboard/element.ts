/* global ClassicTetris */
import { css, html, customElement, query } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement } from "@umbraco-cms/backoffice/lit-element";
import ClassicTetris from './vendor/classic-tetris.ts';

@customElement('ee-tetris-dashboard')
export class ExtendEverythingTetrisDashboardElement extends UmbLitElement {
  @query('#tetris-canvas')
  private _tetrisCanvas!: HTMLCanvasElement;

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
      backgroundColor: '#FFF',
      gridColor: '#f00',
      borderColor: '#444',
      ghostColor: ['#aaa', '#ddd'],

      pauseText: this.localize.term('tetris_dashboard_tetris_paused') ?? 'Paused',
      scoreText: this.localize.term('tetris_dashboard_tetris_score') ?? 'Score',
      levelText: this.localize.term('tetris_dashboard_tetris_level') ?? 'Level',
      linesText: this.localize.term('tetris_dashboard_tetris_lines') ?? 'Lines',
      nextText: this.localize.term('tetris_dashboard_tetris_next') ?? 'Next'
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
        <a href="https://github.com/llop/classic-tetris-js/" target="_blank" rel="noopener">
          <umb-localize key="tetris_dashboard_classic_tetris_link">tetris_dashboard_classic_tetris_link</umb-localize>
        </a>
        &mdash;
        <umb-localize key="tetris_dashboard_extend_everything">tetris_dashboard_extend_everything</umb-localize>
        &mdash;
        <a href="https://github.com/karl-sjogren/umbraco-extend-everything/" target="_blank" rel="noopener">
          <umb-localize key="tetris_dashboard_extend_everything_link">tetris_dashboard_extend_everything_link</umb-localize>
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
