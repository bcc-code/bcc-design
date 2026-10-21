<script setup lang="ts">
import {
	EmojiFoodBeverageIcon,
	EmojiNatureIcon,
	EmojiObjectsIcon,
	EmojiPeopleIcon,
	EmojiSymbolsIcon,
	EmojiTransportationIcon,
	FlagIcon,
	MoodIcon,
	SearchIcon,
	SportsBasketballIcon,
} from '@bcc-code/icons-vue';
import { computed, nextTick, ref, shallowRef, watch, type Component } from 'vue';

import BccInput from '../../wrapped/BccInput.vue';
import { loadEmojiGroups, searchEmojis } from './data';
import type { EmojiGroup, EmojiItem, EmojiPickerProps } from './types';

const props = withDefaults(defineProps<EmojiPickerProps>(), {
	locale: 'en',
	searchPlaceholder: 'Search',
	noResultsText: 'No emojis found',
	errorText: "Couldn't load emojis",
});

const emit = defineEmits<{
	select: [emoji: string];
}>();

const GROUP_ICONS: Record<string, Component> = {
	'smileys-emotion': MoodIcon,
	'people-body': EmojiPeopleIcon,
	'animals-nature': EmojiNatureIcon,
	'food-drink': EmojiFoodBeverageIcon,
	'travel-places': EmojiTransportationIcon,
	activities: SportsBasketballIcon,
	objects: EmojiObjectsIcon,
	symbols: EmojiSymbolsIcon,
	flags: FlagIcon,
};

const groups = shallowRef<EmojiGroup[]>([]);
const query = ref('');
const activeGroup = ref<string>();
const scroller = ref<HTMLElement | null>(null);
const root = ref<HTMLElement | null>(null);
const loadFailed = ref(false);

const results = computed(() => searchEmojis(groups.value, query.value));
const isSearching = computed(() => query.value.trim() !== '');

watch(
	() => props.locale,
	async locale => {
		let loaded: EmojiGroup[];
		try {
			loaded = await loadEmojiGroups(locale);
		} catch (error) {
			if (locale !== props.locale) return;
			console.error(error);
			loadFailed.value = true;
			return;
		}
		if (locale !== props.locale) return;
		loadFailed.value = false;
		groups.value = loaded;
		activeGroup.value = loaded[0]?.key;
	},
	{ immediate: true }
);

function select(item: EmojiItem) {
	emit('select', item.emoji);
}

function scrollToGroup(key: string) {
	const section = scroller.value?.querySelector<HTMLElement>(`[data-group="${key}"]`);
	if (!scroller.value || !section) return;
	scroller.value.scrollTop = section.offsetTop;
	activeGroup.value = key;
}

function updateActiveGroup() {
	const container = scroller.value;
	if (!container || isSearching.value) return;
	for (const section of container.querySelectorAll<HTMLElement>('[data-group]')) {
		if (section.offsetTop <= container.scrollTop + 1) activeGroup.value = section.dataset.group;
	}
}

function emojiButtons(): HTMLElement[] {
	return Array.from(scroller.value?.querySelectorAll<HTMLElement>('.bcc-emoji-picker-item') ?? []);
}

function onSearchKeydown(event: KeyboardEvent) {
	if (event.key === 'Enter' && results.value[0]) {
		event.preventDefault();
		select(results.value[0]);
	} else if (event.key === 'ArrowDown') {
		event.preventDefault();
		emojiButtons()[0]?.focus();
	}
}

/** Moves focus between emoji buttons by their position on screen, so rows of uneven groups line up. */
function onGridKeydown(event: KeyboardEvent) {
	const current = event.target as HTMLElement;
	if (!current.classList.contains('bcc-emoji-picker-item')) return;

	const buttons = emojiButtons();
	const index = buttons.indexOf(current);
	let next: HTMLElement | undefined;

	if (event.key === 'ArrowLeft') next = buttons[index - 1];
	else if (event.key === 'ArrowRight') next = buttons[index + 1];
	else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
		const down = event.key === 'ArrowDown';
		const rowTops = buttons
			.map(button => button.offsetTop)
			.filter(top => (down ? top > current.offsetTop : top < current.offsetTop));
		if (!rowTops.length) {
			if (!down) {
				event.preventDefault();
				root.value?.querySelector('input')?.focus();
			}
			return;
		}
		const rowTop = down ? Math.min(...rowTops) : Math.max(...rowTops);
		const row = buttons.filter(button => button.offsetTop === rowTop);
		next = row.reduce((best, button) =>
			Math.abs(button.offsetLeft - current.offsetLeft) < Math.abs(best.offsetLeft - current.offsetLeft) ? button : best
		);
	} else return;

	event.preventDefault();
	next?.focus();
}

watch(isSearching, async searching => {
	if (searching) return;
	await nextTick();
	if (activeGroup.value) scrollToGroup(activeGroup.value);
});
</script>

<template>
	<div ref="root" class="bcc-emoji-picker">
		<div class="bcc-emoji-picker-search">
			<BccInput
				v-model="query"
				:icon="SearchIcon"
				size="small"
				type="search"
				:placeholder="searchPlaceholder"
				:aria-label="searchPlaceholder"
				@keydown="onSearchKeydown"
			/>
		</div>

		<div v-show="!isSearching" class="bcc-emoji-picker-tabs">
			<button
				v-for="group in groups"
				:key="group.key"
				type="button"
				class="bcc-emoji-picker-tab"
				:class="{ 'bcc-emoji-picker-tab--active': activeGroup === group.key }"
				:aria-label="group.label"
				:aria-pressed="activeGroup === group.key"
				:title="group.label"
				@mousedown.prevent
				@click="scrollToGroup(group.key)"
			>
				<component :is="GROUP_ICONS[group.key] ?? MoodIcon" class="size-5" />
			</button>
		</div>

		<div ref="scroller" class="bcc-emoji-picker-scroll" @scroll.passive="updateActiveGroup" @keydown="onGridKeydown">
			<template v-if="isSearching">
				<div class="bcc-emoji-picker-grid">
					<button
						v-for="item in results"
						:key="item.emoji"
						type="button"
						class="bcc-emoji-picker-item"
						:aria-label="item.label"
						:title="item.label"
						@mousedown.prevent
						@click="select(item)"
					>
						{{ item.emoji }}
					</button>
				</div>
				<p v-if="!results.length" class="bcc-emoji-picker-empty">{{ noResultsText }}</p>
			</template>

			<p v-else-if="loadFailed" class="bcc-emoji-picker-empty">{{ errorText }}</p>

			<template v-else>
				<section v-for="group in groups" :key="group.key" :data-group="group.key">
					<h3 class="bcc-emoji-picker-group-label">{{ group.label }}</h3>
					<div class="bcc-emoji-picker-grid">
						<button
							v-for="item in group.emojis"
							:key="item.emoji"
							type="button"
							class="bcc-emoji-picker-item"
							:aria-label="item.label"
							:title="item.label"
							@mousedown.prevent
							@click="select(item)"
						>
							{{ item.emoji }}
						</button>
					</div>
				</section>
			</template>
		</div>
	</div>
</template>
