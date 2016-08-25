import {NoteService} from './notes/note.service';

export class AppModel {
	private securityToken: string;
	
	constructor(private svc:NoteService){
	}

	login(user:string, pwd:string) {
		//this.svc.login(user, pwd).subscribe();
	}

	save() {
		
	}

	find() {
		
	}
}