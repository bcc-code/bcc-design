import pluginJs from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs['flat/recommended'],
	{
		files: ['**/*.vue'],
		languageOptions: {
			parserOptions: { parser: tseslint.parser },
		},
	},
	eslintPluginPrettier,
	{
		rules: {
			'no-console': ['error', { allow: ['warn', 'error'] }],
			'no-debugger': 'error',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-unused-expressions': [
				'error',
				{
					allowShortCircuit: true,
					allowTernary: true,
				},
			],
			'vue/no-side-effects-in-computed-properties': 'warn',
			'vue/multi-word-component-names': 'warn',
			'vue/require-default-prop': 'off',
			'vue/multiline-html-element-content-newline': [
				'error',
				{
					allowEmptyLines: false,
					ignores: ['pre', 'textarea'],
				},
			],
		},
	},
]);
