import { Component } from '@angular/core';
import { LoginService } from "./login.service";
import { User } from "./user.model";
import { OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.template.html',
    providers: [LoginService]
})

export class LoginComponent implements OnInit {

	constructor(private _loginService: LoginService) {}

	newUser: User;
	public userToken: string;

	ngOnInit(){
		this.newUser = {
			username: '',
			password: ''
		}
	}

	onSubmit() {
		this._loginService.auth(this.newUser)
			.subscribe(
				userToken => {
					this.userToken = userToken;

				},
				error => console.error(error)
			);
	}
}
