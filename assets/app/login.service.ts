import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { User } from "./user.model";

@Injectable()
export class LoginService {
	constructor (private http: Http) {};

	checkUser(creds: User): Observable<any> {
		const body = JSON.stringify(creds);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/auth', body, {headers: headers});
	}
}