import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccButton from "./BccButton.vue";

describe("BccButton", () => {
  it("renders properly", () => {
    const wrapper = mount(BccButton, { props: { msg: "Hello Vitest" } });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
