import { html, fixture, expect } from '@open-wc/testing';
import "../c-creator.js";

describe("CCreator test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <c-creator
        title="title"
      ></c-creator>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
