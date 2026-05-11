/**
 * Entry used ONLY by vite.config.sfc-styles.ts to extract Single-File Component
 * <style> blocks into dist/sfc-styles.css. Not part of the published library
 * API surface. Intentionally does NOT import src/style.css or any design-token
 * CSS, so the resulting CSS bundle contains exactly the SFC styles and nothing
 * else.
 */

const sfcs = import.meta.glob('./components/**/*.vue', { eager: true });

void sfcs;

export {};
