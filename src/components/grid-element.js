import { LitElement, html, css } from "lit";
import "./card-element.js";
export class GridElement extends LitElement {
  static properties = {
    list: { type: Array },
  };

  constructor() {
    super();
    this.list = [];
  }

  render() {
    return html`
      <div class="grid-container">
        <div class="grid">
          ${this.list?.map(
            (employee) =>
              html` <card-element .employee=${employee}></card-element> `
          )}
        </div>
      </div>
    `;
  }

  static styles = css`
    .grid-container {
    }

    h3 {
      color: #ff6202;
      margin-bottom: 20px;
      font-weight: 400;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 60px;
      justify-items: center;
      align-items: start;
      width: 100%;
    }

    @media (max-width: 1200px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  `;
}

customElements.define("grid-element", GridElement);
