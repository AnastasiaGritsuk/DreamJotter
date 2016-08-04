import { Component } from '@angular/core';
import { Note } from "../note.model";

@Component({
	selector: "note-add",
	template: `
		<div class="row">
			<div class="col-md-12">
				<div class="btn-wrap">
					<button (click)="onSaveClick()"
						type="button" class="btn btn-primary pull-left">Save</button>	
					<button type="button" class="btn btn-primary">Find</button>
				</div>
			</div>
		</div>
	`,
	inputs: ["noteAdd"]
})

export class NoteAddComponent {
	public noteAdd = [];

	onSaveClick() {
    	const note = new Note('purchase', '1000$');
    	this.noteAdd.push(note);
    }
}