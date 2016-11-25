import { NoteService} from './notes/note.service';
import { Injectable } from '@angular/core';
import { Note } from './notes/note.model';

@Injectable()
export class AppModel {
	private securityToken: string = null;
	public notes:Note[] = [];
	public alerts = [];
	public error = null;
	public currentNote = null;
	
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
					this.error = null;
					this.alerts = null;
					this.currentNote = null;
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
					this.currentNote = null;
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
					this.currentNote = {};
					if(notes.length === 0) {
						this.currentNote.status = 'not found';
					}
					this.currentNote.name = key;
					this.error = null;
					this.notes = notes;

					console.log('find: end');
				},
				err => this.error = {disc: err}
			);
	}

	remove(id:string) {
		return this.svc.removeNote(id, this.securityToken)
			.subscribe(
				note => {
					this.error = null;
					let deletedItem = this.notes.find(function(x:any) {
						return x._id === note._id;
					});
					var index = this.notes.indexOf(deletedItem);

					if (index > -1) {
						this.notes.splice(index, 1);
						this.alerts.push({disc: 'Note had been deleted'});
						console.log('remove: end');
						return;
					}
					console.log('remove: something went wrong');
				},
				err => this.error = {disc: err}
			);
	}
	
	update(note:Note) {
		return this.svc.updateNote(note, this.securityToken)
			.subscribe(
				note => {
					this.error = null;
					console.log('update: end');
				},
				err => this.error = {disc: err}
			);
	}

	getLogged() {
		return this.securityToken !== null;
	}
}