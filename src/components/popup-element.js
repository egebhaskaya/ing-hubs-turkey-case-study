import { LitElement, html, css } from "lit";
import { t } from "../utils/translate.js";

import "../components/button-element.js";

export class PopupElement extends LitElement {
  static properties = {
    title: { type: String },
    description: { type: String },
    show: { type: Boolean },
    onConfirm: { type: Function },
    onCancel: { type: Function },
  };

  constructor() {
    super();
    this.show = false;
  }

  handleConfirm() {
    this.dispatchEvent(new CustomEvent("confirm"));
  }

  handleCancel() {
    this.dispatchEvent(new CustomEvent("cancel"));
  }

  handleClose() {
    this.dispatchEvent(new CustomEvent("close"));
  }

  render() {
    if (!this.show) return html``;

    return html`<div class="popup">
      <div class="popup-content">
        <div class="popup-header">
          <span class="title">${this.title}</span>
          <button-element
            icon="close"
            iconSize="30px"
            size="small"
            @click=${this.handleClose}
          ></button-element>
        </div>
        <p class="description">${this.description}</p>
        <div class="button-container">
          <button-element
            bgColor="#ff6202"
            label="${t("delete")}"
            textColor="white"
            block
            @click=${this.handleConfirm}
          >
            Delete
          </button-element>
          <button-element
            bgColor="#8B20FF"
            label="${t("cancel")}"
            textColor="gray"
            block
            variant="outlined"
            size="medium"
            @click=${this.handleClose}
          >
            Cancel
          </button-element>
        </div>
      </div>
    </div>`;
  }

  static styles = css`
    .popup {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    }

    .popup-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      color: #ff6202;
      width: 100%;
    }

    .title {
      font-size: 24px;
      font-weight: 400;
      color: #ff6202;
    }

    .description {
      font-size: 16px;
      font-weight: 400;
      color: black;
    }

    .popup-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background-color: white;
      padding: 20px;
      padding-top: 10px;
      border-radius: 10px;
    }

    .button-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }
  `;
}

customElements.define("popup-element", PopupElement);
