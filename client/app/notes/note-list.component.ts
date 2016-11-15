import { Component, OnInit } from '@angular/core';
import { AppModel } from "../app.model";
import {TrimPipe} from "../trim";
import { HideAlertDirective } from './hideAlert.directive';

@Component({
	moduleId: module.id,
	selector: "note-list",
	pipes: [TrimPipe],
	directives: [HideAlertDirective],
	templateUrl: 'note-list.template.html'
})

export class NoteListComponent implements OnInit{
	public inputModel = '';
	public noteText;
	constructor(public app: AppModel) {}

	ngOnInit() {
		this.app.notes = [];
	}

	onSaveClick(str) {
    	let pos = str.indexOf(" ");
    	let note = {name:str.slice(0,pos), text:str.slice(pos+1).trim()};
		if(note.text === '') {
			this.app.alerts.push({type:'danger', disc: 'Data ..'})
			return;
		}
    	this.app.save(note);
		this.inputModel = '';
		this.app.notes = [];
		this.app.currentNoteName = null;
    }

    onFindClick(key) {
		this.app.find(key);
    }

	onDeleteClick(id) {
		this.app.remove(id);
	}

	onEditCompleteClick(note, noteText) {
		note.text= noteText.innerText;
		this.app.update(note);
	}

	onLogout() {
		this.app.logout();
	}
}