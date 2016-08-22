import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Note } from "./note.model";

@Injectable()
export class NoteService {
	constructor (private http: Http) {};

	getNotes() {
		return this.http.get('http://localhost:3000/notes')
			.map( (data: Response) => {
				const extracted = data.json();
				const notesArray: Note[] = [];
				let note;
				for (let element of extracted.data) {
					note = new Note(element.name, element.text);
					notesArray.push(note);
				}
				return notesArray;
			});
	}

	insertNote(note: Note): Observable<any> {
		const body = JSON.stringify(note);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/note', body, {headers: headers});
	}

}