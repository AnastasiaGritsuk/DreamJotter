import { Component, OnInit } from '@angular/core';
import { AppModel } from "../app.model";

@Component({
	moduleId: module.id,
	selector: "note-list",
	templateUrl: 'note-list.template.html'
})

export class NoteListComponent implements OnInit{
	public inputModel;
	
	constructor(public app: AppModel) {}

	ngOnInit() {
		this.app.notes = [];
	}

	onSaveClick(str) {
    	let pos = str.indexOf(" ");
    	let note = {name:str.slice(0,pos), text:str.slice(pos+1) };
    	this.app.save(note);
		this.inputModel = '';
		this.app.notes = [];
    }

    onFindClick(key) {
		this.app.find(key);
    }

	onDeleteClick(id) {
		this.app.remove(id);
	}

	onLogout() {
		this.app.logout();
	}
}