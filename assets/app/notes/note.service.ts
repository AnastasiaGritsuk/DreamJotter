import { Injectable } from '@angular/core';
import { NOTES } from "./mock-note";
import { Note } from "./note";

@Injectable()
export class NoteService {
	getNotes() {
		return Promise.resolve(NOTES);
	}

	insertNote(note: Note) {
		Promise.resolve(NOTES).then((notes: Note[]) => notes.push(note));
	}
}