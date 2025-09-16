import { LitElement, html, css } from "lit";
import { formatPhoneNumber } from "../utils/formatPhoneNumber.js";

import "./checkbox-element.js";
import "./button-element.js";
import "./pagination-element.js";
import "./popup-element.js";

export class TableElement extends LitElement {
  static properties = {
    list: { type: Array },
    columns: { type: Array },
  };

  constructor() {
    super();
    this.list = [];
    this.columns = [];
  }

  handleEdit(id) {
    this.dispatchEvent(
      new CustomEvent("edit", {
        detail: {
          id,
        },
      })
    );
  }

  handleDelete(id, firstName, lastName) {
    this.dispatchEvent(
      new CustomEvent("delete", {
        detail: {
          id,
          firstName,
          lastName,
        },
      })
    );
  }

  render() {
    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th id="checkbox-column">
                <checkbox-element></checkbox-element>
              </th>
              ${this.columns?.map(
                (column) =>
                  html`<th id="${column.key}-column">${column.label}</th>`
              )}
            </tr>
          </thead>
          <tbody>
            ${this.list?.map(
              (employee) => html`
                <tr>
                  <td id="checkbox-column">
                    <checkbox-element></checkbox-element>
                  </td>

                  ${this.columns?.map((column) => {
                    return column.key === "actions"
                      ? html` <td id="${column.key}-column">
                          <div class="edit-delete-row">
                            <button-element
                              icon="edit"
                              @click=${() => this.handleEdit(employee.id)}
                            >
                            </button-element>
                            <button-element
                              icon="delete"
                              @click=${() =>
                                this.handleDelete(
                                  employee.id,
                                  employee.firstName,
                                  employee.lastName
                                )}
                            >
                            </button-element>
                          </div>
                        </td>`
                      : column.key === "phone"
                      ? html`<td id="${column.key}-column">
                          ${formatPhoneNumber(employee[column.key])}
                        </td>`
                      : html`<td id="${column.key}-column">
                          ${employee[column.key]}
                        </td>`;
                  })}
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }

  static styles = css`
    .table-container {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      border-radius: 10px;
      overflow-x: auto;
      white-space: nowrap;
    }

    thead {
      height: 80px;
      border-bottom: 1px solid #f7f7f7;
      color: #ff6202;
      font-family: "Roboto", sans-serif;
      font-size: 14px;
      font-weight: 300;
    }

    thead th {
      padding: 10px;
    }

    tbody {
      text-align: center;
      font-size: 16px;
      color: black;
    }

    tbody td {
      padding: 10px;
    }

    tbody tr {
      height: 80px;
      border-bottom: 1px solid #f7f7f7;
      font-weight: 200;
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
