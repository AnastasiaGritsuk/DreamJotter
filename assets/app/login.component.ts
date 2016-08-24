import { Component } from '@angular/core';
import { LoginService } from "./login.service";
import { User } from "./user.model";

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.template.html',
    providers: [LoginService]
})

export class LoginComponent {

	constructor(private _loginService: LoginService) {}

	newUser: User;

	onSubmit() {

	}
}
