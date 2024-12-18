import { LitElement, html, css } from "lit";
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";
import { WiredButton } from "wired-elements";

export class CCreator extends LitElement {
  static properties = {
    title: { type: String },
    theme: { type: String },
    characterSettings: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
      padding: 20px;
      background-color: #f5f8fa;
      border: 1px solid #ddd;
      border-radius: 8px;
      transition: background-color 0.3s ease;
    }

    :host(:hover) {
      background-color: #e8f0ff;
    }

    wired-button {
      --wired-button-bg: #6a8dff;
      --wired-button-hover-bg: #5a7eea;
      --wired-button-text-color: #ffffff;
      color: #000000;
      border-radius: 4px;
      transition: transform 0.2s ease;
      font-size: 16px;
      text-transform: none;
    }

    wired-button:hover {
      background-color: #5a7eea;
    }

    wired-button:active {
      transform: scale(0.95);
    }

    .character {
  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.controls {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

    wired-checkbox[checked] {
      --wired-checkbox-icon-color: #4caf50;
      transition: transform 0.3s ease;
    }

    wired-slider:active {
      --wired-slider-knob-color: #9b59b6;
      --wired-slider-bar-color: #dcdcdc;
    }

    @media (min-width: 768px) {
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
}


    wired-slider {
      --wired-slider-knob-color: #6a8dff;
      --wired-slider-bar-color: #ccc;
      margin: 10px 0;
    }

    wired-checkbox,
    wired-slider,
    wired-button {
      margin: 10px 0;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .character {
      width: 80px;
      height: 80px;
      margin-bottom: 16px;
    }

    .controls {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }

    wired-slider {
      width: 100%;
    }

    wired-checkbox {
      display: flex;
      align-items: center;
      gap: 8px;
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
    this._checkForSeedInURL(); 
  }

  
  _checkForSeedInURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const seed = urlParams.get("seed");

    if (seed) {
      this.characterSettings.seed = seed;
      this._applySeedToSettings(seed); 
    }
  }

  
  _applySeedToSettings(seed = this.characterSettings.seed) {
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

 
  _generateSeed() {
    const { base, face, faceitem, hair, pants, shirt, skin, hatColor } = this.characterSettings;
    this.characterSettings.seed = `${base}${face}${faceitem}${hair}${pants}${shirt}${skin}${hatColor}`;
  }


  _updateSetting(key, value) {
    this.characterSettings = { ...this.characterSettings, [key]: value };
    this._generateSeed();
    this._applySeedToSettings(); 
    this.requestUpdate();
  }

  
  _generateShareLink() {
    this._generateSeed(); 
    const baseUrl = window.location.href.split("?")[0];
    const params = new URLSearchParams({ seed: this.characterSettings.seed }).toString();
    const shareLink = `${baseUrl}?${params}`;

    navigator.clipboard.writeText(shareLink).then(
      () => this._showNotification("Link copied!"),
      (err) => this._showNotification(`Error: ${err}`)
    );
  }

  
  _showNotification(message) {
    alert(message);
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

        <div> Seed: ${this.characterSettings.seed}</div>

        <label>Base</label>
        <wired-checkbox
          ?checked="${this.characterSettings.base === 1}"
          @change="${(e) => this._updateSetting('base', e.target.checked ? 1 : 0)}"
        ></wired-checkbox>

        <label>Walking</label>
        <wired-checkbox
          .checked="${this.characterSettings.walking}"
          @change="${(e) => this._updateSetting('walking', e.target.checked)}"
        ></wired-checkbox>

        <label>Fire</label>
        <wired-checkbox
          .checked="${this.characterSettings.fire}"
          @change="${(e) => this._updateSetting('fire', e.target.checked)}"
        ></wired-checkbox>

        <label>Face</label>
        <wired-slider
          value="${this.characterSettings.face}"
          min="0"
          max="5"
          @change="${(e) => {
            this._updateSetting("face", parseInt(e.detail.value));
          }}"
        ></wired-slider>

        <label>Face Item</label>
        <wired-slider
          value="${this.characterSettings.faceitem}"
          min="0"
          max="9"
          @change="${(e) => {
            this._updateSetting("faceitem", parseInt(e.detail.value));
          }}"
        ></wired-slider>

        <label>Pants</label>
        <wired-slider
          value="${this.characterSettings.pants}"
          min="0"
          max="9"
          @change="${(e) => {
            this._updateSetting("pants", parseInt(e.detail.value));
          }}"
        ></wired-slider>

        <label>Shirt</label>
        <wired-slider
          value="${this.characterSettings.shirt}"
          min="0"
          max="9"
          @change="${(e) => {
            this._updateSetting("shirt", parseInt(e.detail.value));
          }}"
        ></wired-slider>

        <label>Skin</label>
        <wired-slider
          value="${this.characterSettings.skin}"
          min="0"
          max="9"
          @change="${(e) => {
            this._updateSetting("skin", parseInt(e.detail.value));
          }}"
        ></wired-slider>

        <label>Hat Color</label>
        <wired-slider
          value="${this.characterSettings.hatColor}"
          min="0"
          max="9"
          @change="${(e) => {
            this._updateSetting("hatColor", parseInt(e.detail.value));
            
          }}"
        ></wired-slider>

        <label>Hair</label>
        <wired-slider
          value="${this.characterSettings.hair}"
          min="0"
          max="9"
          @change="${(e) => {
            this._updateSetting("hair", parseInt(e.detail.value));
          }}"
        ></wired-slider>

        <label>Share Link</label>
        <wired-button
          id="share-link"
          @click="${() => this._generateShareLink()}"
        >
          Generate Link
        </wired-button>
      </div>
    `;
  }
}

customElements.define("c-creator", CCreator);
