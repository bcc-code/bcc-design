import type { Component, FunctionalComponent, RenderFunction, VNode } from "vue";

export type VueComponent = string | Component | FunctionalComponent | VNode | RenderFunction;

// Additional Types
export * from "./components/BccTabs/types";
export * from "./components/BccReact/types";
export * from "./components/BccTable/types";
