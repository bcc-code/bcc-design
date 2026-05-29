import { addons } from 'storybook/manager-api';

import theme from './theme';

const redirectMarkdownDocsPath = () => {
	const docsPath = new URL(window.location.href).searchParams.get('path');

	if (!docsPath?.startsWith('/docs/') || !docsPath.endsWith('.md')) {
		return;
	}

	window.location.replace(docsPath);
};

redirectMarkdownDocsPath();

addons.setConfig({
	theme,
});
