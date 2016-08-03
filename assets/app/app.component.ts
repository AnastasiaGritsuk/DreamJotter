import { Component } from '@angular/core';
import { Note } from "./note.model";

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.template.html'
})
export class AppComponent {
	notes: Note[] = [];

    onSaveClick() {
    	const note = new Note('purchase', '1000$');
    	this.notes.push(note);
    }
}
