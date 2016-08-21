import { Component } from '@angular/core';
import { Note } from './note.model';
import { NoteService } from "./note.service";
import { NoteComponent } from "./note.component";

@Component({
	selector: "note-add",
	template: `
		<div class="row">
			<div class="col-md-12">
				<div class="btn-wrap">
					<button (click)="onSaveClick(addedValue)"
						type="button" class="btn btn-primary pull-left">Save</button>	
					<button type="button" class="btn btn-primary">Find</button>
				</div>
			</div>
		</div>
	`,
	inputs: ["noteAdd","addedValue"],
	providers: [NoteService]
})

export class NoteAddComponent
{
	addedValue: string;
	constructor(private _noteService: NoteService) {}

	onSaveClick(str) {
    	var pos = str.indexOf(" ");
    	const elem = new Note(str.slice(0,pos), str.slice(pos+1));\

    	this._noteService.insertNote(elem)
			.subscribe(
				() => console.log('success'),
				error => console.error(error)
			);
    }
}