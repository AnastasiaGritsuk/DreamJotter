import { Injectable } from '@angular/core';
import { NOTES } from "./mock-note";

@Injectable()
export class NoteService {
	getNotes() {
		return Promise.resolve(NOTES);
	}
}