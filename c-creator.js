import { LitElement, html, css } from "lit";
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";

export class CCreator extends LitElement {
  static properties = {
    title: { type: String },
    theme: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      margin: 8px 0;
      border: 2px solid var(--border-color, #ccc);
      border-radius: 8px;
      font-family: Arial, sans-serif;
      background-color: var(--background-color, #fff);
      color: var(--text-color, #000);
      transition: box-shadow 0.3s ease, transform 0.3s ease;
    }

    :host(:hover) {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
    }

    :host([theme="dark"]) {
      --background-color: #333;
      --text-color: #fff;
      --border-color: #555;
    }
  `;

  constructor() {
    super();
    this.title = "Design Your Character";
    this.characterSettings = {
      seed: "00000000",
      base: 0,
      face: 0,
      faceitem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      glasses: false,
      hatColor: 0,
      size: 200,
      name: "",
      fire: false,
      walking: false,
    };
    this._applySeedToSettings();
  }

  _applySeedToSettings() {
    const seed = this.characterSettings.seed;
    const paddedSeed = seed.padStart(8, "0").slice(0, 8);
    const values = paddedSeed.split("").map((v) => parseInt(v, 10));

    [
      this.characterSettings.base,
      this.characterSettings.face,
      this.characterSettings.faceitem,
      this.characterSettings.hair,
      this.characterSettings.pants,
      this.characterSettings.shirt,
      this.characterSettings.skin,
      this.characterSettings.hatColor,
    ] = values;

    this.requestUpdate();
  }

  static get properties() {
    return {
      ...super.properties,
      characterSettings: { type: Object },
    };
  }

  _updateSetting(key, value) {
    console.log(value);

    this.characterSetting[key] = value;
  }

  render() {
    return html`
      <div>
        <h3>${this.title}</h3>
        <rpg-character
          base="${this.characterSettings.base}"
          face="${this.characterSettings.face}"
          faceitem="${this.characterSettings.faceitem}"
          hair="${this.characterSettings.hair}"
          pants="${this.characterSettings.pants}"
          shirt="${this.characterSettings.shirt}"
          skin="${this.characterSettings.skin}"
          hatColor="${this.characterSettings.hatColor}"
          .fire="${this.characterSettings.fire}"
          .walking="${this.characterSettings.walking}"
          style="
              --character-size: ${this.characterSettings.size}px;
              --hat-color: hsl(${this.characterSettings.hatColor}, 100%, 50%);
            "
        ></rpg-character>
        <label>hair</label>
        <wired-checkbox></wired-checkbox>
        <label>walking</label>
        <wired-checkbox></wired-checkbox>
        <label>fire</label>
        <wired-checkbox></wired-checkbox>
        <label>base</label>
        <wired-slider></wired-slider>
        <label>face</label>
        <wired-slider
          value="${this.characterSettings.face}"
          min="0"
          max="5"
        ></wired-slider>
        <label>faceitem</label>
        <wired-slider
          id="faceitem"
          value="${this.characterSettings.faceitem}"
          min="0"
          max="9"
          @change="${(e) => {
            this._updateSetting("faceitem", parseInt(e.detail.value));
          }}"
        ></wired-slider>
        <label>pants</label>
        <wired-slider
          id="pants"
          value="${this.characterSettings.pants}"
          min="0"
          max="9"
        ></wired-slider>

        <label>shirt</label>
        <wired-slider
          id="shirt"
          value="${this.characterSettings.shirt}"
          min="0"
          max="9"
        ></wired-slider>
        <label>skin</label>
        <wired-slider
          id="skin"
          value="${this.characterSettings.skin}"
          min="0"
          max="9"
        >
        </wired-slider>
        <label>hatColor</label>
        <wired-slider
          id="hatColor"
          value="${this.characterSettings.hatColor}"
          min="0"
        >
          max="9"
        </wired-slider>
      </div>
    `;
  }
}

customElements.define("c-creator", CCreator);
