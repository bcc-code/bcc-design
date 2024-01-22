import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccGraphic from "./BccGraphic.vue";

const bannerSrc = "https://event.bcc.no/wp-content/uploads/2023/10/Background-7.png";
const logoSrc = "https://event.bcc.no/wp-content/uploads/2023/11/BUK4_Logo-Main.svg";

describe("BccGraphic", () => {
  it("renders graphic", async () => {
    const wrapper = mount(BccGraphic, {
      props: {
        bannerSrc,
        logoSrc,
      },
    });
    expect(wrapper.html()).toContain(`background-image: url(${bannerSrc});`);
    expect(wrapper.html()).toContain(`src="${logoSrc}"`);
    expect(wrapper.html()).toContain("border-radius: 12px;");
  });

  it("renders checked", async () => {
    const wrapper = mount(BccGraphic, {
      props: {
        bannerSrc,
        logoSrc,
        checked: true,
      },
    });
    expect(wrapper.html()).not.toContain("bcc-graphic-open-in-icon");
    expect(wrapper.html()).toContain("bcc-graphic-check-icon");
  });

  it("renders link out", async () => {
    const wrapper = mount(BccGraphic, {
      props: {
        bannerSrc,
        logoSrc,
        linkOut: true,
      },
    });
    expect(wrapper.html()).toContain("bcc-graphic-open-in-icon");
    expect(wrapper.html()).not.toContain("bcc-graphic-check-icon");
  });

  it("renders rounding", async () => {
    const wrapper = mount(BccGraphic, {
      props: {
        logoSrc,
        rounding: "md",
      },
    });
    expect(wrapper.html()).toContain("border-radius: 6px;");
  });
});
