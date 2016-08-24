import { Component, EventEmitter } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: "note",
	templateUrl: "note.component.template.html",
	inputs: ["note"],
	outputs: ['childChanged']
})

export class NoteComponent {
	public note = {};
	public childChanged = new EventEmitter<string>();

	onChange(value: string) {
		this.childChanged.emit(value);
	}
}