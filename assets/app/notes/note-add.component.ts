import { Component } from '@angular/core';
import { Note } from "../note.model";
import { NoteService } from "./note.service";

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
	inputs: ["noteAdd"],
	providers: [NoteService]
})

export class NoteAddComponent 
{
	constructor(private _noteService: NoteService) {}

	onSaveClick() {
    	//const note = new Note('purchase', '1000$');
    	let note: = new Note();
    	this._noteService.insertNote(note);

    }
}