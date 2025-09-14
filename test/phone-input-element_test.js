import { html } from "lit";
import { fixture, expect } from "@open-wc/testing";
import "../src/components/phone-input-element.js";

suite("phone-input-element", () => {
  test("renders with default properties", async () => {
    const el = await fixture(html`<phone-input-element></phone-input-element>`);
    expect(el).to.exist;
    expect(el.label).to.equal("");
    expect(el.value).to.equal("");
    expect(el.placeholder).to.equal("+90 (5xx) xxx xx xx");
  });

  test("formats Turkish phone number correctly", async () => {
    const el = await fixture(
      html`<phone-input-element value="5551234567"></phone-input-element>`
    );

    await el.updateComplete;
    const input = el.shadowRoot.querySelector("input");
    expect(input.value).to.equal("+90 (555) 123 45 67");
  });

  test("handles input change and formats display", async () => {
    const el = await fixture(html`
      <phone-input-element name="phone" label="Phone"></phone-input-element>
    `);

    let changeEventFired = false;
    let eventDetail = null;

    el.addEventListener("input-change", (e) => {
      changeEventFired = true;
      eventDetail = e.detail;
    });

    const input = el.shadowRoot.querySelector("input");

    input.value = "5551234567";
    input.dispatchEvent(new Event("input"));

    expect(changeEventFired).to.be.true;
    expect(eventDetail.name).to.equal("phone");
    expect(eventDetail.value).to.equal("5551234567");
  });

  test("blocks letter input", async () => {
    const el = await fixture(html`<phone-input-element></phone-input-element>`);

    const input = el.shadowRoot.querySelector("input");

    const letterEvent = new KeyboardEvent("keydown", { key: "a" });
    let defaultPrevented = false;

    letterEvent.preventDefault = () => {
      defaultPrevented = true;
    };

    input.dispatchEvent(letterEvent);

    expect(defaultPrevented).to.be.true;
  });

  test("allows control keys", async () => {
    const el = await fixture(html`<phone-input-element></phone-input-element>`);

    const input = el.shadowRoot.querySelector("input");

    const backspaceEvent = new KeyboardEvent("keydown", { key: "Backspace" });
    let defaultPrevented = false;

    backspaceEvent.preventDefault = () => {
      defaultPrevented = true;
    };

    input.dispatchEvent(backspaceEvent);

    expect(defaultPrevented).to.be.false;
  });

  test("displays formatted value", async () => {
    const el = await fixture(html`
      <phone-input-element value="5551234567"></phone-input-element>
    `);

    await el.updateComplete;

    const input = el.shadowRoot.querySelector("input");
    expect(input.value).to.equal("+90 (555) 123 45 67");
  });

  test("handles empty and invalid input", async () => {
    const el = await fixture(html`<phone-input-element></phone-input-element>`);

    expect(el.value).to.equal("");

    const input = el.shadowRoot.querySelector("input");
    expect(input.value).to.equal("");
  });

  test("displays error message", async () => {
    const el = await fixture(html`
      <phone-input-element label="Phone" error="Invalid phone number">
      </phone-input-element>
    `);

    expect(el.error).to.equal("Invalid phone number");

    const errorSpan = el.shadowRoot.querySelector(".error");
    expect(errorSpan).to.exist;
    expect(errorSpan.textContent.trim()).to.equal("Invalid phone number");
  });

  test("is accessible", async () => {
    const el = await fixture(html`
      <phone-input-element label="Phone Number" name="phone">
      </phone-input-element>
    `);

    const input = el.shadowRoot.querySelector("input");
    const label = el.shadowRoot.querySelector("label");

    expect(el.name).to.equal("phone");
    expect(input.type).to.equal("tel");
    expect(label).to.exist;
    expect(label.textContent.trim()).to.equal("Phone Number");
  });
});
