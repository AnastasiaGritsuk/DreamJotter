import { NoteService} from './notes/note.service';
import { Injectable } from '@angular/core';
import { Note } from './notes/note.model';

@Injectable()
export class AppModel {
	private securityToken: string;
	private logged: boolean = false;

	constructor(private svc:NoteService){}

	login(user:string, pwd:string) {
		return this.svc.login(user, pwd)
			.subscribe(token => {
				this.securityToken = token;
				console.log(this.securityToken);
				this.logged = true;
				console.log(this.logged);
			});
	}

	save(note:Note) {
		return this.svc.insertNote(note, this.securityToken);
	}

	find(key:string) {
		return this.svc.getNotes(key, this.securityToken);
	}

	getLogged() {
		return this.logged;
	}
}