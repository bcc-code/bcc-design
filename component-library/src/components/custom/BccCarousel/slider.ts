export function initiateSlider(slider: HTMLElement | null) {
	if (!slider) return;

	let isDown = false;
	let isDragged = false;
	let startX: number;
	let scrollLeft: number;
	let velocity = 0;

	slider.addEventListener('mousedown', e => {
		velocity = 0; // Cancel previous velocity
		isDown = true;
		const event = e as MouseEvent;
		slider.classList.add('active');
		startX = event.pageX - slider.offsetLeft;
		scrollLeft = slider.scrollLeft;
	});

	slider.addEventListener('mouseleave', () => {
		isDown = false;
		slider.classList.remove('active');
	});

	slider.addEventListener('mouseup', () => {
		isDown = false;
		const elements = slider.querySelectorAll('.scroll-snap-x-child');
		if (isDragged) {
			setTimeout(() => {
				for (let i = 0; i < elements.length; i++) {
					elements[i]?.classList.remove('pointer-events-none');
				}
			}, 10);
		}
		slider.classList.remove('active');
		isDragged = false;
		requestAnimationFrame(smooth);
	});

	slider.addEventListener('mousemove', e => {
		if (!isDown) return;
		const event = e as MouseEvent;
		if (!isDragged) {
			const elements = slider.querySelectorAll('.scroll-snap-x-child');
			for (let i = 0; i < elements.length; i++) {
				elements[i]?.classList.add('pointer-events-none');
			}
		}
		isDragged = true;
		event.preventDefault();
		const lastX = slider.scrollLeft;
		const x = event.pageX - slider.offsetLeft;
		const walk = (x - startX) * 2;
		slider.scrollLeft = scrollLeft - walk;

		velocity = lastX - slider.scrollLeft;
	});

	function smooth() {
		if (Math.abs(velocity) > 0) {
			// Change the 2s here to change how quickly the scrolling stops
			if (Math.abs(velocity) < 2) {
				velocity = 0;
			}
			if (velocity > 0) {
				velocity -= 2;
			} else {
				velocity += 2;
			}
			if (slider) {
				slider.scrollLeft -= velocity;
				requestAnimationFrame(smooth);
			}
		}
	}

	return;
}
