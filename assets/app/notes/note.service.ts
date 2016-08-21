import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Note } from "./note.model";

@Injectable()
export class NoteService {
	constructor (private http: Http) {};

	getNotes() {
		//return Promise.resolve(NOTES);
	}

	insertNote(note: Note): Observable<any> {
		//Promise.resolve(NOTES).then((notes: Note[]) => notes.push(note));
		const body = JSON.stringify(note);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/note', body, {headers: headers});
	}
}