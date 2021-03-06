import { Component } from '@angular/core';
import { NoteListComponent } from "./notes/note-list.component";
import { LoginComponent } from "./login.component";
import { AppModel } from "./app.model";

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.template.html',
    directives: [NoteListComponent, LoginComponent]
})

export class AppComponent{
	constructor(private _app:AppModel) {}
}