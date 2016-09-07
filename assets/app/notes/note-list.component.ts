import { Component } from '@angular/core';
import { AppModel } from "../app.model";

@Component({
	moduleId: module.id,
	selector: "note-list",
	templateUrl: 'note-list.template.html'
})

export class NoteListComponent {
	public inputModel;
	
	constructor(public app: AppModel) {}
	
	onSaveClick(str) {
    	let pos = str.indexOf(" ");
    	let note = {name:str.slice(0,pos), text:str.slice(pos+1) };
    	this.app.save(note);
		this.inputModel = '';
    }

    onFindClick(key) {
		this.app.find(key);
    }
}