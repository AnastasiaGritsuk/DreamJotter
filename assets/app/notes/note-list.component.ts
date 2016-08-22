import { Component } from '@angular/core';
import { NoteComponent } from "./note.component";
import { NoteService } from "./note.service";
import { Note } from "./note.model";
import { OnInit } from '@angular/core';

@Component({
	selector: "note-list",
	template: `
		<note (childChanged)="childValue=$event"></note>
		<hr>
		<div class="row">
			<div class="col-md-12">
				<article class="panel panel-default" *ngFor="let note of notes"
					(click)="onSelect(note)"
					>
					<div class="panel-body">
						<span class="note-name text-primary">{{ note.name }}</span>
						<span class="note-value"> {{ note.text }} </span>
					</div>
				</article>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="btn-wrap">
					<button (click)="onSaveClick(childValue)"
						type="button" class="btn btn-primary pull-left">Save</button>	
					<button type="button" class="btn btn-primary">Find</button>
				</div>
			</div>
		</div>
	`,
	directives: [NoteComponent],
	providers: [NoteService]
})

export class NoteListComponent implements OnInit{
	public childValue: string;
	notes: Note[] = [];

	constructor(private _noteService: NoteService) {}

	ngOnInit(){
		this._noteService.getNotes()
			.subscribe(
				notes => this.notes = notes,
				error => console.log(error)
			);
	}

	onSaveClick(str) {
    	var pos = str.indexOf(" ");
    	const elem = new Note(str.slice(0,pos), str.slice(pos+1));
    	this.notes.push(elem);

    	this._noteService.insertNote(elem)
			.subscribe(
				() => console.log('success'),
				error => console.error(error)
			);
    }
}