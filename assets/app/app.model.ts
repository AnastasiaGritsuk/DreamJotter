import {NoteService} from './notes/note.service';
import { Injectable } from '@angular/core';
import {Note} from './notes/note.model';

@Injectable()
export class AppModel {
	private securityToken: string;
	
	constructor(private svc:NoteService){
	}

	login(user:string, pwd:string) {
		return this.svc.login(user, pwd).subscribe(token => {
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