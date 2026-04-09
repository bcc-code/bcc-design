/** Do/Don't card pair — two side-by-side cards with visual example and guidance text. */
export function doDont(
	doExample: string, doText: string,
	dontExample: string, dontText: string,
) {
	return `
		<div class="flex gap-spacing-200 items-stretch">
			<div class="flex-1 rounded-lg overflow-hidden flex flex-col">
				<div class="bg-neutral-100 p-spacing-300 flex items-center justify-center flex-1">${doExample}</div>
				<div class="border-t-[3px] border-success"></div>
				<div class="bg-success-default p-spacing-200 flex-1">
					<div class="flex items-center gap-spacing-75 mb-spacing-50">
						<span class="text-icon-success text-base leading-none">&#x2714;</span>
						<strong class="heading-sm">Do</strong>
					</div>
					<span class="body-md text-subtle">${doText}</span>
				</div>
			</div>
			<div class="flex-1 rounded-lg overflow-hidden flex flex-col">
				<div class="bg-neutral-100 p-spacing-300 flex items-center justify-center flex-1">${dontExample}</div>
				<div class="border-t-[3px] border-danger"></div>
				<div class="bg-danger-default p-spacing-200 flex-1">
					<div class="flex items-center gap-spacing-75 mb-spacing-50">
						<span class="text-icon-danger text-base leading-none">&#x2716;</span>
						<strong class="heading-sm">Don't</strong>
					</div>
					<span class="body-md text-subtle">${dontText}</span>
				</div>
			</div>
		</div>
	`;
}
