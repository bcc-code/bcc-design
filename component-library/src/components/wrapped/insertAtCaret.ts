/**
 * Inserts `text` at the caret of `field`, replacing any selected text, and leaves the caret after it.
 * Fires an `input` event so v-model and listeners like auto-resize see the change.
 */
export function insertAtCaret(field: HTMLInputElement | HTMLTextAreaElement, text: string) {
	// Inputs like type="email" have no selection API; append to the end there.
	if (field.selectionStart === null || field.selectionEnd === null) field.value += text;
	else field.setRangeText(text, field.selectionStart, field.selectionEnd, 'end');
	field.dispatchEvent(new Event('input', { bubbles: true }));
}
