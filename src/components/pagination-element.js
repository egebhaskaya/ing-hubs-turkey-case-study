import { LitElement, html, css } from "lit";

export class PaginationElement extends LitElement {
  render() {
    return html`
      <div class="pagination-container">
        <button-element icon="leftArrow" bgColor="#f7f7f7"></button-element>
        <div class="pagination-buttons pagination-buttons-active">1</div>
        <div class="pagination-buttons">2</div>
        <button-element icon="rightArrow" bgColor="#f7f7f7"></button-element>
      </div>
    `;
  }

  static styles = css`
    .pagination-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
      padding-top: 40px;
    }

    .pagination-buttons {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      width: 12px;
      height: 12px;
      border-radius: 20px;
      padding: 10px;
      background-color: #f7f7f7;
      font-size: 18px;
      font-weight: 200;
    }

    .pagination-buttons:hover {
      background-color: #ff630238;
      font-weight: 400;
    }

    .pagination-buttons-active {
      background-color: #ff6202;
      color: white;
    }
  `;
}

customElements.define("pagination-element", PaginationElement);
