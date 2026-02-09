import BccPreset from '@bcc-code/design-tokens/primevue';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import Playground from './Playground.vue';
import './style.css';

const app = createApp(Playground);

app.use(PrimeVue, {
	theme: {
		preset: BccPreset,
		options: {
			darkModeSelector: '.dark',
			cssLayer: {
				name: 'primevue',
				order: 'theme, base, primevue, tailwind',
			},
		},
	},
});

app.mount('#app');
