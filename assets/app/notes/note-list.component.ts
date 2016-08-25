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

export class NoteListComponent implements OnInit{
	public childValue: string;
	notes: Note[] = [];

	constructor(private _app: AppModel) {}

	ngOnInit() {
		//this._app.find('')
		//	.subscribe(
		//		notes => this.notes = notes,
		//		error => console.log(error)
		//	);
	}

	onSaveClick(str) {
    	let pos = str.indexOf(" ");
    	let note = {name:str.slice(0,pos), text:str.slice(pos+1) };

    	this.notes.push(note);

    	this._app.save(note)
			.subscribe(
				() => {
					console.log('success')
				},
				error => console.error(error)
			);
    }

    onFindClick(key) {
    	let arr = [];

    	for(var i=0;i<this.notes.length;i++) {
    		if(key === this.notes[i].name) {
    			arr.push(this.notes[i]);
    		}
    	}

    	this.notes = arr;

    }
}