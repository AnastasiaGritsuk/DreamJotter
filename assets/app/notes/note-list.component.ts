import { Component } from '@angular/core';
// import { Note } from "../note.model";
import { NoteComponent } from "./note.component";
import { NoteAddComponent } from "./note-add.component";
import { NoteService } from "./note.service";
import { Note } from "./note";
import { OnInit } from '@angular/core';

@Component({
	selector: "note-list",
	template: `
		<note [note]="selectedNotes" (childChanged)="childValue=$event"></note>
		<hr>
		<div class="row">
			<div class="col-md-12">
				<article class="panel panel-default" *ngFor="let note of notes"
					(click)="onSelect(note)"
					>
					<div class="panel-body">
						<span class="note-name text-primary">{{ note.name }}</span>
						<span class="note-value"> {{ note.value }} </span>
					</div>
				</article>
			</div>
		</div>
		<note-add [noteAdd] = "notes" [addedValue] = "childValue"></note-add>
	`,
	directives: [NoteComponent, NoteAddComponent],
	providers: [NoteService]
})

export class NoteListComponent implements OnInit{
	public childValue: string;
	public notes: Note[];

	public selectedNotes = {};

	constructor(private _noteService: NoteService) {}

	onSelect(note){
		this.selectedNotes = note;
	}

	getNotes() {
		//this._noteService.getNotes().then((notes: Note[]) => this.notes = notes);
	}

	ngOnInit(): any {
		this.getNotes();
	}
}