import { html } from "lit";
import { fixture, expect } from "@open-wc/testing";
import "../src/components/search-input-element.js";

suite("search-input-element", () => {
  test("renders with default properties", async () => {
    const el = await fixture(
      html`<search-input-element></search-input-element>`
    );
    expect(el).to.exist;
    expect(el.value).to.equal("");
    expect(el.placeholder).to.equal("");
  });

  test("renders with custom placeholder", async () => {
    const el = await fixture(html`
      <search-input-element
        placeholder="Custom search..."
      ></search-input-element>
    `);

    expect(el.placeholder).to.equal("Custom search...");

    const input = el.shadowRoot.querySelector("input-element");
    expect(input.getAttribute("placeholder")).to.equal("Custom search...");
  });

  test("handles search button click", async () => {
    const el = await fixture(html`
      <search-input-element value="test search"></search-input-element>
    `);

    let searchEventFired = false;
    let searchTerm = null;

    el.addEventListener("search", (e) => {
      searchEventFired = true;
      searchTerm = e.detail.searchTerm;
    });

    const searchButton = el.shadowRoot.querySelector(
      'button-element[label*="Search"]'
    );
    searchButton.click();

    expect(searchEventFired).to.be.true;
    expect(searchTerm).to.equal("test search");
  });

  test("handles clear button click", async () => {
    const el = await fixture(html`
      <search-input-element value="test search"></search-input-element>
    `);

    let clearEventFired = false;
    let searchTerm = null;

    el.addEventListener("search", (e) => {
      clearEventFired = true;
      searchTerm = e.detail.searchTerm;
    });

    const clearButton = el.shadowRoot.querySelector(
      'button-element[label*="Clear"]'
    );
    clearButton.click();

    expect(clearEventFired).to.be.true;
    expect(searchTerm).to.equal("");
    expect(el.value).to.equal("");
  });

  test("handles Enter key press", async () => {
    const el = await fixture(html`
      <search-input-element value="enter search"></search-input-element>
    `);

    let searchEventFired = false;
    let searchTerm = null;

    el.addEventListener("search", (e) => {
      searchEventFired = true;
      searchTerm = e.detail.searchTerm;
    });

    const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });
    el.handleKeyDown(enterEvent);

    expect(searchEventFired).to.be.true;
    expect(searchTerm).to.equal("enter search");
  });

  test("updates value on input", async () => {
    const el = await fixture(
      html`<search-input-element></search-input-element>`
    );

    const mockEvent = {
      target: { value: "new search term" },
    };
    el.handleInput(mockEvent);

    expect(el.value).to.equal("new search term");
  });

  test("renders search and clear buttons", async () => {
    const el = await fixture(
      html`<search-input-element></search-input-element>`
    );

    const searchButton = el.shadowRoot.querySelector(
      'button-element[label*="Search"]'
    );
    const clearButton = el.shadowRoot.querySelector(
      'button-element[label*="Clear"]'
    );

    expect(searchButton).to.exist;
    expect(clearButton).to.exist;
  });

  test("has proper styling structure", async () => {
    const el = await fixture(
      html`<search-input-element></search-input-element>`
    );

    const container = el.shadowRoot.querySelector(".container");
    const buttonContainer = el.shadowRoot.querySelector(".button-container");

    expect(container).to.exist;
    expect(buttonContainer).to.exist;
  });
});
