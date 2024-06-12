import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BccNpsScore from "./BccNpsScore.vue";

describe("BccNpsScore", () => {
  it("renders a nps score", () => {
    expect(BccNpsScore).toBeTruthy();

    const wrapper = mount(BccNpsScore, {
      props: {},
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
