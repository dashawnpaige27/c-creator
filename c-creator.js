import { LitElement, html, css } from "lit";
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";
import { WiredButton } from "wired-elements";


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
      border: 2px solid var(--border-color, #060202);
      border-radius: 8px;
      font-family: Arial, sans-serif;
      background-color: var(--background-color, #060202);
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
    this.characterSettings = { ...this.characterSettings, [key]: value };
    console.log(this.characterSettings.faceitem)
    //this._generateSeed();
    this.requestUpdate();
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

        <label>base</label>
        <wired-checkbox
        ?checked="${this.characterSettings.base===1}"
        @change="${(e) => this._updateSetting('base', e.target.checked?1:0)}"
      ></wired-checkbox>
        <label>walking</label>
        <wired-checkbox
        .checked="${this.characterSettings.walking}"
        @change="${(e) => this._updateSetting('walking', e.target.checked)}"
        ></wired-checkbox>
        <label>fire</label>
        <wired-checkbox
        .checked="${this.characterSettings.fire}"
        @change="${(e) => this._updateSetting('fire', e.target.checked)}"
        ></wired-checkbox>
        
        

        <label>face</label>
        <wired-slider
          value="${this.characterSettings.face}"
          min="0"
          max="5"
          @change="${(e) => {
            this._updateSetting("face", parseInt(e.detail.value));
          }}"

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
          @change="${(e) => {
            this._updateSetting("pants", parseInt(e.detail.value));
          }}"
        ></wired-slider>

        <label>shirt</label>
        <wired-slider
          id="shirt"
          value="${this.characterSettings.shirt}"
          min="0"
          max="9"
          @change="${(e) => {
            this._updateSetting("shirt", parseInt(e.detail.value));
          }}"
        ></wired-slider>
        <label>skin</label>
        <wired-slider
          id="skin"
          value="${this.characterSettings.skin}"
          min="0"
          max="9"
          @change="${(e) => {
            this._updateSetting("skin", parseInt(e.detail.value));
          }}"
        >
        </wired-slider>
        <label>hatColor</label>
        <wired-slider
          id="hatColor"
          value="${this.characterSettings.hatColor}"
          min="0"
          max="9"
          @change="${(e) => {
            this._updateSetting("hatColor", parseInt(e.detail.value));
          }}"
        >
          
        </wired-slider>
        <label>hair</label>
        <wired-slider
          id="hair"
          value="${this.characterSettings.hair}"
          min="0"
          max="9"
          @change="${(e) => {
            this._updateSetting("hair", parseInt(e.detail.value));
          }}"
        >
          
        </wired-slider>

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

  _generateSeed() {
    const { 
      accesories,
      base,
      face,
      faceitem,
      hair,
      pants,
      shirt,
      skin,
      hatColor,

    } = this.characterSettings;
    this.characterSettings.seed = `${accesories}${base}${face}${faceitem}${hair}${pants}${shirt}${skin}${hatColor}`;
  }

  _updateSetting(key, value) {
    console.log("hi");
    this.characterSettings = { ...this.characterSettings, [key]: value};
    this._applySeedToSettings();
    this.requestUpdate();
  }
  _applySeedToSettings() {
    console.log("hello");
    const array = [
      this.characterSettings.accesories,
      this.characterSettings.base,
      this.characterSettings.face,
      this.characterSettings.faceitem,
      this.characterSettings.hair,
      this.characterSettings.pants,
      this.characterSettings.shirt,
      this.characterSettings.skin,
      this.characterSettings.hatColor,
    ];
    this.characterSettings.seed = array.join("");

    this.requestUpdate();
  }

  _generateShareLink() {
    const baseUrl = window.location.href.split("?")[0];
    const params = new URLSearchParams({
      seed: this.characterSettings.seed,
    }).toString();
    const shareLink = `${baseUrl}?${params}`;

    navigator.clipboard.writeText(shareLink).then(
      () => this._showNotification("Link copied!"),
      (err) => this._showNotification(`Error: ${err}`)
    );
  }

}

customElements.define("c-creator", CCreator);
