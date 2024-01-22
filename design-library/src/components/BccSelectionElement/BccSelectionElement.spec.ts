import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccSelectionElement from "./BccSelectionElement.vue";

describe("BccSelectionElement", () => {
  it("renders", async () => {
    const wrapper = mount(BccSelectionElement, { props: {} });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders last element", async () => {
    const wrapper = mount(BccSelectionElement, { props: { isLast: true } });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
