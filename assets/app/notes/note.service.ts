import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Note } from "./note.model";

@Injectable()
export class NoteService {
	constructor (private http: Http) {};

	login(user:string, pwd:string):Observable<string> {
		let headers = new Headers({
			'Authorization' : 'Basic '+ btoa(user+':'+pwd)
		});

		return this.http.post('http://localhost:3000/auth', '', {headers: headers})
			.map ( (data: Response) => {
				let extracted = data.json();

				return extracted.userToken;
			});
	}

	getNotes(key:string, token:string) {
		return this.http.get('http://localhost:3000/notes')
			.map( (data: Response) => {
				let extracted = data.json();
				let notesArray: Note[] = [];

				for (let note of extracted.data) {
					notesArray.push(note);
				}

				return notesArray;
			});
	}

	insertNote(note: Note, token:string): Observable<any> {
		let body = JSON.stringify(note);
		let headers = new Headers(
			{'Content-Type': 'application/json'
			});
		return this.http.post('http://localhost:3000/note', body, {headers: headers});
	}
}