import { Component } from '@angular/core';
import { Note } from "./notes/note.model";
import { NoteListComponent } from "./notes/note-list.component";
import { LoginComponent } from "./login.component";
import { AppModel } from "./app.model";
import { OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.template.html',
    directives: [NoteListComponent, LoginComponent]
})

export class AppComponent implements OnInit{
	constructor(private app:AppModel) {}

	ngOnInit() {
	}
}