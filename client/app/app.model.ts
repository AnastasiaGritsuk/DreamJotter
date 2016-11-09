import { NoteService} from './notes/note.service';
import { Injectable } from '@angular/core';
import { Note } from './notes/note.model';

@Injectable()
export class AppModel {
	private securityToken: string = null;
	public notes:Note[] = [];
	public currentNoteName = null;
	public isNoteDeleted = false;
	public isEditMode = false;
	public currentNote = null;
	public errStatus: string = null;
	
	constructor(private svc:NoteService){}

	login(user:string, pwd:string) {
		console.log('login: begin');
		
		return this.svc.login(user, pwd)
			.subscribe(
				token => {
					this.securityToken = token;
					console.log('login: end');
				},
				err => this.errStatus = err
			);
	}

	logout() {
		console.log('logout: begin');
		
		return this.svc.logout(this.securityToken)
			.subscribe(
				() => {
					this.securityToken = null;
					this.errStatus = null;
					console.log('logout: end');
				},
				err => this.errStatus = err
			);
	};

	save(note:Note) {
		console.log('save: begin');
		
		return this.svc.insertNote(note, this.securityToken)
			.subscribe(
				()=> console.log('save: end'),
				err => this.errStatus = err
			);
	}
	
	find(key:string) {
		console.log('find: begin');
		
		return this.svc.getNotes(key, this.securityToken)
			.subscribe(
				notes => {
					this.errStatus = null;
					this.notes = notes;
					this.currentNoteName = key;
					console.log('find: end');
				},
				err => this.errStatus = err
			);
	}

	remove(id:string) {
		return this.svc.removeNote(id, this.securityToken)
			.subscribe(
				note => {
					this.errStatus = null;
					let deletedItem = this.notes.find(function(x:any) {
						return x._id === note._id;
					});
					var index = this.notes.indexOf(deletedItem);

					if (index > -1) {
						this.notes.splice(index, 1);
						this.isNoteDeleted = true;
						setTimeout(function () {
							console.log('settimeout');
							this.isNoteDeleted = false;
						}, 2000);
						console.log('remove: end');
						return;
					}
					console.log('remove: something went wrong');
				},
				err => this.errStatus = err
			);
	}
	
	update(id:string, str:string) {
		return this.svc.updateNote(id, str, this.securityToken)
			.subscribe(
				note => {
					this.errStatus = null;
					let updatedItem = this.notes.find(function(x:any) {
						return x._id === note._id;
					});

					updatedItem.text = note.text;
					console.log('update: end');
				},
				err => this.errStatus = err
			);
	}

	getLogged() {
		return this.securityToken !== null;
	}
}