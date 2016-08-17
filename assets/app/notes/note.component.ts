import { Component, EventEmitter } from '@angular/core';

@Component({
	selector: "note",
	template: `
		<div class="row">
			<div class="col-md-12">
				<input [(ngModel)]="note.name" type="text" #childInput (keyup)="onChange(childInput.value)" 
				class="form-control">
			</div>
		</div>
	`,
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