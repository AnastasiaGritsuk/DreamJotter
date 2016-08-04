import { Component } from '@angular/core';

@Component({
	selector: "note",
	template: `
		<div class="row">
			<div class="col-md-12">
				<input [(ngModel)]="note.name" type="text" class="form-control">
			</div>
		</div>
	`,
	inputs: ["note"]
})

export class NoteComponent {
	public note = {};
}