import { Component } from '@angular/core';
import { NoteComponent } from "./note.component";
import { AppModel } from "../app.model";
import { Note } from "./note.model";
import { OnInit } from '@angular/core';


@Component({
	moduleId: module.id,
	selector: "note-list",
	templateUrl: 'note-list.template.html',
	directives: [NoteComponent]
})

export class NoteListComponent {
	public childValue: string;

	constructor(public app: AppModel) {}

	onSaveClick(str) {
		
    	let pos = str.indexOf(" ");
    	let note = {name:str.slice(0,pos), text:str.slice(pos+1) };
    	this.app.save(note);
    }

    onFindClick(key) {
		this.app.find(key);
    }
}