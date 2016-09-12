import { NoteService} from './notes/note.service';
import { Injectable } from '@angular/core';
import { Note } from './notes/note.model';

@Injectable()
export class AppModel {
	private securityToken: string = null;
	public notes:Note[] = [];

	constructor(private svc:NoteService){}

	login(user:string, pwd:string) {
		console.log('login: begin');
		
		return this.svc.login(user, pwd)
			.subscribe(
				res => {
					this.securityToken = res;
					console.log('login: end');
				},
				err => {
					console.log(err);
				}
			);
	}

	logout() {
		console.log('logout: begin');
		
		return this.svc.logout(this.securityToken)
			.subscribe(() => {
					this.securityToken = null;
					console.log('logout: end');
				});
	};

	save(note:Note) {
		console.log('save: begin');
		
		return this.svc.insertNote(note, this.securityToken)
			.subscribe(
				()=> console.log('save: end'),
				error => console.log(error)
			);
	}
	
	find(key:string) {
		console.log('find: begin');
		
		return this.svc.getNotes(key, this.securityToken)
			.subscribe((notes) => {
				console.log('NOTES ' + notes);
				this.notes = notes;
				
				console.log('find: end');
			});
	}

	getLogged() {
		return this.securityToken !== null;
	}
}