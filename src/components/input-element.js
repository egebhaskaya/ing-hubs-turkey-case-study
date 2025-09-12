import { LitElement, html, css } from "lit";

export class InputElement extends LitElement {
  static properties = {
    label: { type: String },
    value: { type: String },
    name: { type: String },
    error: { type: String },
  };

  constructor() {
    super();
    this.label = "";
    this.value = "";
    this.name = "";
    this.error = "";
  }

  handleInputChange(event) {
    const value = event.target.value;
    this.value = value;

    this.dispatchEvent(
      new CustomEvent("input-change", {
        detail: {
          name: this.name,
          value: value,
        },
        bubbles: true,
      })
    );
  }

  render() {
    return html`
      <div class="input-container">
        <label>${this.label}</label>
        <input
          type="text"
          .value=${this.value}
          @input=${this.handleInputChange}
        />
        ${this.error ? html`<span class="error">${this.error}</span>` : ""}
      </div>
    `;
  }

  static styles = css`
    .input-container {
      display: flex;
      flex-direction: column;
      gap: 5px;
      max-width: 300px;
    }

    label {
      font-size: 14px;
      font-weight: 300;
      color: gray;
    }

    input {
      border: 1px solid gray;
      border-radius: 5px;
      padding: 4px;
      font-size: 14px;
      font-weight: 400;
      outline: none;
    }

    input:focus {
      outline: 1px solid #ff6202;
      border-color: #ff6202;
    }

    .error {
      color: #e74c3c;
      font-size: 12px;
      font-weight: 400;
      margin-top: 3px;
    }
  `;
}

customElements.define("input-element", InputElement);
