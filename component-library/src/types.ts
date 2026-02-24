import type { Component, FunctionalComponent, RenderFunction, VNode } from 'vue';
export type VueComponent = string | Component | FunctionalComponent | VNode | RenderFunction;

export type IInterval = ReturnType<typeof setInterval>;
export type ITimeout = ReturnType<typeof setTimeout>;
