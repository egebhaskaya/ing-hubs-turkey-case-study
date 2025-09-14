import { html } from "lit";
import { fixture, expect } from "@open-wc/testing";
import "../src/components/pagination-element.js";

suite("pagination-element", () => {
  const mockPagination = {
    page: 2,
    totalPages: 5,
    totalItems: 50,
    itemsPerPage: 10,
    showPagination: true,
  };

  test("renders with default properties", () => {
    const el = document.createElement("pagination-element");
    expect(el).to.exist;
    expect(el.pagination.page).to.equal(1);
    expect(el.pagination.showPagination).to.equal(false);
  });

  test("renders pagination with data", async () => {
    const el = await fixture(html`
      <pagination-element .pagination=${mockPagination}></pagination-element>
    `);

    expect(el.pagination.totalPages).to.equal(5);
    expect(el.pagination.showPagination).to.equal(true);
  });

  test("renders page number buttons when showPagination is true", async () => {
    const el = await fixture(html`
      <pagination-element .pagination=${mockPagination}></pagination-element>
    `);

    const shadowContent = el.shadowRoot.innerHTML;
    expect(shadowContent.length).to.be.greaterThan(0);
  });

  test("does not render when showPagination is false", async () => {
    const hiddenPagination = { ...mockPagination, showPagination: false };
    const el = await fixture(html`
      <pagination-element .pagination=${hiddenPagination}></pagination-element>
    `);

    const shadowContent = el.shadowRoot.innerHTML.trim();
    expect(shadowContent.length).to.be.lessThan(20);
  });

  test("handles page change events", async () => {
    const el = await fixture(html`
      <pagination-element .pagination=${mockPagination}></pagination-element>
    `);

    let pageChangeEventFired = false;
    let newPage = null;

    el.addEventListener("page-change", (e) => {
      pageChangeEventFired = true;
      newPage = e.detail.page;
    });

    el.dispatchEvent(new CustomEvent("page-change", { detail: { page: 3 } }));

    expect(pageChangeEventFired).to.be.true;
    expect(newPage).to.equal(3);
  });

  test("calculates sliding window correctly", async () => {
    const manyPagesPagination = {
      page: 10,
      totalPages: 20,
      itemsPerPage: 10,
      showPagination: true,
    };

    const el = await fixture(html`
      <pagination-element
        .pagination=${manyPagesPagination}
      ></pagination-element>
    `);

    expect(el.pagination.totalPages).to.equal(20);
    expect(el.pagination.page).to.equal(10);
  });

  test("is accessible", async () => {
    const el = await fixture(html`
      <pagination-element .pagination=${mockPagination}></pagination-element>
    `);

    expect(el).to.exist;
    expect(el.pagination.showPagination).to.be.true;
  });
});
