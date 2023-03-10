import { mount } from "@vue/test-utils";
import BccAvatars from "./BccAvatars.vue";

describe("BccAvatars", () => {
  it("mount component", async () => {
    expect(BccAvatars).toBeTruthy();

    const wrapper = mount(BccAvatars, {
      props: {
        max: 2,
        list: [
          { name: "John Doe", age: 32, gender: "m" },
          { name: "Jane Doe", age: 32, gender: "f" },
          { name: "Jack Doe", age: 12, gender: "m" },
          { name: "Jill Doe", age: 3, gender: "f" },
          { name: "Jenny Doe", age: 1, gender: "f" },
        ],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();

    await wrapper.get("button").trigger("click");

    expect(wrapper.html()).toMatchSnapshot();
  });
});
