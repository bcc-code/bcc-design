import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BccNPS from "./BccNPS.vue";

describe("BccNPS", () => {
  it("renders a nps score", () => {
    expect(BccNPS).toBeTruthy();

    const wrapper = mount(BccNPS, {
      props: {},
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
