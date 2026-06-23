import { parse } from '@vue/compiler-sfc';
import path from 'node:path';
import type { Plugin } from 'vite';

/**
 * Injects `data-component="<ComponentName>"` on the root element of every
 * Vue SFC found under a `/components/` path segment. Runs before plugin-vue
 * so the attribute is part of the compiled output.
 */
export function componentDataAttrPlugin(): Plugin {
	return {
		name: 'bcc-component-data-attr',
		enforce: 'pre',
		transform(code, id) {
			if (!id.endsWith('.vue') || !id.includes('/components/')) return null;

			const componentName = path
				.basename(id, '.vue')
				.replace(/^Bcc/, '')
				.replace(/([A-Z])/g, (_, c, offset) => (offset === 0 ? c.toLowerCase() : `-${c.toLowerCase()}`));
			const { descriptor, errors } = parse(code);

			if (errors.length || !descriptor.template?.ast) return null;

			const { ast } = descriptor.template;

			// Find the first element node in the template root (NodeTypes.ELEMENT === 1)
			const root = ast.children.find(n => n.type === 1);
			if (!root) return null;

			// ElementNode has `tag` and `loc` — cast from TemplateChildNode
			const el = root as { tag: string; loc: { start: { offset: number } } };

			// root.loc.start.offset is absolute (relative to the SFC file start),
			// so insert right after `<tagName` with no further adjustment
			const insertAt = root.loc.start.offset + 1 + el.tag.length;

			return {
				code: code.slice(0, insertAt) + ` data-bcc-name="${componentName}"` + code.slice(insertAt),
				map: null,
			};
		},
	};
}
