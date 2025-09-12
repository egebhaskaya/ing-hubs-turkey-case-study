import { LitElement, html, css } from "lit";

import "./checkbox-element.js";
import "./button-element.js";

export class TableElement extends LitElement {
  render() {
    return html` <div>
      <table>
        <thead>
          <tr>
            <th>
              <checkbox-element></checkbox-element>
            </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date of Employment</th>
            <th>Date of Birth</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <checkbox-element></checkbox-element>
            </td>
            <td>John Doe</td>
            <td>John Doe</td>
            <td>john.doe@example.com</td>
            <td>1234567890</td>
            <td>1234567890</td>
            <td>1234567890</td>
            <td>1234567890</td>
            <td>1234567890</td>
            <td>
              <div class="edit-delete-row">
                <button-element icon="edit"></button-element>
                <button-element icon="delete"></button-element>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="pagination-container">
        <button-element icon="leftArrow" bgColor="#f7f7f7"></button-element>
        <div class="pagination-buttons pagination-buttons-active">1</div>
        <div class="pagination-buttons">2</div>
        <button-element icon="rightArrow" bgColor="#f7f7f7"></button-element>
      </div>
    </div>`;
  }

  static styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      border-radius: 10px;
    }

    thead {
      height: 80px;
      border-bottom: 1px solid #f7f7f7;
      color: #ff6202;
      font-family: "Roboto", sans-serif;
      font-size: 14px;
      font-weight: 300;
    }

    tbody {
      text-align: center;
      font-size: 16px;
      color: black;
    }

    tbody tr {
      height: 80px;
      border-bottom: 1px solid #f7f7f7;
      font-weight: 200;
    }

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

    .edit-delete-row {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 5px;
    }
  `;
}

customElements.define("table-element", TableElement);
