import { NoteService} from './notes/note.service';
import { Injectable } from '@angular/core';
import { Note } from './notes/note.model';

@Injectable()
export class AppModel {
	private securityToken: string;
	private logged: boolean = false;
	public notes:Note[] = [];

	constructor(private svc:NoteService){}

	login(user:string, pwd:string) {
		console.log('login: begin');
		
		return this.svc.login(user, pwd)
			.subscribe(
				token => {
					this.securityToken = token;
					this.logged = true;
					console.log('login: end');
			});
	}

	logout() {
		console.log('logout: begin');
		
		return this.svc.logout(this.securityToken)
			.subscribe(() => {
					this.logged = false;
					console.log('logout: end');
				});
	};

	save(note:Note) {
		console.log('save: begin');
		
		return this.svc.insertNote(note, this.securityToken)
			.subscribe(() => {
					console.log('save: end');
				});
	}
	
	find(key:string) {
		console.log('find: begin');
		
		return this.svc.getNotes(key, this.securityToken)
			.subscribe((notes) => {
				this.notes = notes;
				
				console.log('find: end');
			});
	}

	getLogged() {
		return this.logged;
	}
}