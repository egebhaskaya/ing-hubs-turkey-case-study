import { LitElement, html, css } from "lit";
import { t } from "../utils/translate.js";

import "../components/button-element.js";
import "../components/input-element.js";

export class SearchInputElement extends LitElement {
  static properties = {
    placeholder: { type: String },
    value: { type: String },
  };

  constructor() {
    super();
    this.placeholder = "";
    this.value = "";
  }

  handleInput(event) {
    const newValue = event.target.value;
    this.value = newValue;
  }

  handleSearch() {
    this.dispatchEvent(
      new CustomEvent("search", {
        detail: { searchTerm: this.value },
      })
    );
  }

  handleKeyDown(event) {
    if (event.key === "Enter") {
      this.handleSearch();
    }
  }

  handleClear() {
    this.value = "";

    this.dispatchEvent(
      new CustomEvent("search", {
        detail: { searchTerm: "" },
      })
    );
  }

  render() {
    return html`
      <div class="container">
        <input-element
          type="text"
          placeholder="${this.placeholder}"
          .value="${this.value}"
          @input="${this.handleInput}"
          @keydown="${this.handleKeyDown}"
        >
        </input-element>

        <div class="button-container">
          <button-element
            label="${t("search")}"
            bgColor="#ff6202"
            textColor="white"
            @click="${this.handleSearch}"
          >
          </button-element>

          <button-element
            @click="${this.handleClear}"
            type="button"
            label="${t("clear")}"
          >
          </button-element>
        </div>
      </div>
    `;
  }

  static styles = css`
    .container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    .button-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin-top: 4px;
    }

    @media (max-width: 768px) {
      .container {
        flex-direction: column;
      }
    }
  `;
}

customElements.define("search-input-element", SearchInputElement);
