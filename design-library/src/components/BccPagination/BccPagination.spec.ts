import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccPagination from "./BccPagination.vue";

describe("BccPagination", () => {
  it("renders the right amount of page numbers", async () => {
    const wrapper = mount(BccPagination, {
      props: {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        rowsPerPage: 2,
      },
    });

    expect(wrapper.emitted("update:paginatedItems")?.length).toEqual(1);
    expect(wrapper.emitted("update:totalPages")![0]).toEqual([6]);
  });
  it("renders an ellipsis on both sides", async () => {
    const wrapper = mount(BccPagination, {
      props: {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        rowsPerPage: 1,
        displayLeftEllipsis: true,
        displayRightEllipsis: true,
      },
    });
    wrapper.find(".bcc-pagination-button").trigger("click");
  });
});
