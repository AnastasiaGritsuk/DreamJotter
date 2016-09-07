import { Component } from '@angular/core';
import { AppModel} from './app.model';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.template.html'
})

export class LoginComponent {
	constructor(private _app: AppModel) {}

	newUser = {username:'', password:''};
	logged: boolean = false;

	onSubmit() {
		this._app.login(this.newUser.username, this.newUser.password);
	}

	onLogout() {
		this._app.logout();
	}
}
