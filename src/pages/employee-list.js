import { LitElement, html, css } from "lit";
import "../layout/header-element.js";
import "../components/table-element.js";
import "../components/button-element.js";

export class EmployeeList extends LitElement {
  render() {
    return html` <header-element></header-element>
      <div class="container">
        <div class="title-container">
          <span class="title">Employee List</span>
          <div>
            <button-element
              icon="list"
              bgColor="#f7f7f7"
              iconSize="30px"
            ></button-element>
            <button-element
              icon="grid"
              bgColor="#f7f7f7"
              iconSize="30px"
            ></button-element>
          </div>
        </div>
        <table-element></table-element>
      </div>`;
  }

  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      padding: 20px 40px 20px 40px;
      background-color: #f7f7f7;
      min-height: 100vh;
    }

    .title-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 30px;
    }

    .title-container div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }

    .title {
      font-size: 24px;
      font-weight: 400;
      color: #ff6202;
    }
  `;
}

customElements.define("employee-list", EmployeeList);
