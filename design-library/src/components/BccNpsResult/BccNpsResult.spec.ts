import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BccNpsResult from "./BccNpsResult.vue";

describe("BccNpsResult", () => {
  it("renders a nps result", () => {
    expect(BccNpsResult).toBeTruthy();

    const wrapper = mount(BccNpsResult, {
      props: {},
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
