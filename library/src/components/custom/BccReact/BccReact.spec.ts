import { describe, expect, it } from "vitest";

import { mount } from "@vue/test-utils";
import BccReact from "./BccReact.vue";

describe("BccReact", () => {
  it("renders reactions", () => {
    expect(BccReact).toBeTruthy();

    const wrapper = mount(BccReact, {
      props: {
        emojis: [
          {
            id: "thumbsup",
            emoji: "👍",
            count: 1,
          },
          {
            id: "happy",
            emoji: "😃",
            count: 4,
          },
        ],
      },
    });

    expect(wrapper.text()).toContain("4");
    expect(wrapper.text()).not.toContain("1");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
