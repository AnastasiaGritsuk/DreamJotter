import { Component } from '@angular/core';
import { LoginService } from "./login.service";

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.template.html',
    providers: [LoginService]
})

export class LoginComponent {
   onSubmit() {

   }
}
