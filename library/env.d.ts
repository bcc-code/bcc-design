/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<object, object, unknown>;
	export default component;
}

// PrimeVue submodules without bundled types
declare module 'primevue/confirmationeventbus';
declare module 'primevue/dynamicdialogeventbus';
declare module 'primevue/overlayeventbus';
declare module 'primevue/toasteventbus';
