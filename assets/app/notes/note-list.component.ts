import { Component } from '@angular/core';
import { Note } from "../note.model";
import { NoteComponent } from "./note.component";
import { NoteAddComponent } from "./note-add.component";

@Component({
	selector: "note-list",
	template: `
		<note [note]="selectedNotes"></note>
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
		<note-add [noteAdd] = "notes"></note-add>
	`,
	directives: [NoteComponent, NoteAddComponent]
})

export class NoteListComponent {
	public notes = [
		{name: "purchase", value: "100$"},
		{name: "friendLeo", value: "50$"},
		{name: "child", value: "300$"},
		{name: "train", value: "20$"}
	];

	public selectedNotes = {};

	onSelect(note){
		this.selectedNotes = note;
	}
}