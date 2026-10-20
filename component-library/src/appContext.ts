import type { App, AppContext } from 'vue';

let appContext: AppContext | null = null;

/** Remembers the app that installed the library, so imperatively mounted components get its plugins. */
export function setBccApp(app: App) {
	appContext = app._context;
}

export function getBccAppContext(): AppContext | null {
	return appContext;
}
