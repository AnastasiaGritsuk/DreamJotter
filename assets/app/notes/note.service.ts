import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Note } from "./note.model";

@Injectable()
export class NoteService {
	constructor (private http: Http) {};

	login(user:string, pwd:string):Observable<any> {
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization' : 'Basic '+ btoa(user+':'+pwd)
		});

		return this.http.post('http://localhost:3000/auth', '', {headers: headers})
			.map(this.extractData)
			.catch(this.handleError);
	}

	logout(token:string) {
		let headers = new Headers({
			'Authorization': token
		});

		return this.http.delete('http://localhost:3000/auth', {headers: headers})
	}

	insertNote(note: Note, token:string): Observable<any> {
		let body = JSON.stringify(note);
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this.http.post('/note', body, {headers: headers});
	}

	getNotes(key:string, token:string): Observable<Note[]> {

		let headers = new Headers({
			'Authorization': token,
			'Accept': 'application/json'
		});

		console.log('getNotes: begin');
		
		var url = `/note/${key}`;
		return this.http.get(url, {headers:headers})
			.map( (res: Response) => {
				let extracted = res.json();
				return extracted.data;
			})
			.catch(this.handleError);
	}

	private handleError(error:any) {
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // log to console instead
		return Observable.throw(errMsg);
	}

	private extractData(res: Response) {
		return res.json() || { };
	}

}