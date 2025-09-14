import { html } from "lit";
import { fixture, expect } from "@open-wc/testing";
import "../src/components/button-element.js";

suite("button-element", () => {
  test("renders with default properties", async () => {
    const el = await fixture(html`<button-element></button-element>`);
    expect(el).to.exist;
    expect(el.label).to.equal("");
    expect(el.bgColor).to.equal("white");
    expect(el.textColor).to.equal("#ff6202");
  });

  test("renders with custom label", async () => {
    const el = await fixture(
      html`<button-element label="Test Button"></button-element>`
    );
    expect(el.label).to.equal("Test Button");

    const button = el.shadowRoot.querySelector("button");
    expect(button.textContent.trim()).to.include("Test Button");
  });

  test("renders with custom colors", async () => {
    const el = await fixture(html`
      <button-element bgColor="#ff6202" textColor="white" label="Orange Button">
      </button-element>
    `);

    expect(el.bgColor).to.equal("#ff6202");
    expect(el.textColor).to.equal("white");

    const button = el.shadowRoot.querySelector("button");
    expect(button).to.exist;
  });

  test("renders with icon", async () => {
    const el = await fixture(html`
      <button-element icon="search" iconSize="20px" label="Search">
      </button-element>
    `);

    expect(el.icon).to.equal("search");
    expect(el.iconSize).to.equal("20px");

    const iconDiv = el.shadowRoot.querySelector(".icon");
    expect(iconDiv).to.exist;
  });

  test("handles click events", async () => {
    const el = await fixture(
      html`<button-element label="Click Me"></button-element>`
    );

    let clicked = false;
    el.addEventListener("click", () => {
      clicked = true;
    });

    const button = el.shadowRoot.querySelector("button");
    button.click();

    expect(clicked).to.be.true;
  });

  test("renders outlined variant", async () => {
    const el = await fixture(html`
      <button-element variant="outlined" bgColor="#ff6202" label="Outlined">
      </button-element>
    `);

    expect(el.variant).to.equal("outlined");

    const button = el.shadowRoot.querySelector("button");
    expect(button.classList.contains("outlined")).to.be.true;
  });

  test("is accessible", async () => {
    const el = await fixture(html`
      <button-element label="Accessible Button"></button-element>
    `);

    const button = el.shadowRoot.querySelector("button");
    expect(button).to.exist;
    expect(button.textContent.trim()).to.include("Accessible Button");
  });
});
