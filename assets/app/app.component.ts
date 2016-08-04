import { Component } from '@angular/core';
import { Note } from "./note.model";

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.template.html'
})
export class AppComponent {
	public notes = [
		{name: "purchase", value: "100$"},
		{name: "friendLeo", value: "50$"},
		{name: "child", value: "300$"},
		{name: "train", value: "20$"}
	];

	public selectedNotes = {};

	onSelect(note){
		this.selectedNotes = note;
	}

    onSaveClick() {
    	const note = new Note('purchase', '4000$');
    	this.notes.push(note);
    }
}
