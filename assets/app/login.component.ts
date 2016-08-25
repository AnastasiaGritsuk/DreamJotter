import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AppModel} from './app.model';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.template.html'
})

export class LoginComponent implements OnInit {
	constructor(private app: AppModel) {}

	newUser = {username:'', password:''};

	ngOnInit(){
	}

	onSubmit() {
		this.app.login(this.newUser.username, this.newUser.password);
	}
}
