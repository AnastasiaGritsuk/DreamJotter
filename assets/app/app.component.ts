import { Component } from '@angular/core';
import { Note } from "./notes/note.model";
import { NoteListComponent } from "./notes/note-list.component";
import { LoginComponent } from "./login.component";

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.template.html',
    directives: [NoteListComponent, LoginComponent]
})

export class AppComponent {
   
}
