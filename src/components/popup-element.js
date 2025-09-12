import { LitElement, html, css } from "lit";

export class PopupElement extends LitElement {
  static properties = {
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

  handleBackdropClick(event) {
    // Close popup when clicking on the backdrop (not the content)
    if (event.target.classList.contains("popup")) {
      this.dispatchEvent(new CustomEvent("cancel"));
    }
  }

  render() {
    if (!this.show) return html``;

    return html`<div class="popup" @click=${this.handleBackdropClick}>
      <div class="popup-content">
        <h2>Delete Employee</h2>
        <p>Are you sure you want to delete this employee?</p>
        <div class="button-container">
          <button-element
            bgColor="#ff6202"
            label="Delete"
            textColor="white"
            @click=${this.handleConfirm}
          >
            Delete
          </button-element>
          <button-element
            bgColor="#f7f7f7"
            label="Cancel"
            textColor="gray"
            @click=${this.handleCancel}
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
    }

    .popup-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background-color: white;
      padding: 20px;
      border-radius: 10px;
    }

    .button-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .hidden {
      display: none;
    }
  `;
}

customElements.define("popup-element", PopupElement);
