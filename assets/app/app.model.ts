import {NoteService} from './notes/note.service';
import { Injectable } from '@angular/core';
import {Note} from './notes/note.model';

@Injectable()
export class AppModel {
	private securityToken: string;
	public logged: boolean = false;
	
	constructor(private svc:NoteService){
	}

	login(user:string, pwd:string) {
		return this.svc.login(user, pwd).subscribe(token => {
			console.log(token);
			this.securityToken = token;
		});
	}

	save(note:Note) {
		return this.svc.insertNote(note, this.securityToken);
	}

	find(key:string) {
		return this.svc.getNotes(key, this.securityToken);
	}
}