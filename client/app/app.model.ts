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
					this.error = null;
					this.alerts = null;
					this.noteName = '';
					this.state = this.noteState.None;
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
					this.noteName = '';
					this.state = this.noteState.None;
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
					this.state = this.noteState.None;
					this.error = null;
					
					this.noteName = key;
					
					if(notes.length === 0) 
						this.state = this.noteState.NoNotes;
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
					this.state = this.noteState.None;
					this.error = null;
					let deletedItem = this.notes.find(function(x:any) {
						return x._id === note._id;
					});
					var index = this.notes.indexOf(deletedItem);

					if (index > -1) {
						this.notes.splice(index, 1);
						
						if(this.notes.length === 0)
							this.state = this.noteState.NoNotes;
							
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
		console.log('update: begin');

		return this.svc.updateNote(note, this.securityToken)
			.subscribe(
				note => {
					this.state = this.noteState.None;
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