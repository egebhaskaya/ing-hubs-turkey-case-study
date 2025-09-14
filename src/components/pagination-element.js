import { LitElement, html, css } from "lit";
import { store, setPagination } from "../store/employee-store.js";

export class PaginationElement extends LitElement {
  static properties = {
    pagination: { type: Object },
  };

  constructor() {
    super();
    this.pagination = {
      page: 1,
      pageSize: 10,
      totalPages: 1,
      totalItems: 0,
      showPagination: false,
    };
  }

  render() {
    if (!this?.pagination?.showPagination) return html``;

    const pageButtons = [];
    const maxVisible = 5;
    const currentPage = this.pagination.page;
    const totalPages = this.pagination.totalPages;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(html`
          <div
            class="pagination-buttons ${i === currentPage
              ? "pagination-buttons-active"
              : ""}"
            @click=${() => store.dispatch(setPagination(i))}
          >
            ${i}
          </div>
        `);
      }
    } else {
      let startPage, endPage;

      if (currentPage <= 3) {
        startPage = 1;
        endPage = maxVisible;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - maxVisible + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }

      if (startPage > 1) {
        pageButtons.push(html`
          <div
            class="pagination-buttons"
            @click=${() => store.dispatch(setPagination(1))}
          >
            1
          </div>
        `);
        if (startPage > 2) {
          pageButtons.push(html`<div class="pagination-buttons">...</div>`);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(html`
          <div
            class="pagination-buttons ${i === currentPage
              ? "pagination-buttons-active"
              : ""}"
            @click=${() => store.dispatch(setPagination(i))}
          >
            ${i}
          </div>
        `);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageButtons.push(html`<div class="pagination-buttons">...</div>`);
        }
        pageButtons.push(html`
          <div
            class="pagination-buttons ${totalPages === currentPage
              ? "pagination-buttons-active"
              : ""}"
            @click=${() => store.dispatch(setPagination(totalPages))}
          >
            ${totalPages}
          </div>
        `);
      }
    }

    return html`
      <div class="pagination-container">
        <button-element
          icon="leftArrow"
          bgColor="#f7f7f7"
          @click=${() =>
            store.dispatch(setPagination(this.pagination.page - 1))}
        >
        </button-element>

        ${pageButtons}

        <button-element
          icon="rightArrow"
          bgColor="#f7f7f7"
          @click=${() =>
            store.dispatch(setPagination(this.pagination.page + 1))}
        ></button-element>
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
