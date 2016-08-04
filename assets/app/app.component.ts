import { Component } from '@angular/core';
import { Note } from "./note.model";
import { NoteListComponent } from "./notes/note-list.component";

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.template.html',
    directives: [NoteListComponent]
})
export class AppComponent {
   
}
