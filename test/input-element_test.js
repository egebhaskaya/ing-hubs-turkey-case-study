import { html } from "lit";
import { fixture, expect } from "@open-wc/testing";
import "../src/components/input-element.js";

suite("input-element", () => {
  test("renders with default properties", async () => {
    const el = await fixture(html`<input-element></input-element>`);
    expect(el).to.exist;
    expect(el.label).to.equal("");
    expect(el.value).to.equal("");
    expect(el.placeholder).to.equal("");
    expect(el.error).to.equal("");
  });

  test("renders with label and value", async () => {
    const el = await fixture(html`
      <input-element
        label="Test Label"
        value="Test Value"
        placeholder="Enter text"
      >
      </input-element>
    `);

    expect(el.label).to.equal("Test Label");
    expect(el.value).to.equal("Test Value");
    expect(el.placeholder).to.equal("Enter text");

    const label = el.shadowRoot.querySelector("label");
    const input = el.shadowRoot.querySelector("input");

    expect(label.textContent.trim()).to.equal("Test Label");
    expect(input.value).to.equal("Test Value");
    expect(input.placeholder).to.equal("Enter text");
  });

  test("displays error message", async () => {
    const el = await fixture(html`
      <input-element label="Email" error="Invalid email format">
      </input-element>
    `);

    expect(el.error).to.equal("Invalid email format");

    const errorSpan = el.shadowRoot.querySelector(".error");
    expect(errorSpan).to.exist;
    expect(errorSpan.textContent.trim()).to.equal("Invalid email format");
  });

  test("handles input change events", async () => {
    const el = await fixture(html`
      <input-element name="testInput" label="Test Input"></input-element>
    `);

    let eventFired = false;
    let eventDetail = null;

    el.addEventListener("input-change", (e) => {
      eventFired = true;
      eventDetail = e.detail;
    });

    const input = el.shadowRoot.querySelector("input");
    input.value = "new value";
    input.dispatchEvent(new Event("input"));

    expect(eventFired).to.be.true;
    expect(eventDetail.name).to.equal("testInput");
    expect(eventDetail.value).to.equal("new value");
  });

  test("supports different input types", async () => {
    const el = await fixture(html`
      <input-element label="Email"></input-element>
    `);

    const input = el.shadowRoot.querySelector("input");
    expect(input.type).to.equal("text");
  });

  test("applies error styling when error is present", async () => {
    const el = await fixture(html`
      <input-element error="Required field"></input-element>
    `);

    expect(el.error).to.equal("Required field");
    const errorSpan = el.shadowRoot.querySelector(".error");
    expect(errorSpan).to.exist;
  });

  test("is accessible", async () => {
    const el = await fixture(html`
      <input-element label="Accessible Input" name="accessible" required>
      </input-element>
    `);

    const label = el.shadowRoot.querySelector("label");

    expect(el.name).to.equal("accessible");
    expect(label).to.exist;
    expect(label.textContent.trim()).to.equal("Accessible Input");
  });
});
