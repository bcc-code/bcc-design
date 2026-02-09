<script setup lang="ts">
import { BccCard } from './components/custom';
import { BccButton } from './components/wrapped';
import './style.css';
</script>

<template>
	<div class="min-h-screen p-8 font-sans">
		<h1 class="mb-6 text-2xl font-bold">BCC Component Library</h1>
		<p class="text-text-subtle mb-4">
			Run <code class="bg-elevation-surface-raised-default rounded px-1 py-0.5">pnpm storybook</code> for full component
			documentation.
		</p>
		<section class="max-w-2xl space-y-6">
			<BccCard title="BccCard">
				<p>Quick dev preview. Use Storybook for docs and controls.</p>
			</BccCard>
			<BccCard title="Buttons">
				<div class="flex flex-wrap gap-2">
					<BccButton label="Primary" />
					<BccButton label="Secondary" severity="secondary" />
				</div>
			</BccCard>
		</section>
	</div>
</template>
