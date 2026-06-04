import { addons } from 'storybook/manager-api';

import theme from './theme';

const redirectStaticDocsPath = () => {
	const docsPath = new URL(window.location.href).searchParams.get('path');

	if (docsPath === '/llms.txt' || docsPath === '/llms-full.txt') {
		window.location.replace(docsPath);
		return;
	}

	if (!docsPath?.startsWith('/docs/') || !docsPath.endsWith('.md')) {
		return;
	}

	window.location.replace(docsPath);
};

redirectStaticDocsPath();

addons.setConfig({
	theme,
});
