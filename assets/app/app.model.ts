import { NoteService} from './notes/note.service';
import { Injectable } from '@angular/core';
import { Note } from './notes/note.model';

@Injectable()
export class AppModel {
	private securityToken: string = null;
	public notes:Note[] = [];
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
					console.log('find: end');
				},
				err => this.errStatus = err
			);
	}

	getLogged() {
		return this.securityToken !== null;
	}
}