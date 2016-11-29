import { NoteService} from './notes/note.service';
import { Injectable } from '@angular/core';
import { Note } from './notes/note.model';

@Injectable()
export class AppModel {
	private securityToken: string = null;
	public notes:Note[] = [];
	public alerts = [];
	public error = null;
	public noteName = '';
	public noteState = { None:0, NoNotes: 1};
	public alertState = {
		saved: { type:'success', disc: 'Note has been saved'},
		deleted: { type:'info', disc: 'Note has been deleted'}
	}

	public state = this.noteState.None;
	
	constructor(private svc:NoteService){}

	login(user:string, pwd:string) {
		console.log('login: begin');
		
		return this.svc.login(user, pwd)
			.subscribe(
				token => {
					this.securityToken = token;
					console.log('login: end');
				},
				err => this.error = {disc: err}
			);
	}

	logout() {
		console.log('logout: begin');
		
		return this.svc.logout(this.securityToken)
			.subscribe(
				() => {
					this.securityToken = null;
					this.alerts = null;
					this.resetNoteState(null);

					console.log('logout: end');
				},
				err => this.error = {disc: err}
			);
	};

	save(note:Note) {
		console.log('save: begin');
		
		return this.svc.insertNote(note, this.securityToken)
			.subscribe(
				()=> {
					this.resetNoteState(null);
					this.alerts.push(this.alertState.saved);

					console.log('save: end');
				},
				err => this.error = {disc: err}
			);
	}
	
	find(key:string) {
		console.log('find: begin');
		
		return this.svc.getNotes(key, this.securityToken)
			.subscribe(
				notes => {
					this.resetNoteState(key);
					this.setNoteState(notes);
					this.notes = notes;

					console.log('find: end');
				},
				err => this.error = {disc: err}
			);
	}

	remove(id:string) {
		console.log('remove: begin');

		return this.svc.removeNote(id, this.securityToken)
			.subscribe(
				note => {
					this.resetNoteState(note.name);
					this.notes = this.removeElementFromArray(this.notes, note);
					this.setNoteState(this.notes);
					this.alerts.push(this.alertState.deleted);

					console.log('remove: end');
				},
				err => this.error = {disc: err}
			);
	}
	
	update(note:Note) {
		console.log('update: begin');

		return this.svc.updateNote(note, this.securityToken)
			.subscribe(
				note => {
					this.resetNoteState(note.name);
					console.log('update: end');
				},
				err => this.error = {disc: err}
			);
	}

	getLogged() {
		return this.securityToken !== null;
	}

	removeElementFromArray(arr, el) {
		let deletedItem = arr.find(function(x:any) {
			return x._id === el._id;
		});
		var index = arr.indexOf(deletedItem);
		if (index > -1) {
			arr.splice(index, 1);
		}
		return arr;
	}

	resetNoteState(name) {
		this.state = this.noteState.None;
		this.error = null;
		this.noteName = name || '';
	}

	setNoteState(notes) {
		if(notes.length === 0)
			this.state = this.noteState.NoNotes;
	}
}